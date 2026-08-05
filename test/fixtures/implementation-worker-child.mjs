import { parentPort } from "node:worker_threads";

Function("return 42")();
parentPort.postMessage(process.execArgv);
