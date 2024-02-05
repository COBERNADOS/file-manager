import { createReadStream, createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

export default async function copyFile(filePath, newFilePath) {
  try {
    // console.log(filePath, "-------------------", newFilePath);
    if (!newFilePath) {
      throw new Error("Add copied file path");
    }
    await fs.access(filePath);

    const filename = path.basename(filePath);
    const copyFileName = path.join(newFilePath, filename);
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(copyFileName);
    writeStream.on("error", (error) => {
      console.log(error);
    });
    writeStream.on("finish", () => {
      console.log("File copied successfully");
    });
    readStream.pipe(writeStream);
  } catch (error) {
    console.log("Operation Failed", error);
  }
}
