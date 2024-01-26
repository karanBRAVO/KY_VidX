import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UploadRouter from "./routes/upload.route.js";
import { videoProcessorWorker } from "./utils/task_manager/videoProcessor.task.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const port = process.env.PORT || 5590;
videoProcessorWorker.run();

app.use("/video-server", UploadRouter);

app.listen(port, (err) => {
  if (err) return err;
  console.log(`Server listening on ${port}`);
});
