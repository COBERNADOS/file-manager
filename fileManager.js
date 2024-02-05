import * as readline from "node:readline/promises";
import { homedir } from "node:os";
import { Goodbye, Greeting, ShowCurrentDirectory } from "./src/cliOutputs.js";
import goUp from "./src/folderOperations/up.js";
import changeDirectory from "./src/folderOperations/cd.js";
import list from "./src/folderOperations/ls.js";
import readFile from "./src/fsOperations/cat.js";
import createFile from "./src/fsOperations/add.js";
import renameFile from "./src/fsOperations/rename.js";
import copyFile from "./src/fsOperations/cp.js";
import removeFile from "./src/fsOperations/rm.js";
import userOs from "./src/osOperations/os.js";
import hashFile from "./src/hashOperations/hash.js";
import compressFile from "./src/zipOperations/compress.js";
import decompressFile from "./src/zipOperations/decompress.js";

process.chdir(homedir());

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
Greeting();
ShowCurrentDirectory();

readLine.on("line", async (input) => {
  try {
    switch (true) {
      case input === "up":
        goUp();
        break;
      case input.startsWith("cd"):
        changeDirectory(input.slice(3).trim());
        break;
      case input === "ls":
        list();
        break;
      case input.startsWith("cat"):
        readFile(input.slice(4).trim());
        break;
      case input.startsWith("add"):
        createFile(input.slice(4).trim());
        break;
      case input.startsWith("rn"):
        renameFile(input.split(" ")[1], input.split(" ")[2]);
        break;
      case input.startsWith("cp"):
        copyFile(input.split(" ")[1], input.split(" ")[2]);
        break;
      case input.startsWith("rm"):
        removeFile(input.slice(3).trim());
        break;
      case input.startsWith("os"):
        userOs(input.slice(5).trim());
        break;
      case input.startsWith("hash"):
        hashFile(input.slice(5).trim());
        break;
      case input.startsWith("compress"):
        compressFile(input.split(" ")[1], input.split(" ")[2]);
        break;
      case input.startsWith("decompress"):
        decompressFile(input.split(" ")[1], input.split(" ")[2]);
        break;
    }
  } catch (error) {
    throw new Error(error.message);
  }
  ShowCurrentDirectory();
});

readLine.on("close", () => {
  Goodbye();
  readLine.close();
});
