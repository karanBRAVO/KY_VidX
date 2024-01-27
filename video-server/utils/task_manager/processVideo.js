import { spawn } from "child_process";
import { basename, extname } from "path";

export const vidResolutions = [
  "256x144",
  "426x240",
  "640x360",
  "854x480",
  "1280x720",
  "1920x1080",
];

export const createThumbnails = async (filepath, workdir) => {
  const img = spawn(
    `ffmpeg -i ${filepath} -vf fps=1 ${workdir}/image%03d.png`,
    {
      shell: true,
    }
  );

  img.on("error", (err) => {
    console.log("Thumbnail creation failed:", err);
  });

  return new Promise((resolve) => {
    img.on("close", resolve);
  });
};

export const createMultipleResolutions = async (filepath, workdir) => {
  const promises = vidResolutions.map((scale) => {
    return new Promise((resolve) => {
      const video = spawn(
        `ffmpeg -i ${filepath} -vf "scale=${scale}" ${workdir}/output-${
          scale + extname(filepath)
        }`,
        { shell: true }
      );

      video.on("error", (code) => {
        console.log(`Video creation failed for scale ${scale}: ${code}`);
        resolve();
      });

      video.on("close", resolve);
    });
  });

  await Promise.all(promises);
};

export const createHLSfiles = async (filepath) => {
  const name = `output-${basename(filepath, extname(filepath))}`;

  const packet = spawn(
    `ffmpeg -i ${filepath} -c:v libx264 -c:a aac -f hls -hls_time 2 -hls_list_size 6 -hls_segment_filename ${name}%03d.ts ${name}.m3u8`,
    { shell: true }
  );

  packet.on("error", (code) => {
    console.log("HLS file creation failed:", code);
  });

  return new Promise((resolve) => {
    packet.on("close", resolve);
  });
};
