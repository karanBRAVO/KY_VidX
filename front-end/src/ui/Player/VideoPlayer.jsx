"use client";

import {
  Avatar,
  Typography,
  Button,
  Container,
  Box,
  Skeleton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import Hls from "hls.js";
import { useRef, useEffect, useState } from "react";
import CustomPlayer from "./CustomPlayer";
import axios from "axios";
import Link from "next/link";
import { getLocaleTime } from "@/lib/utils/DateConvertor";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";
import { ShareBox } from "../ComponentExporter";

const VideoPlayer = ({ src, videoId, videoQuality, setVideoQuality, uid }) => {
  if (!src || !videoId || !videoQuality || !setVideoQuality) return <></>;

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const videoRef = useRef(null);
  const [fetching, setFetching] = useState(false);
  const [descLength, setDescLength] = useState(50);

  const [shareBoxState, setShareBoxState] = useState(false);

  useEffect(() => {
    getVideoDetails();
  }, []);

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

  // get video details
  const [videoData, setVideoData] = useState({
    title: "",
    views: "",
    data: "",
    channelName: "",
    userId: "",
    userImg: "",
    thumbnail: "",
    uploadDate: "",
  });
  const getVideoDetails = async () => {
    setFetching(true);
    try {
      const res = await axios.get(
        `/api/user/player/get-video-info/?videoId=${videoId}`
      );
      if (res.data.success) {
        setVideoData((prev) => ({
          userId: res.data.videoData.userId,
          userImg: res.data.videoData.userImg,
          thumbnail: res.data.videoData.thumbnail,
          title: res.data.videoData.title,
          views: res.data.videoData.views,
          data: res.data.videoData.data,
          channelName: res.data.videoData.channelName,
          uploadDate: res.data.videoData.uploadDate,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  // like
  const [likeState, setLikeState] = useState(false);
  const handleLike = async () => {
    if (!userState._id) {
      dispatch(_showNotifier({ msg: "You must be logged in" }));
      return;
    }

    setLikeState(true);
    try {
      const res = await axios.post(`/api/user/channel/video/like`, { videoId });
      if (res.data.success) {
        dispatch(_showNotifier({ msg: `Liked Successfully` }));
      } else {
        dispatch(_showNotifier({ msg: `${res.data.error}` }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLikeState(false);
    }
  };

  // dislike
  const [dislikeState, setDislikeState] = useState(false);
  const handleDislike = async () => {
    if (!userState._id) {
      dispatch(_showNotifier({ msg: "You must be logged in" }));
      return;
    }

    setDislikeState(true);
    try {
      const res = await axios.post(`/api/user/channel/video/dislike`, {
        videoId,
      });
      if (res.data.success) {
        dispatch(_showNotifier({ msg: "Disliked successfully" }));
      } else {
        dispatch(_showNotifier({ msg: `${res.data.error}` }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDislikeState(false);
    }
  };

  // subscribe
  const [subState, setSubState] = useState(false);
  const handleSubscribe = async () => {
    // check if current user is logged in
    if (!userState._id) {
      dispatch(_showNotifier({ msg: "You must be logged in" }));
      return;
    }

    // check for uploader id
    if (!videoData.userId) return;

    setSubState(true);
    try {
      const res = await axios.post(`/api/user/channel/subscribe`, {
        ownerId: videoData.userId,
      });
      if (res.data.success) {
        dispatch(
          _showNotifier({ msg: `Subscribed to ${videoData.channelName}` })
        );
      } else {
        dispatch(_showNotifier({ msg: `${res.data.error}` }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubState(false);
    }
  };

  // handle share
  const handleShare = async () => {
    setShareBoxState((prev) => true);
  };

  return (
    <>
      <ShareBox
        open={shareBoxState}
        setOpen={setShareBoxState}
        url={`${process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL}/player/${uid}/${videoId}`}
      />
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
          {videoData.title ? (
            <Typography
              variant="h3"
              component={"h1"}
              className="text-lg sm:text-3xl md:text-5xl lg:text-7xl max-w-full truncate capitalize"
            >
              {videoData.title}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              component={"h1"}
              animation={"wave"}
              className="text-lg sm:text-3xl md:text-5xl lg:text-7xl max-w-full truncate bg-[#3d3c3856]"
            />
          )}
          {videoData.views ? (
            <div className="flex flex-row items-center w-full gap-2 flex-wrap my-2">
              <Typography
                variant="caption"
                component={"span"}
                className="text-slate-500 mx-1 my-1"
              >
                {videoData.views} views
              </Typography>
              <Typography
                variant="caption"
                component={"span"}
                className="text-slate-500 mx-1 my-1"
              >
                {getLocaleTime(videoData.uploadDate)}
              </Typography>
              <Button
                variant="contained"
                className="rounded-full text-base bg-white text-black font-black capitalize border-2 border-solid border-white"
                disabled={subState}
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </div>
          ) : (
            <div className="flex flex-row items-center w-full gap-2 flex-wrap">
              <Skeleton
                variant="text"
                component={"span"}
                animation={"wave"}
                width={80}
                className="bg-[#3d3c3856]"
              />
              <Skeleton
                variant="text"
                component={"span"}
                animation={"wave"}
                width={80}
                className="bg-[#3d3c3856]"
              />
            </div>
          )}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginY={"5px"}
          flexWrap={"wrap"}
        >
          {videoData.userId ? (
            <Link href={`/other/${videoData.userId}`}>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"5px"}
              >
                <Avatar src={videoData.userImg} alt="/" className="w-11 h-11" />
                <Typography
                  variant="h5"
                  component={"h2"}
                  className="cursor-pointer"
                >
                  {videoData.channelName}
                </Typography>
              </Box>
            </Link>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"5px"}
            >
              <Skeleton
                variant="circular"
                animation={"wave"}
                component={"div"}
                width={60}
                height={60}
                className="bg-[#3d3c3856]"
              />
              <Skeleton
                variant="text"
                animation={"wave"}
                component={"h2"}
                className="bg-[#3d3c3856] w-[70px]"
              />
            </Box>
          )}
          {videoData.userId ? (
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
                className="rounded-full border-2 border-solid border-white bg-black text-white"
                disabled={likeState}
                onClick={handleLike}
              >
                <ThumbUpIcon className="text-white font-black" />
                <Typography
                  variant={"button"}
                  component={"span"}
                  className="mx-1 text-white"
                >
                  Like
                </Typography>
              </Button>
              <Button
                variant="contained"
                className="rounded-full border-2 border-solid border-white bg-black text-white"
                disabled={dislikeState}
                onClick={handleDislike}
              >
                <ThumbDownIcon className="text-white font-black" />
                <Typography
                  variant={"button"}
                  component={"span"}
                  className="mx-1 text-white"
                >
                  Dislike
                </Typography>
              </Button>
              <Button
                variant="contained"
                className="rounded-full border-2 border-solid border-white bg-black text-white"
                onClick={handleShare}
              >
                <ShareIcon className="text-white font-black" />
                <Typography
                  variant={"button"}
                  component={"span"}
                  className="mx-1 text-white"
                >
                  Share
                </Typography>
              </Button>
              <Button
                variant="contained"
                className="rounded-full border-2 border-solid border-white bg-black text-white"
              >
                <DownloadIcon className="text-white font-black" />
                <Typography
                  variant={"button"}
                  component={"span"}
                  className="mx-1 text-white"
                >
                  Download
                </Typography>
              </Button>
            </Box>
          ) : (
            <div className="flex flex-row items-start justify-evenly gap-2 flex-wrap">
              <Skeleton
                variant="rounded"
                component={"div"}
                animation={"pulse"}
                width={140}
                height={50}
                className="bg-[#3d3c3856] rounded-full"
              />
              <Skeleton
                variant="rounded"
                component={"div"}
                animation={"pulse"}
                width={140}
                height={50}
                className="bg-[#3d3c3856] rounded-full"
              />
              <Skeleton
                variant="rounded"
                component={"div"}
                animation={"pulse"}
                width={140}
                height={50}
                className="bg-[#3d3c3856] rounded-full"
              />
              <Skeleton
                variant="rounded"
                component={"div"}
                animation={"pulse"}
                width={140}
                height={50}
                className="bg-[#3d3c3856] rounded-full"
              />
            </div>
          )}
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
          {videoData.data ? (
            <Typography
              variant="body1"
              component={"p"}
              className="text-sm text-zinc-300 p-2 m-1 rounded-lg bg-slate-800 w-full flex flex-col"
            >
              <span className="text-zinc-300">
                {videoData.data
                  .substring(0, descLength)
                  .split("\n")
                  .map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                {descLength === 50 && <span className="text-xl">. . .</span>}
              </span>
              <Button
                className="text-xs font-light text-gray-600 lowercase w-fit bg-transparent hover:text-gray-400"
                variant="text"
                onClick={() => {
                  setDescLength((prev) =>
                    prev === 50 ? videoData.data.length : 50
                  );
                }}
              >
                {descLength === 50 ? <>Show More</> : <>Show less</>}
              </Button>
            </Typography>
          ) : (
            <Skeleton
              variant="rectangular"
              component={"p"}
              animation={"pulse"}
              height={150}
              className="bg-[#3d3c3856] w-full"
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default VideoPlayer;
