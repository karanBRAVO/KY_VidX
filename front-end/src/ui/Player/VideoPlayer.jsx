"use client";

import { Avatar, Typography, Button, Container, Box } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import Hls from "hls.js";
import { useRef, useEffect } from "react";
import CustomPlayer from "./CustomPlayer";

const VideoPlayer = ({ src, videoId, videoQuality, setVideoQuality }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      console.error("HLS is not supported in this browser.");
    }

    return () => {
      if (video && video.hls) {
        video.hls.destroy();
      }
    };
  }, [src, videoQuality]);

  return (
    <>
      <Container maxWidth={false} className="py-2 my-2">
        <Box>
          <CustomPlayer
            videoRef={videoRef}
            videoId={videoId}
            setVideoQuality={setVideoQuality}
            videoURL={src}
          />
        </Box>
        <Box margin={"2px"}>
          <Typography
            variant="h3"
            component={"h1"}
            className="text-lg sm:text-3xl md:text-5xl lg:text-7xl"
          >
            My Project Intro VIDX | Material UI | Tailwind CSS | Next JS
          </Typography>
          <Typography
            variant="caption"
            component={"span"}
            className="text-slate-200 mx-1 my-1"
          >
            1k+ views
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginY={"5px"}
          flexWrap={"wrap"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"5px"}
          >
            <Avatar src="/defaultThumbnail.jpg" alt="/" className="w-11 h-11" />
            <Typography
              variant="h5"
              component={"h2"}
              className="cursor-pointer"
            >
              Karan Yadav
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"start"}
            justifyContent={"space-evenly"}
            gap={"5px"}
            marginY={"5px"}
            flexWrap={"wrap"}
          >
            <Button
              variant="contained"
              className="rounded-full bg-white text-black"
            >
              <ThumbUpIcon />
              <Typography
                variant={"button"}
                component={"span"}
                className="mx-1"
              >
                Like
              </Typography>
            </Button>
            <Button
              variant="contained"
              className="rounded-full bg-white text-black"
            >
              <ThumbDownIcon />
              <Typography
                variant={"button"}
                component={"span"}
                className="mx-1"
              >
                Dislike
              </Typography>
            </Button>
            <Button
              variant="contained"
              className="rounded-full bg-white text-black"
            >
              <ShareIcon />
              <Typography
                variant={"button"}
                component={"span"}
                className="mx-1"
              >
                Share
              </Typography>
            </Button>
            <Button
              variant="contained"
              className="rounded-full bg-white text-black"
            >
              <DownloadIcon />
              <Typography
                variant={"button"}
                component={"span"}
                className="mx-1"
              >
                Download
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          padding={"2px"}
        >
          <Typography
            variant="subtitle1"
            component={"h5"}
            className="p-2 bg-white text-black rounded-tl-2xl rounded-br-2xl m-2"
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            component={"p"}
            className="text-sm text-zinc-300 p-2 m-1 rounded-lg bg-slate-800"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet
            quia reprehenderit rem iusto, beatae maiores tempore impedit ipsa
            voluptatibus nulla, eum ex, vitae perferendis architecto eius
            necessitatibus similique. A enim alias commodi expedita quos
            accusantium quia pariatur, iure numquam quae et quisquam sunt
            exercitationem nostrum veniam accusamus! Dicta nobis nesciunt rerum
            impedit sunt pariatur nemo, omnis voluptate eum perferendis dolor
            veritatis facilis iure perspiciatis consequatur reiciendis fugit.
            Porro nihil iure illum animi suscipit. Adipisci consequatur quidem
            odit nam facilis, odio laudantium eveniet, deserunt consequuntur
            quis, neque autem dolorum tempora molestias veritatis? Laudantium
            adipisci, perspiciatis voluptas officiis soluta delectus voluptates.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default VideoPlayer;
