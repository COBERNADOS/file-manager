import crypto from "node:crypto";
import fs from "node:fs/promises";
import { F_OK, createReadStream } from "node:fs";


export default async function hashFile(filePath) {
  try {
    const isExists = await fs
      .access(filePath, F_OK)
      .then(() => true)
      .catch(() => {
        console.log("Operation Failed: File does not exist");
        return false;
      });
    if (isExists) {
      const hash = crypto.createHash("sha256");
      const readStream = createReadStream(filePath);
      readStream.on("data", (data) => {
        hash.update(data);
      });
      readStream.on("end", () => {
        console.log(hash.digest("hex"));
      });
    }
  } catch (error) {
    console.log(error);
  }
}
