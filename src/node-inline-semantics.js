const inlineFlags = new Set(["-e", "--eval", "-p", "--print"]);
const optionsWithSeparateValue = new Set([
  "--experimental-loader",
  "--import",
  "--loader",
  "--require",
  "-r"
]);

export function isNodeCommand(command) {
  return command === process.execPath || /(?:^|[\\/])node(?:\.exe)?$/.test(command);
}

export function isShellCommand(command) {
  return /(?:^|[\\/])(?:ba|da|k|z)?sh(?:\.exe)?$/.test(command);
}

export function inlineNodeArgumentIndex(args) {
  if (!Array.isArray(args)) {
    return -1;
  }
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (typeof argument !== "string" || argument === "--") {
      return -1;
    }
    if (inlineFlags.has(argument)) {
      return typeof args[index + 1] === "string" ? index : -1;
    }
    if (["-e=", "--eval=", "-p=", "--print="].some((prefix) =>
      argument.startsWith(prefix))) {
      return index;
    }
    if (optionsWithSeparateValue.has(argument)) {
      if (typeof args[index + 1] !== "string") {
        return -1;
      }
      index += 1;
      continue;
    }
    if (argument === "-" || !argument.startsWith("-")) {
      return -1;
    }
  }
  return -1;
}

export function inlineNodeArguments(command, args) {
  if (!isNodeCommand(command) || !Array.isArray(args)) {
    return null;
  }
  return inlineNodeArgumentIndex(args) === -1 ? null : args;
}

function looksLikeInlineNodeShellCommand(command) {
  if (typeof command !== "string") {
    return false;
  }
  const hasNodeCommand = command.includes(process.execPath) ||
    /(?:^|[\s"';&|])(?:[^\s"']*[\\/])?node(?:\.exe)?(?:\s|$)/.test(command);
  return hasNodeCommand && /(?:^|\s)(?:-e|--eval|-p|--print)(?:=|\s)/.test(command);
}

function tokenizeSimpleShellCommand(command) {
  const tokens = [];
  let token = "";
  let quote = null;
  let escaped = false;
  const pushToken = () => {
    if (token.length > 0) {
      tokens.push(token);
      token = "";
    }
  };
  for (let index = 0; index < command.length; index += 1) {
    const character = command[index];
    if (escaped) {
      token += character;
      escaped = false;
      continue;
    }
    if (quote === "'") {
      if (character === "'") {
        quote = null;
      } else {
        token += character;
      }
      continue;
    }
    if (quote === '"') {
      if (character === '"') {
        quote = null;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === "$") {
        return null;
      } else {
        token += character;
      }
      continue;
    }
    if (character === "'" || character === '"') {
      quote = character;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if (/\s/.test(character)) {
      pushToken();
      continue;
    }
    if (
      ";&|<>`$".includes(character)
    ) {
      return null;
    }
    token += character;
  }
  if (quote !== null || escaped) {
    return null;
  }
  pushToken();
  return tokens;
}

function isAssignment(token) {
  return /^[A-Za-z_][A-Za-z0-9_]*=/.test(token);
}

function classifyTokens(tokens, originalCommand, depth) {
  let commandIndex = 0;
  while (isAssignment(tokens[commandIndex] ?? "")) {
    commandIndex += 1;
  }
  if (/(?:^|[\\/])env$/.test(tokens[commandIndex] ?? "")) {
    commandIndex += 1;
    while (isAssignment(tokens[commandIndex] ?? "")) {
      commandIndex += 1;
    }
  }
  if (
    isNodeCommand(tokens[commandIndex]) &&
    inlineNodeArgumentIndex(tokens.slice(commandIndex + 1)) !== -1
  ) {
    return "inline-node";
  }
  if (isShellCommand(tokens[commandIndex]) && depth < 2) {
    return classifyShellWrapperArguments(
      tokens[commandIndex],
      tokens.slice(commandIndex + 1),
      depth + 1
    );
  }
  return looksLikeInlineNodeShellCommand(originalCommand) && tokens.length === 0
    ? "ambiguous-node"
    : "other";
}

export function classifyInlineNodeShellCommand(command, depth = 0) {
  if (typeof command !== "string") {
    return "other";
  }
  const tokens = tokenizeSimpleShellCommand(command);
  if (tokens === null) {
    return looksLikeInlineNodeShellCommand(command) ? "ambiguous-node" : "other";
  }
  return classifyTokens(tokens, command, depth);
}

export function classifyShellWrapperArguments(command, args, depth = 0) {
  if (!isShellCommand(command)) {
    return "other";
  }
  if (!Array.isArray(args) || args.some((argument) => typeof argument !== "string")) {
    return "ambiguous-node";
  }
  let commandIndex = -1;
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "-c" || (/^-[a-zA-Z]+$/.test(argument) && argument.includes("c"))) {
      commandIndex = index + 1;
      break;
    }
    if (!argument.startsWith("-")) {
      return "other";
    }
  }
  if (commandIndex === -1) {
    return "other";
  }
  if (typeof args[commandIndex] !== "string") {
    return "ambiguous-node";
  }
  const nested = classifyInlineNodeShellCommand(args[commandIndex], depth);
  if (nested !== "other") {
    return nested;
  }
  return tokenizeSimpleShellCommand(args[commandIndex]) === null
    ? "ambiguous-node"
    : "other";
}
