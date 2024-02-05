import { createWriteStream, createReadStream, constants } from "node:fs";
import { access } from "node:fs/promises";
import * as zlib from "node:zlib";

export default async function compressFile(pathToFile, pathToArchive) {
  try {
    console.log(pathToFile, "-------------", pathToArchive);
    const isFileExists = await access(pathToFile, constants.F_OK)
      .then(() => true)
      .catch(() => {
        console.log("File does not exist");
        return false;
      });

    const isArchiveExists = await access(pathToArchive, constants.F_OK)
      .then(() => {
        console.log("Archive already exists in this directory");
        return true;
      })
      .catch(() => false);

    if (isFileExists && !isArchiveExists) {
      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(pathToArchive);
      const brotliArchive = zlib.createBrotliCompress({
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]:
            zlib.constants.BROTLI_MIN_QUALITY,
        },
      });
      readStream.pipe(brotliArchive).pipe(writeStream);
      console.log("File has been successfully archived");
    }
  } catch (error) {
    console.error("Operation Failed", error.message);
  }
}
