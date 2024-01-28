import busboy from "busboy";
import { random } from "../utils/random.util.js";
import fs from "fs";
import path from "path";
import { videoProcessorQueue } from "../utils/task_manager/videoProcessor.task.js";

export const uploadNewVideo = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new Error(`User id not provided`);

    const videoId = random();

    const bb = busboy({ headers: req.headers });
    let filePath;

    bb.on("file", (name, file, info) => {
      const fileName = path.join(`${userId}-${videoId}`);

      const fileFolderPath = path.resolve(
        process.cwd(),
        "../video-server",
        "videos"
      );
      filePath = path.join(
        fileFolderPath,
        fileName + path.extname(info.filename)
      );
      file.pipe(fs.createWriteStream(filePath));
    });

    bb.on("close", async () => {
      await videoProcessorQueue.add(
        `process-video-${path.basename(filePath, path.extname(filePath))}`,
        {
          filePath: filePath,
        }
      );
      res.json({
        success: true,
        message: "Video successfully uploaded",
        videoId,
        url:
          `${req.protocol}://${req.get("host")}` +
          `/${userId}-${videoId}/hls/master.m3u8`,
      });
    });

    bb.on("error", (err) => {
      throw new Error(err.message);
    });

    req.pipe(bb);
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
};
