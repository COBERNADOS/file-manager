import fs from "node:fs/promises";

export default async function removeFile(filePath) {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    console.log("File deleted successfully");
  } catch (error) {
    throw new Error("Operation Failed", error.message);
  }
}
