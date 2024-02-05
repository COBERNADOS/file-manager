import { homedir } from "node:os";
export default function goUp() {
  try {
    if (process.cwd() === homedir()) {
      console.log("Cannot go higher!");
    } else {
      process.chdir("..");
    }
  } catch (error) {
    console.log("Operation Failed");
  }
}
