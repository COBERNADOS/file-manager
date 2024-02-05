export default function changeDirectory(path) {
  try {
    process.chdir(path);
  } catch (err) {
    console.log("Operation failed");
  }
}
