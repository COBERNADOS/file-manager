import fs from "node:fs";
import path from "node:path";

export default async function readFile(inputPath) {
  try {
    const filePath = path.join(inputPath);
    const readStream = fs.createReadStream(filePath, "utf-8");

    readStream.on("data", (chunk) => {
      console.log(chunk);
    });
  } catch (error) {
    console.log("Operation Failed", error.message);
  }
}
