"use client";

import { IconButton, Typography, Slider, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";

// icons
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import TuneIcon from "@mui/icons-material/Tune";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import PictureInPictureAltIcon from "@mui/icons-material/PictureInPictureAlt";
import Crop169Icon from "@mui/icons-material/Crop169";
import Crop32Icon from "@mui/icons-material/Crop32";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const CustomPlayer = ({ videoRef }) => {
  // states
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [currentVolumeLevel, setCurrentVolumeLevel] = useState(1); // Range=[0, 1]

  // refs
  const videoWrapperRef = useRef(null);
  const playBtn = useRef(null);
  const pauseBtn = useRef(null);
  const volumeBtn = useRef(null);
  const muteBtn = useRef(null);
  const lowVolumeBtn = useRef(null);
  const highVolumeBtn = useRef(null);
  const volumeSlider = useRef(null);
  const settingsBtn = useRef(null);
  const settingActions = useRef(null);
  const settingIcon = useRef(null);

  // Play/Pause the video
  const togglePlay = () => {
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
    }
  };

  // use keys to perform actions
  const handleKeyDownEvents = (e) => {
    e.preventDefault();

    switch (e.key) {
      case " ":
      case "k":
        togglePlay();
        break;
      case "m":
        if (videoRef.current.volume === 0) {
          unMuteVideo(e);
        } else {
          muteVideo(e);
        }
        break;
      default:
        break;
    }
  };

  // update the state with current video time
  const updateCurrentVideoTime = () => {
    setCurrentVideoTime(videoRef.current.currentTime);
  };

  // show video slider
  const showVolumeSlider = () => {
    volumeSlider.current.classList.remove("hidden");
  };

  // hide video slider
  const hideVolumeSlider = () => {
    volumeSlider.current.classList.add("hidden");
  };

  // handle volume change
  const handleVolumeChange = (e, newValue) => {
    if (
      isNaN(newValue) ||
      newValue === undefined ||
      newValue === null ||
      newValue < 0 ||
      newValue > 1
    )
      return;
    setCurrentVolumeLevel(Number(newValue));
    videoRef.current.volume = newValue;
    handleVolumeIconChange(newValue);
  };

  // handle volume icon change
  const handleVolumeIconChange = (newValue) => {
    if (newValue > 0.5 && newValue <= 1) {
      muteBtn.current.classList.add("w-0");
      lowVolumeBtn.current.classList.add("w-0");
      highVolumeBtn.current.classList.remove("w-0");
    } else if (newValue > 0 && newValue <= 0.5) {
      muteBtn.current.classList.add("w-0");
      lowVolumeBtn.current.classList.remove("w-0");
      highVolumeBtn.current.classList.add("w-0");
    } else {
      muteBtn.current.classList.remove("w-0");
      lowVolumeBtn.current.classList.add("w-0");
      highVolumeBtn.current.classList.add("w-0");
    }
  };

  // mute video
  let volumeB4mute;
  const muteVideo = (e) => {
    volumeB4mute = videoRef.current.volume;
    handleVolumeChange(e, 0);
  };

  // unmute video
  const unMuteVideo = (e) => {
    handleVolumeChange(e, volumeB4mute || 1);
  };

  // helpers
  const volumeChangeHandler = (e) => {
    handleVolumeChange(e, videoRef.current.volume);
  };

  useEffect(() => {
    if (
      !videoWrapperRef.current ||
      !videoRef ||
      !volumeBtn ||
      !lowVolumeBtn ||
      !highVolumeBtn ||
      !muteBtn ||
      !volumeSlider ||
      !settingsBtn
    )
      return;

    // initially focus the video player
    videoWrapperRef.current.focus();

    // initial volume level
    videoRef.current.volume = currentVolumeLevel;

    // keyboard events
    videoWrapperRef.current.addEventListener("keydown", handleKeyDownEvents);

    // duration
    videoRef.current.addEventListener("timeupdate", updateCurrentVideoTime);

    // volume
    volumeBtn.current.addEventListener("mouseenter", showVolumeSlider);
    volumeBtn.current.addEventListener("mouseleave", hideVolumeSlider);
    lowVolumeBtn.current.addEventListener("click", muteVideo);
    highVolumeBtn.current.addEventListener("click", muteVideo);
    muteBtn.current.addEventListener("click", unMuteVideo);
    videoRef.current.addEventListener("volumechange", volumeChangeHandler);

    // settings

    // cleanup
    return () => {
      // keyboard events
      videoWrapperRef.current.removeEventListener(
        "keydown",
        handleKeyDownEvents
      );

      // duration
      videoRef.current.removeEventListener(
        "timeupdate",
        updateCurrentVideoTime
      );
    };
  }, []);

  // helper functions
  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    let formattedDuration;
    if (hours > 0) {
      formattedDuration = `${hours}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    } else {
      formattedDuration = `${
        minutes >= 10 ? String(minutes).padStart(2, "0") : String(minutes)
      }:${String(seconds).padStart(2, "0")}`;
    }
    return formattedDuration;
  };

  return (
    <>
      <div
        tabIndex={0}
        className="w-full max-w-[1024px] flex justify-center items-center mx-auto bg-black rounded-lg overflow-hidden mb-5 relative"
        ref={videoWrapperRef}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 text-white flex items-end flex-row justify-between">
          <div className="flex flex-col items-start justify-between w-full bg-[#0000008b] pt-2 pb-[4px] md:px-1">
            <div className="w-full px-3">
              <div className="w-40 sm:w-60 aspect-video flex items-start flex-col">
                <img
                  src="/defaultThumbnail.jpg"
                  alt="/"
                  className="w-full h-full border-2 border-solid border-white rounded-lg overflow-hidden"
                  draggable={false}
                />
                <span className="text-white font-normal text-sm mx-1">
                  2:03
                </span>
              </div>
              <Slider
                min={0}
                step={1}
                size="medium"
                sx={{
                  ".MuiSlider-thumb": {
                    width: "15px",
                    height: "15px",
                  },
                }}
                className="text-yellow-400 w-full"
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center">
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1"
                >
                  <Tooltip arrow title="Previous (shift+p)" placement="top">
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
                  <Tooltip
                    ref={playBtn}
                    className="block"
                    arrow
                    title="Play (k)"
                    placement="top"
                  >
                    <PlayArrowIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                  <Tooltip
                    ref={pauseBtn}
                    className="w-0"
                    arrow
                    title="Pause (k)"
                    placement="top"
                  >
                    <PauseIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                </IconButton>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1"
                >
                  <Tooltip arrow title="Replay (r)" placement="top">
                    <ReplayIcon className="opacity-70 hover:opacity-100 hidden md:text-4xl text-2xl" />
                  </Tooltip>
                </IconButton>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1"
                >
                  <Tooltip arrow title="Next (shift+n)" placement="top">
                    <SkipNextIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                </IconButton>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1"
                  ref={volumeBtn}
                >
                  <Tooltip
                    ref={muteBtn}
                    arrow
                    title="Unmute (m)"
                    placement="top"
                    className="block w-0"
                  >
                    <VolumeOffIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                  <Tooltip
                    ref={lowVolumeBtn}
                    arrow
                    title="Mute (m)"
                    placement="top"
                    className="block w-0"
                  >
                    <VolumeDownIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                  <Tooltip
                    ref={highVolumeBtn}
                    arrow
                    title="Mute (m)"
                    placement="top"
                    className="block"
                  >
                    <VolumeUpIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                  <Slider
                    component={"div"}
                    tabIndex={0}
                    ref={volumeSlider}
                    value={currentVolumeLevel}
                    onChange={handleVolumeChange}
                    min={0}
                    step={0.0005}
                    max={1}
                    size="medium"
                    sx={{
                      ".MuiSlider-thumb": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    className="text-white ml-3 mr-1 w-[50px] hidden"
                  />
                </IconButton>
                <Typography className="text-white mx-1 p-2">
                  <Typography variant="caption" component={"span"}>
                    {videoRef.current ? (
                      formatDuration(currentVideoTime)
                    ) : (
                      <>0:00</>
                    )}
                  </Typography>
                  <Typography variant="caption" component={"span"}>
                    /
                  </Typography>
                  <Typography variant="caption" component={"span"}>
                    {videoRef.current ? (
                      formatDuration(videoRef.current.duration)
                    ) : (
                      <>0:00</>
                    )}
                  </Typography>
                </Typography>
              </div>
              <div className="flex flex-row items-center gap-0 sm:gap-2 md:gap-4">
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1"
                >
                  <Tooltip arrow title="Captions (c)" placement="top">
                    <SubtitlesIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl border-0 border-b-2 border-solid border-b-yellow-400" />
                  </Tooltip>
                </IconButton>
                <div>
                  <div
                    ref={settingActions}
                    className="absolute right-[20%] bottom-[20%] sm:bottom-[15%] w-fit h-fit bg-zinc-700 hidden flex-col items-start rounded-lg overflow-hidden py-2"
                  >
                    <div className="flex flex-row items-center justify-between hover:bg-gray-600 cursor-pointer p-2 w-full">
                      <div className="flex flex-row items-center gap-1">
                        <SlowMotionVideoIcon />
                        <Typography
                          variant="subtitle1"
                          component={"span"}
                          className="text-white text-nowrap text-base"
                        >
                          Playback speed
                        </Typography>
                      </div>
                      <Typography
                        variant="subtitle2"
                        component={"span"}
                        className="ml-4"
                      >
                        1x
                      </Typography>
                      <KeyboardArrowRightIcon />
                    </div>
                    <div className="flex flex-row items-center justify-between hover:bg-gray-600 cursor-pointer p-2  w-full">
                      <div className="flex flex-row items-center gap-1">
                        <TuneIcon />
                        <Typography
                          variant="subtitle1"
                          component={"span"}
                          className="text-white text-nowrap text-base"
                        >
                          Quality
                        </Typography>
                      </div>
                      <Typography
                        variant="subtitle2"
                        component={"span"}
                        className="ml-4"
                      >
                        Auto 480p
                      </Typography>
                      <KeyboardArrowRightIcon />
                    </div>
                  </div>
                  <IconButton
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                    className="text-white font-black p-0 ml-1"
                    ref={settingsBtn}
                  >
                    <Tooltip arrow title="Settings" placement="top">
                      <SettingsIcon
                        component={"i"}
                        ref={settingIcon}
                        className="opacity-70 hover:opacity-100 md:text-4xl text-2xl"
                      />
                    </Tooltip>
                  </IconButton>
                </div>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1"
                >
                  <Tooltip arrow title="Miniplayer (i)" placement="top">
                    <PictureInPictureAltIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                </IconButton>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1"
                >
                  <Tooltip arrow title="Theater mode (t)" placement="top">
                    <Crop32Icon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                  <Tooltip arrow title="Theater mode (t)" placement="top">
                    <Crop169Icon className="opacity-70 hover:opacity-100 hidden md:text-4xl text-2xl" />
                  </Tooltip>
                </IconButton>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1 mr-1"
                >
                  <Tooltip arrow title="Full screen (f)" placement="top">
                    <FullscreenIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                  <Tooltip arrow title="Full screen (f)" placement="top">
                    <FullscreenExitIcon className="opacity-70 hover:opacity-100 hidden md:text-4xl text-2xl" />
                  </Tooltip>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <video ref={videoRef} playsInline className="w-full h-full"></video>
      </div>
    </>
  );
};

export default CustomPlayer;
