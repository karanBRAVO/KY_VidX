import fs from "fs";

export const createNewDirIfNotExists = (...args) => {
  args.forEach((dir) => {
    try {
      fs.accessSync(dir);
    } catch (err) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};
