"use client";

import { _SUGGESTIONS_ } from "./fakedata";
import CommonVideoBox from "../CommonVideoBox";
import Comments from "./Comments";
import VideoPlayer from "./VideoPlayer";
import { Button, Container, Divider, Typography } from "@mui/material";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { useEffect, useState } from "react";
import axios from "axios";
import { VideoSkeleton } from "@/ui/ComponentExporter";
import { getFormatedTime, getLocaleTime } from "@/lib/utils/DateConvertor";

const Player = ({ userId, videoId }) => {
  const [videoQuality, setVideoQuality] = useState("master");
  const videoSrc = `${process.env.NEXT_PUBLIC_VIDEO_SERVER_URL}/${videoId}/hls/${videoQuality}.m3u8`;

  const [fetchingVideos, setFetchingVideos] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAllVideos();
  }, []);

  // get suggestions
  const getAllVideos = async () => {
    setFetchingVideos(true);

    try {
      const res = await axios.get(`/api/user/get-all-videos`);
      if (res.data.success) {
        setVideos((prev) => res.data.details);
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingVideos(false);
    }
  };

  return (
    <>
      <section className="mt-[130px] text-white w-full min-h-screen flex flex-col">
        {/* <h1 className="flex flex-row items-center gap-1 text-xl font-light text-slate-400 m-1 p-1 lowercase truncate">
          <Grid3x3Icon />
          VideoID: {videoId}
        </h1> */}
        <VideoPlayer
          src={videoSrc}
          videoId={videoId}
          videoQuality={videoQuality}
          setVideoQuality={setVideoQuality}
          uid={userId}
        />
        <Comments videoId={videoId} />
        <Divider className="bg-zinc-400 m-1" />
        <Container
          maxWidth={false}
          className="w-full gap-3 flex flex-col items-center min-h-screen"
        >
          {fetchingVideos ? (
            <>
              <VideoSkeleton totalVideos={8} />
            </>
          ) : videos.length === 0 ? (
            <div className="w-full p-1 flex flex-col items-center gap-2 my-1">
              <Typography
                variant="h5"
                component={"span"}
                className="text-blue-600 font-light w-full flex flex-wrap text-wrap items-center justify-center"
              >
                No suggestions found
              </Typography>
              <Button
                variant="contained"
                className="bg-white text-black font-normal capitalize"
                onClick={getAllVideos}
              >
                Retry
              </Button>
            </div>
          ) : (
            videos.map((item, index) => (
              <CommonVideoBox
                key={index}
                userId={item.userId}
                videoId={item.videoVideoId}
                uploader={item.userImage}
                thumbnail={item.videoThumbnail}
                title={item.videoTitle}
                desc={item.videoDescription}
                duration={getFormatedTime(item.videoDuration)}
                views={item.videoViews}
                dateTime={getLocaleTime(item.videoUploadDate)}
              />
            ))
          )}
        </Container>
      </section>
    </>
  );
};

export default Player;
