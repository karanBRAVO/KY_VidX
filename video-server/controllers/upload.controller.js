import busboy from "busboy";
import { random } from "../utils/random.util.js";
import fs from "fs";
import path from "path";
import { videoProcessorQueue } from "../utils/task_manager/videoProcessor.task.js";

export const uploadNewVideo = async (req, res) => {
  try {
    const bb = busboy({ headers: req.headers });
    let fileName;

    bb.on("file", (name, file, info) => {
      fileName = path.join(`${path.win32.basename(info.filename)}-${random()}`);
      const filePath = `videos/${fileName}${path.extname(info.filename)}`;
      file.pipe(fs.createWriteStream(filePath));
    });

    bb.on("close", async () => {
      await videoProcessorQueue.add(`process-video-${fileName}`, {
        filename: fileName,
      });
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
