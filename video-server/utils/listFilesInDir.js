import fs from "fs";
import path from "path";

export const listFilesInDirectory = (directoryPath) => {
  try {
    const files = fs.readdirSync(directoryPath);
    const onlyFiles = files.filter((file) => {
      const filePath = path.join(directoryPath, file);
      return fs.statSync(filePath).isFile();
    });

    return onlyFiles;
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}: ${error.message}`);
    return [];
  }
};
