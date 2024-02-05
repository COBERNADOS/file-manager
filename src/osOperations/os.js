import os from "node:os";

export default function userOs(input) {
  try {
    const { homedir, username } = os.userInfo();
    const cpus = os.cpus().map(({ model, speed }) => ({
      model,
      speed: `${speed / 1000} GHz`,
    }));
    const osData = {
      EOL: JSON.stringify(os.EOL),
      cpus: cpus,
      homedir: homedir,
      username: username,
      architecture: process.arch,
    };
    if (osData.hasOwnProperty(input)) {
      console.log(osData[input]);
    } else {
      throw new Error("Invalid command");
    }
  } catch (error) {
    throw new Error("Operation Failed", error.message);
  }
}
