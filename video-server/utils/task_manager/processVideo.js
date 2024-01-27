import { spawn } from "child_process";
import { writeFileSync } from "fs";
import { basename, extname, join } from "path";
import { listFilesInDirectory } from "../listFilesInDir.js";
import { deleteFilesAndDirsIfExists } from "../rmFilesDirs.js";

export const vidResolutions = [
  "256x144",
  "426x240",
  "640x360",
  "854x480",
  "1280x720",
  "1920x1080",
];

export const variants = [
  {
    resolution: "144p",
    bandwidth: 300000,
    playlist: "video-output-256x144.m3u8",
  },
  {
    resolution: "240p",
    bandwidth: 700000,
    playlist: "video-output-426x240.m3u8",
  },
  {
    resolution: "360p",
    bandwidth: 1100000,
    playlist: "video-output-640x360.m3u8",
  },
  {
    resolution: "480p",
    bandwidth: 1700000,
    playlist: "video-output-854x480.m3u8",
  },
  {
    resolution: "720p",
    bandwidth: 3500000,
    playlist: "video-output-1280x720.m3u8",
  },
  {
    resolution: "1080p",
    bandwidth: 5500000,
    playlist: "video-output-1920x1080.m3u8",
  },
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

export const createHLSfiles = async (filepath, workdir) => {
  const allResolutionFiles = listFilesInDirectory(filepath);

  const promises = allResolutionFiles.map((filename) => {
    return new Promise((resolve, reject) => {
      const name = `video-${basename(filename, extname(filename))}`;

      const packet = spawn(
        `ffmpeg -i ${filepath}/${filename} -c:v libx264 -c:a aac -f hls -hls_time 2 -hls_list_size 0 -hls_segment_filename ${workdir}/${name}%03d.ts ${workdir}/${name}.m3u8`,
        { shell: true }
      );

      packet.on("error", (code) => {
        console.log("HLS file creation failed:", code);
        resolve();
      });

      packet.on("close", resolve);
    });
  });

  await Promise.all(promises);
};

export const createMasterFile = (workdir) => {
  try {
    const masterPlaylistPath = `${workdir}/master.m3u8`;

    const playlistContent = variants
      .map(
        (variant) =>
          `#EXT-X-STREAM-INF:BANDWIDTH=${variant.bandwidth},RESOLUTION=${
            variant.resolution
          }\n${join(workdir, variant.playlist)}`
      )
      .join("\n");

    writeFileSync(masterPlaylistPath, `#EXTM3U\n${playlistContent}`);
  } catch (err) {
    console.log(err);
  }
};

export const removeTempFiles = async (...args) => {
  args.forEach((path) => {
    deleteFilesAndDirsIfExists(path);
  });
};
