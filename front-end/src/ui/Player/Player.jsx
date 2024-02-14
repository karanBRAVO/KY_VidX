"use client";

import { _SUGGESTIONS_ } from "./fakedata";
import CommonVideoBox from "../CommonVideoBox";
import Comments from "./Comments";
import VideoPlayer from "./VideoPlayer";
import { Container, Divider } from "@mui/material";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";

const Player = ({ videoId }) => {
  videoId = "output-1920x1080-fd43391273fe76f221e02adeeb3faea8";
  const videoSrc = `${process.env.NEXT_PUBLIC_VIDEO_SERVER_URL}/${videoId}/hls/master.m3u8`;

  return (
    <>
      <section className="mt-[130px] text-white w-full min-h-screen flex flex-col">
        <h1 className="flex flex-row items-center gap-1 text-xl font-light text-slate-400 m-1 p-1 lowercase truncate">
          <Grid3x3Icon />
          VideoID: {videoId}
        </h1>
        <VideoPlayer src={videoSrc} videoId={videoId} />
        <Comments commentId={1} />
        <Divider className="bg-zinc-400 m-1" />
        <Container
          maxWidth={false}
          className="w-full gap-3 flex flex-col items-center"
        >
          {_SUGGESTIONS_.map((item, index) => (
            <CommonVideoBox
              key={index}
              uploader={item.uploader}
              thumbnail={`/${item.thumbnail}`}
              name={item.name}
              desc={item.desc}
              duration={item.duration}
              views={item.views}
              lastWatchTime={item.uploadTime}
            />
          ))}
        </Container>
      </section>
    </>
  );
};

export default Player;
