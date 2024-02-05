import { createWriteStream, createReadStream, constants } from "node:fs";
import { access } from "node:fs/promises";
import * as zlib from "node:zlib";

export default async function decompressFile(pathToArchive, pathToFile) {
  try {
    console.log(pathToArchive, "-------------", pathToFile);
    const isArchiveExists = await access(pathToArchive, constants.F_OK)
      .then(() => true)
      .catch(() => {
        console.log("Archive does not exist");
        return false;
      });

    const isFileExists = await access(pathToFile, constants.F_OK)
      .then(() => {
        console.log("Unarchived file already exists in this directory");
        return true;
      })
      .catch(() => false);

    if (isArchiveExists && !isFileExists) {
      const readStream = createReadStream(pathToArchive);
      const writeStream = createWriteStream(pathToFile);
      const brotliArchive = zlib.createBrotliDecompress();
      readStream.pipe(brotliArchive).pipe(writeStream);
      console.log("File has been successfully unarchived");
    }
  } catch (error) {
    console.error("Operation Failed", error.message);
  }
}
