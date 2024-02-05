import fs from "node:fs";

export default async function createFile(fileName) {
  try {
    const filePath = `./${fileName}`;
    const writeStream = fs.createWriteStream(filePath);

    writeStream.on("finish", () => {
      console.log("File created successfully");
    });
    writeStream.end();
  } catch (error) {
    console.log("Operation Failed", error.message);
  }
}
