const cliArguments = process.argv.slice(2);
const usernameIndex = cliArguments.findIndex((el) =>
  el.includes("--username=")
);
const username =
  usernameIndex !== -1 ? cliArguments[usernameIndex].split("=")[1] : "Gorgeous";

export function Goodbye() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

export function Greeting() {
  console.log(`Welcome to the File Manager, ${username}!`);
}
export function ShowCurrentDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}
