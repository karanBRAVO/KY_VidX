import fs from "fs";

export const deleteFilesAndDirsIfExists = (path) => {
  try {
    fs.rmSync(path, { recursive: true });
  } catch (e) {
    console.log(e);
  }
};
