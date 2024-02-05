import fs from "node:fs/promises";

export default async function renameFile(oldFile, newFile) {
  try {
    if (!newFile) {
      console.error("Operation Failed - Add new name for file");
    }
    fs.rename(oldFile, newFile);
    console.log("Filed renamed successfully");
  } catch (error) {
    console.error("Operation Failed", error.message);
  }
}
