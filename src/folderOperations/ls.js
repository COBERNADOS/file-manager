import fs from "node:fs/promises";
import path from "node:path";

export default async function list() {
  try {
    const contents = await fs.readdir(process.cwd());
    const sortedContents = contents.sort();

    const folders = [];
    const files = [];

    for (const item of sortedContents) {
      const itemPath = path.join(process.cwd(), item);
      const stat = await fs.stat(itemPath);

      if (stat.isDirectory()) {
        folders.push({ type: "directory", name: item });
      } else {
        files.push({ type: "file", name: item });
      }
    }

    const tableData = [...files, ...folders];

    console.table(tableData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
