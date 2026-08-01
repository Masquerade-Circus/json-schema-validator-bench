import { spawn } from "node:child_process";

const defaultMaximumCaptureBytes = 1024 * 1024;

class BoundedOutput {
  constructor(maximumBytes) {
    this.maximumBytes = maximumBytes;
    this.complete = [];
    this.leading = Buffer.alloc(0);
    this.trailing = Buffer.alloc(0);
    this.totalBytes = 0;
    this.truncated = false;
  }

  append(chunk) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.totalBytes += bytes.length;
    if (!this.truncated) {
      this.complete.push(bytes);
      if (this.totalBytes <= this.maximumBytes) {
        return;
      }
      const all = Buffer.concat(this.complete);
      const half = Math.floor(this.maximumBytes / 2);
      this.leading = all.subarray(0, half);
      this.trailing = all.subarray(all.length - (this.maximumBytes - half));
      this.complete = [];
      this.truncated = true;
      return;
    }
    const half = Math.floor(this.maximumBytes / 2);
    this.trailing = Buffer.concat([this.trailing, bytes]);
    if (this.trailing.length > this.maximumBytes - half) {
      this.trailing = this.trailing.subarray(
        this.trailing.length - (this.maximumBytes - half)
      );
    }
  }

  text() {
    if (!this.truncated) {
      return Buffer.concat(this.complete).toString("utf8");
    }
    const omitted = this.totalBytes - this.leading.length - this.trailing.length;
    return `${this.leading.toString("utf8")}\n...[truncated ${omitted} bytes; preserved beginning and end]...\n${this.trailing.toString("utf8")}`;
  }
}

function displayedCommand(command) {
  return command.map((argument) => JSON.stringify(argument)).join(" ");
}

function childFailure({ command, cwd, exitCode, signal, stdout, stderr, streamed }) {
  const lines = [
    "Child process failed.",
    `Command: ${displayedCommand(command)}`,
    `CWD: ${cwd}`,
    `Exit code: ${exitCode ?? "none"}`,
    `Signal: ${signal ?? "none"}`
  ];
  if (streamed) {
    lines.push("stdout and stderr were streamed above without duplication.");
  } else {
    lines.push("stdout:", stdout.length === 0 ? "(empty)" : stdout);
    lines.push("stderr:", stderr.length === 0 ? "(empty)" : stderr);
  }
  const error = new Error(lines.join("\n"));
  error.name = "ChildProcessError";
  error.command = command;
  error.cwd = cwd;
  error.exitCode = exitCode;
  error.signal = signal;
  error.stdout = stdout;
  error.stderr = stderr;
  return error;
}

class OutputForwarder {
  constructor({ source, sink, capture, enabled, onDrain }) {
    this.source = source;
    this.sink = sink;
    this.capture = capture;
    this.enabled = enabled;
    this.onDrainComplete = onDrain;
    this.waitingForDrain = false;
    this.handleData = this.handleData.bind(this);
    this.handleDrain = this.handleDrain.bind(this);
    source.on("data", this.handleData);
  }

  handleData(chunk) {
    this.capture.append(chunk);
    if (!this.enabled) {
      return;
    }
    if (this.sink.write(chunk) === false) {
      this.waitingForDrain = true;
      this.source.pause();
      this.sink.once("drain", this.handleDrain);
    }
  }

  handleDrain() {
    this.waitingForDrain = false;
    this.source.resume();
    this.onDrainComplete();
  }

  cleanup() {
    this.source.removeListener("data", this.handleData);
    this.sink.removeListener("drain", this.handleDrain);
  }
}

export function runChildProcess(command, args, options = {}) {
  const cwd = pathFromOption(options.cwd);
  const commandWithArguments = [command, ...args];
  const streamOutput = options.streamOutput === true;
  const stdoutSink = options.stdoutSink ?? process.stdout;
  const stderrSink = options.stderrSink ?? process.stderr;
  const maximumCaptureBytes =
    options.maximumCaptureBytes ?? defaultMaximumCaptureBytes;
  if (!Number.isSafeInteger(maximumCaptureBytes) || maximumCaptureBytes < 2) {
    throw new Error("child output capture limit must be an integer of at least 2 bytes");
  }
  for (const [name, sink] of [
    ["stdout", stdoutSink],
    ["stderr", stderrSink]
  ]) {
    if (
      sink === null ||
      typeof sink !== "object" ||
      typeof sink.write !== "function" ||
      typeof sink.once !== "function" ||
      typeof sink.removeListener !== "function"
    ) {
      throw new Error(`child ${name} sink must implement write and EventEmitter methods`);
    }
  }

  return new Promise((resolve, reject) => {
    const stdoutCapture = new BoundedOutput(maximumCaptureBytes);
    const stderrCapture = new BoundedOutput(maximumCaptureBytes);
    const child = spawn(command, args, {
      cwd,
      env: options.env ?? process.env,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let settled = false;
    let outcome = null;
    let stdoutForwarder;
    let stderrForwarder;
    const finish = () => {
      if (
        settled ||
        outcome === null ||
        stdoutForwarder.waitingForDrain ||
        stderrForwarder.waitingForDrain
      ) {
        return;
      }
      settled = true;
      stdoutForwarder.cleanup();
      stderrForwarder.cleanup();
      const stdout = stdoutCapture.text();
      const stderr = stderrCapture.text();
      if (outcome.cause !== null) {
        const error = childFailure({
          command: commandWithArguments,
          cwd,
          exitCode: null,
          signal: null,
          stdout,
          stderr,
          streamed: streamOutput
        });
        error.cause = outcome.cause;
        reject(error);
        return;
      }
      if (outcome.exitCode !== 0 || outcome.signal !== null) {
        reject(
          childFailure({
            command: commandWithArguments,
            cwd,
            exitCode: outcome.exitCode,
            signal: outcome.signal,
            stdout,
            stderr,
            streamed: streamOutput
          })
        );
        return;
      }
      resolve({
        command: commandWithArguments,
        cwd,
        exitCode: outcome.exitCode,
        signal: outcome.signal,
        stdout,
        stderr
      });
    };
    stdoutForwarder = new OutputForwarder({
      source: child.stdout,
      sink: stdoutSink,
      capture: stdoutCapture,
      enabled: streamOutput,
      onDrain: finish
    });
    stderrForwarder = new OutputForwarder({
      source: child.stderr,
      sink: stderrSink,
      capture: stderrCapture,
      enabled: streamOutput,
      onDrain: finish
    });
    child.once("error", (cause) => {
      if (outcome === null) {
        outcome = { cause, exitCode: null, signal: null };
      }
      finish();
    });
    child.once("close", (exitCode, signal) => {
      if (outcome === null) {
        outcome = { cause: null, exitCode, signal };
      }
      finish();
    });
  });
}

function pathFromOption(cwd) {
  return typeof cwd === "string" && cwd.length > 0 ? cwd : process.cwd();
}
