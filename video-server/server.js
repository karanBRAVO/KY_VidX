import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UploadRouter from "./routes/upload.route.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const port = process.env.PORT || 5590;

app.use("/video-server", UploadRouter);

app.listen(port, (err) => {
  if (err) return err;
  console.log(`Server listening on ${port}`);
});
