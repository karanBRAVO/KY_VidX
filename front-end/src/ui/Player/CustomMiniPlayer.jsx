"use client";

import React, { useEffect, useRef } from "react";
import { IconButton, Tooltip } from "@mui/material";
import Hls from "hls.js";
import { useSelector, useDispatch } from "react-redux";
import { _hideMiniVideoPlayer } from "@/lib/_store/features/video-player/videoPlayerSlice";
import { useRouter } from "next/navigation";

// icons
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CloseIcon from "@mui/icons-material/Close";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";

const CustomMiniPlayer = () => {
  // global variables
  const miniVideoPlayerState = useSelector((state) => state.miniVideoPlayer);
  const dispatch = useDispatch();

  const router = useRouter();

  const videoRef = useRef(null);
  const videoContainer = useRef(null);
  const videoOverlay = useRef(null);
  const closeBtn = useRef(null);
  const expandBtn = useRef(null);
  const playBtn = useRef(null);
  const pauseBtn = useRef(null);
  const replayIcon = useRef(null);
  const skipPrevBtn = useRef(null);
  const skipNextBtn = useRef(null);

  const hideMiniPlayer = () => {
    if (videoContainer.current && miniVideoPlayerState.src) {
      if (videoContainer.current.classList.contains("sm:block")) {
        videoContainer.current.classList.remove("sm:block");
        videoContainer.current.classList.add("sm:hidden");
        dispatch(_hideMiniVideoPlayer());
      }
    }
  };

  useEffect(() => {
    if (!miniVideoPlayerState) return;
    if (!miniVideoPlayerState.status) {
      if (videoContainer.current.classList.contains("sm:block")) {
        videoContainer.current.classList.remove("sm:block");
      }
      videoContainer.current.classList.add("sm:hidden");
      return;
    } else {
      if (videoContainer.current.classList.contains("sm:hidden")) {
        videoContainer.current.classList.remove("sm:hidden");
      }
      videoContainer.current.classList.add("sm:block");
    }

    const video = videoRef.current;
    const src = miniVideoPlayerState.src;
    if (!video && !src && !closeBtn.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      // Set the current time of the video
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.currentTime = miniVideoPlayerState.startTime;
        videoRef.current.playbackRate = miniVideoPlayerState.playbackRate;
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      console.error("HLS is not supported in this browser.");
    }

    // Set the current time of the video
    videoRef.current.addEventListener("loadedmetadata", function (e) {
      videoRef.current.currentTime = miniVideoPlayerState.startTime;
      videoRef.current.playbackRate = miniVideoPlayerState.playbackRate;
      togglePlay(e);
    });

    // close the mini player
    closeBtn.current.addEventListener("click", hideMiniPlayer);

    return () => {
      if (video && video.hls) {
        video.hls.destroy();
      }

      closeBtn.current.removeEventListener("click", hideMiniPlayer);
    };
  }, [miniVideoPlayerState?.src]);

  const togglePlay = (e) => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        playBtn.current.classList.add("w-0");
        pauseBtn.current.classList.remove("w-0");
      } else {
        videoRef.current.pause();
        pauseBtn.current.classList.add("w-0");
        playBtn.current.classList.remove("w-0");
      }
      if (!replayIcon.current.classList.contains("w-0")) {
        replayIcon.current.classList.add("w-0");
      }
    }
  };

  const showVideoOverlay = (e) => {
    if (videoOverlay.current) {
      if (videoOverlay.current.classList.contains("hidden")) {
        videoOverlay.current.classList.remove("hidden");
        videoOverlay.current.classList.add("flex");
        // setTimeout(hideVideoOverlay, 3000);
      }
    }
  };

  const hideVideoOverlay = (e) => {
    if (videoOverlay.current) {
      if (videoOverlay.current.classList.contains("flex")) {
        videoOverlay.current.classList.remove("flex");
        videoOverlay.current.classList.add("hidden");
      }
    }
  };

  const handleVideoExpand = () => {
    hideMiniPlayer();
    router.push(miniVideoPlayerState.pathURL);
  };

  return (
    <>
      <div
        onMouseMove={showVideoOverlay}
        onMouseLeave={hideVideoOverlay}
        ref={videoContainer}
        className="fixed sm:right-5 bottom-0 z-10 hidden sm:hidden sm:w-96 sm:h-auto aspect-video sm:rounded-t-lg overflow-hidden shadow-md shadow-white border-[1px] border-solid border-b-0 border-white"
      >
        <div
          ref={videoOverlay}
          className="absolute z-[1] top-0 left-0 right-0 bottom-0 w-full h-full hidden transition-all flex-col items-start bg-[#0000007d]"
        >
          <div className="w-full p-2 flex flex-row items-center justify-between">
            <IconButton
              disableRipple
              disableTouchRipple
              disableFocusRipple
              className="text-white font-black p-0 ml-1"
              onClick={handleVideoExpand}
            >
              <Tooltip ref={expandBtn} arrow title="Expand" placement="top">
                <AspectRatioIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
              </Tooltip>
            </IconButton>
            <IconButton
              disableRipple
              disableTouchRipple
              disableFocusRipple
              className="text-white font-black p-0 ml-1"
            >
              <Tooltip ref={closeBtn} arrow title="Close" placement="top">
                <CloseIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
              </Tooltip>
            </IconButton>
          </div>
          <div className="w-full p-2 h-full flex flex-row items-center justify-center">
            <IconButton
              disableRipple
              disableTouchRipple
              disableFocusRipple
              className="text-white font-black p-0 ml-1"
            >
              <Tooltip ref={skipPrevBtn} arrow title="Previous" placement="top">
                <SkipPreviousIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
              </Tooltip>
            </IconButton>
            <IconButton
              disableRipple
              disableTouchRipple
              disableFocusRipple
              className="text-white font-black p-0 ml-1"
              onClick={togglePlay}
            >
              <Tooltip ref={playBtn} arrow title="Play" placement="top">
                <PlayArrowIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
              </Tooltip>
              <Tooltip
                ref={pauseBtn}
                className="w-0"
                arrow
                title="Pause"
                placement="top"
              >
                <PauseIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
              </Tooltip>
              <Tooltip
                ref={replayIcon}
                className="w-0"
                arrow
                title="Replay"
                placement="top"
              >
                <ReplayIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
              </Tooltip>
            </IconButton>
            <IconButton
              disableRipple
              disableTouchRipple
              disableFocusRipple
              className="text-white font-black p-0 ml-1"
            >
              <Tooltip ref={skipNextBtn} arrow title="Next" placement="top">
                <SkipNextIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
              </Tooltip>
            </IconButton>
          </div>
        </div>
        <video
          ref={videoRef}
          playsInline
          className="w-full h-full"
          disablePictureInPicture
        ></video>
      </div>
    </>
  );
};

export default CustomMiniPlayer;
