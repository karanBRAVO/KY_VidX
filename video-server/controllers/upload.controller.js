import busboy from "busboy";
import { random } from "../utils/random.util.js";
import fs from "fs";
import path from "path";

export const uploadNewVideo = async (req, res) => {
  try {
    const bb = busboy({ headers: req.headers });

    bb.on("file", (name, file, info) => {
      const fileName = path.join(
        `${path.win32.basename(info.filename)}-${random()}`
      );
      file.pipe(
        fs.createWriteStream(`videos/${fileName}${path.extname(info.filename)}`)
      );
    });

    bb.on("close", () => {
      res.json({ success: true, message: "Video successfully uploaded" });
    });

    bb.on("error", (err) => {
      throw new Error(err.message);
    });

    req.pipe(bb);
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
};
