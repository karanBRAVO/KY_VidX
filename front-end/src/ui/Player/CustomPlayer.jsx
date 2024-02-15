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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CustomPlayer = ({ videoRef, videoId, setVideoQuality }) => {
  const QUALITIES = [
    { name: "1080p", res: "1920x1080" },
    { name: "720p", res: "1280x720" },
    { name: "480p", res: "854x480" },
    { name: "360p", res: "640x360" },
    { name: "240p", res: "426x240" },
    { name: "144p", res: "256x144" },
    { name: "Auto", res: "master" },
  ];
  const PLAYBACK_SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  // states
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [currentVolumeLevel, setCurrentVolumeLevel] = useState(1); // Range=[0, 1]
  const [currentVideoSliderLevel, setCurrentVideoSliderLevel] = useState(0);
  const [videoResolution, setVideoResolution] = useState("Auto");
  const [customPlayBackSpeed, setCustomPlayBackSpeed] = useState(1);

  // refs
  const videoWrapperRef = useRef(null);
  const videoOverlay = useRef(null);
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
  const enterFullScreenBtn = useRef(null);
  const exitFullScreenBtn = useRef(null);
  const videoPreviewSlider = useRef(null);
  const videoPreviewContainer = useRef(null);
  const videoPreviewImage = useRef(null);
  const videoPreviewTime = useRef(null);
  const videoControlsWrapper = useRef(null);
  const replayBtn = useRef(null);
  const replayIcon = useRef(null);
  const miniPlayerBtn = useRef(null);
  const showAvailableVideoQualitiesBtn = useRef(null);
  const qualitySelector = useRef(null);
  const showPlaybackSpeedsBtn = useRef(null);
  const playbackSpeedsContainer = useRef(null);

  // show/hide video controls
  const showVideoControls = (e) => {
    if (
      videoControlsWrapper.current &&
      videoControlsWrapper.current.classList.contains("hidden")
    ) {
      videoControlsWrapper.current.classList.remove("hidden");
      videoControlsWrapper.current.classList.add("flex");
    }
  };
  const hideVideoControls = (e) => {
    if (
      videoControlsWrapper.current &&
      videoControlsWrapper.current.classList.contains("flex")
    ) {
      videoControlsWrapper.current.classList.remove("flex");
      videoControlsWrapper.current.classList.add("hidden");
    }
  };

  // video slider
  const handleVideoSliderValueChange = (e, newValue) => {
    if (isNaN(newValue) || newValue === undefined || newValue === null) return;
    setCurrentVideoSliderLevel(newValue);
    videoRef.current.currentTime = newValue;
    e.stopPropagation();
  };

  // show/hide video preview
  let x;
  let videoSrc;
  const showVideoPreview = (e) => {
    const previewWidth = 160;
    const widthOffset = 70;
    let offset = 0;
    if (e.layerX > previewWidth + widthOffset) {
      offset =
        window.innerWidth > 640 ? previewWidth + widthOffset : previewWidth;
    }
    x = e.layerX - offset;

    const sliderRect = videoPreviewSlider.current.getBoundingClientRect();
    const percentage = (e.clientX - sliderRect.left) / sliderRect.width;
    const maxValue = videoRef.current ? videoRef.current.duration : 100;
    const hoverValue = Math.floor(percentage * maxValue);
    videoSrc = `${
      process.env.NEXT_PUBLIC_VIDEO_SERVER_URL
    }/${videoId}/thumbnail/image${String(hoverValue).padStart(3, "0")}.png`;

    videoPreviewContainer.current.style.left = `${x}px`;
    videoPreviewContainer.current.classList.remove("hidden");
    videoPreviewContainer.current.classList.add("flex");
    videoPreviewImage.current.src = videoSrc;
  };
  const hideVideoPreview = (e) => {
    videoPreviewContainer.current.style.left = `${x}px`;
    videoPreviewContainer.current.classList.remove("flex");
    videoPreviewContainer.current.classList.add("hidden");
    videoPreviewImage.current.src = videoSrc;
  };

  // Play/Pause the video
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
    e.stopPropagation();
  };

  // show replay video button
  const showReplayVideoBtn = (e) => {
    if (replayIcon.current.classList.contains("w-0")) {
      pauseBtn.current.classList.add("w-0");
      playBtn.current.classList.add("w-0");
      replayIcon.current.classList.remove("w-0");
    }
  };

  // replay video
  const replayVideo = (e) => {
    togglePlay(e);
  };

  // use keys to perform actions
  const handleKeyDownEvents = (e) => {
    e.preventDefault();

    switch (String(e.key).toLowerCase()) {
      case " ":
      case "k":
        togglePlay(e);
        break;
      case "m":
        if (videoRef.current.volume === 0) {
          unMuteVideo(e);
        } else {
          muteVideo(e);
        }
        break;
      case "f":
        toggleFullScreen(e);
        break;
      case "arrowright":
        if (videoRef.current.currentTime + 5 > videoRef.current.duration) {
          videoRef.current.currentTime = videoRef.current.duration;
        } else {
          videoRef.current.currentTime += 5;
        }
        break;
      case "arrowleft":
        if (videoRef.current.currentTime - 5 < 0) {
          videoRef.current.currentTime = 0;
        } else {
          videoRef.current.currentTime -= 5;
        }
        break;
      case "arrowup":
        if (videoRef.current.volume + 0.1 > 1) {
          videoRef.current.volume = 1;
        } else {
          videoRef.current.volume += 0.1;
        }
        break;
      case "arrowdown":
        if (videoRef.current.volume - 0.1 < 0) {
          videoRef.current.volume = 0;
        } else {
          videoRef.current.volume -= 0.1;
        }
        break;
      case "r":
        replayVideo(e);
        break;
      default:
        break;
    }
  };

  // choose the quality of the video
  const chooseVideoQuality = (quality) => {
    let _res_ = "";
    if (quality.toLowerCase() === "master") {
      _res_ = quality;
    } else {
      _res_ = `video-output-${quality}`;
    }
    setVideoQuality(_res_);
    hideAvailableVideoQualities();
    if (settingsBtn.current) {
      settingsBtn.current.click();
    }
  };

  // show the available video quality
  const showAvailableQualities = (e) => {
    if (qualitySelector.current) {
      qualitySelector.current.classList.add("flex");
      qualitySelector.current.classList.remove("hidden");
    }
    e.stopPropagation();
  };

  // hide available video quality selectors
  const hideAvailableVideoQualities = () => {
    if (qualitySelector.current) {
      if (qualitySelector.current.classList.contains("flex")) {
        qualitySelector.current.classList.remove("flex");
        qualitySelector.current.classList.add("hidden");
      }
    }
  };

  // playback speed
  const showPlayBackSpeedOptions = (e) => {
    if (playbackSpeedsContainer.current) {
      if (playbackSpeedsContainer.current.classList.contains("hidden")) {
        playbackSpeedsContainer.current.classList.remove("hidden");
        playbackSpeedsContainer.current.classList.add("flex");
      }
    }
    e.stopPropagation();
  };

  // hide the play back speed options
  const hidePlaybackSpeedOptions = () => {
    if (playbackSpeedsContainer.current) {
      if (playbackSpeedsContainer.current.classList.contains("flex")) {
        playbackSpeedsContainer.current.classList.remove("flex");
        playbackSpeedsContainer.current.classList.add("hidden");
      }
    }
  };

  // change the playback speed
  const changePlaybackSpeed = (speed) => {
    setCustomPlayBackSpeed(speed);
  };

  // custom(input) playback speed
  const increasePlaybackSpeed = (e) => {
    setCustomPlayBackSpeed((prevSpeed) => prevSpeed + 0.25);
    e.stopPropagation();
  };
  const decreasePlaybackSpeed = (e) => {
    if (customPlayBackSpeed > 0.25) {
      setCustomPlayBackSpeed((prevSpeed) => prevSpeed - 0.25);
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if (videoRef.current && customPlayBackSpeed > 0.25) {
      videoRef.current.playbackRate = customPlayBackSpeed;
      hidePlaybackSpeedOptions();
    }
  }, [customPlayBackSpeed]);

  // update the state with current video time
  const updateCurrentVideoTime = (e) => {
    e.preventDefault();
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setCurrentVideoTime(t);
    setCurrentVideoSliderLevel(t);
    e.stopPropagation();
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
    e.stopPropagation();
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
    e.stopPropagation();
  };

  // unmute video
  const unMuteVideo = (e) => {
    handleVolumeChange(e, volumeB4mute || 1);
    e.stopPropagation();
  };

  // helpers
  const volumeChangeHandler = (e) => {
    handleVolumeChange(e, videoRef.current.volume);
  };

  // show/hide settings
  const toggleSettings = (e) => {
    if (settingActions.current.classList.contains("hidden")) {
      settingIcon.current.style.transform = `rotateZ(45deg)`;
      settingActions.current.classList.remove("hidden");
      settingActions.current.classList.add("flex");
    } else {
      settingIcon.current.style.transform = `rotateZ(-45deg)`;
      settingActions.current.classList.add("hidden");
      settingActions.current.classList.remove("flex");
    }
    hideAvailableVideoQualities();
    e.stopPropagation();
  };

  // full screen mode
  const toggleFullScreen = (e) => {
    if (!document.fullscreenEnabled) {
      console.log("Full screen not enabled");
      return;
    }

    if (!document.fullscreenElement) {
      videoWrapperRef.current
        .requestFullscreen()
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {})
        .catch((err) => console.error(err));
    }
    e.stopPropagation();
  };

  // change full screen icon
  const changeFullScreenIcon = (e) => {
    if (document.fullscreenElement) {
      enterFullScreenBtn.current.classList.add("w-0");
      exitFullScreenBtn.current.classList.remove("w-0");
    } else {
      enterFullScreenBtn.current.classList.remove("w-0");
      exitFullScreenBtn.current.classList.add("w-0");
    }
    e.stopPropagation();
  };

  // mini-player
  const showMiniPlayer = (e) => {
    localStorage.setItem("showMiniPlayer", true);
    e.stopPropagation();
  };

  useEffect(() => {
    if (
      !videoWrapperRef.current ||
      !videoOverlay.current ||
      !videoRef.current ||
      !volumeBtn.current ||
      !lowVolumeBtn.current ||
      !highVolumeBtn.current ||
      !muteBtn.current ||
      !volumeSlider.current ||
      !settingsBtn.current ||
      !enterFullScreenBtn.current ||
      !exitFullScreenBtn.current ||
      !videoPreviewSlider.current ||
      !showAvailableVideoQualitiesBtn.current ||
      !showPlaybackSpeedsBtn
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
    lowVolumeBtn.current.addEventListener("click", muteVideo, false);
    highVolumeBtn.current.addEventListener("click", muteVideo, false);
    muteBtn.current.addEventListener("click", unMuteVideo, false);
    videoRef.current.addEventListener("volumechange", volumeChangeHandler);

    // settings
    settingsBtn.current.addEventListener("click", toggleSettings, false);

    // full screen mode
    enterFullScreenBtn.current.addEventListener(
      "click",
      toggleFullScreen,
      false
    );
    exitFullScreenBtn.current.addEventListener(
      "click",
      toggleFullScreen,
      false
    );
    document.addEventListener("fullscreenchange", changeFullScreenIcon);

    // preview slider
    videoPreviewSlider.current.addEventListener("mousemove", showVideoPreview);
    videoPreviewSlider.current.addEventListener("mouseleave", hideVideoPreview);

    // video ended
    videoRef.current.addEventListener("ended", showReplayVideoBtn);

    // show controls
    videoWrapperRef.current.addEventListener("mousemove", showVideoControls);
    videoWrapperRef.current.addEventListener("mouseleave", hideVideoControls);
    videoWrapperRef.current.addEventListener("touchmove", showVideoControls);

    // play/pause video
    videoOverlay.current.addEventListener("click", togglePlay, false);

    // mini-player
    miniPlayerBtn.current.addEventListener("click", showMiniPlayer, false);

    // video quality change
    showAvailableVideoQualitiesBtn.current.addEventListener(
      "click",
      showAvailableQualities,
      false
    );

    // play back speed
    showPlaybackSpeedsBtn.current.addEventListener(
      "click",
      showPlayBackSpeedOptions,
      false
    );
    videoRef.current.addEventListener("ratechange", (e) => {
      changePlaybackSpeed(videoRef.current.playbackRate);
    });
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
        <div
          className="absolute z-[1] bottom-0 left-0 right-0 top-0 text-white flex items-end flex-row justify-between w-full"
          ref={videoOverlay}
        >
          <div
            ref={videoControlsWrapper}
            className="flex transition-all flex-col items-start justify-between w-full bg-[#0000008b] pt-2 pb-[4px] md:px-1"
          >
            <div className="w-full px-3 relative">
              <div
                ref={videoPreviewContainer}
                className="w-40 sm:w-60 aspect-video absolute z-[2] top-[-85px] sm:top-[-130px] hidden items-start flex-col"
                style={{ transition: "left 100ms linear" }}
              >
                <img
                  ref={videoPreviewImage}
                  alt="/"
                  className="w-full h-full border-2 border-solid border-white rounded-lg overflow-hidden"
                  draggable={false}
                />
                <span
                  ref={videoPreviewTime}
                  className="text-white font-normal text-sm mx-1"
                ></span>
              </div>
              <Slider
                component={"div"}
                ref={videoPreviewSlider}
                min={0}
                step={0.001}
                max={videoRef.current && videoRef.current.duration}
                value={currentVideoSliderLevel}
                onChange={handleVideoSliderValueChange}
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
                  ref={replayBtn}
                  onClick={replayVideo}
                >
                  <Tooltip
                    ref={replayIcon}
                    className="w-0"
                    arrow
                    title="Replay (r)"
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
                    className="absolute z-[3] right-[20%] bottom-[20%] sm:bottom-[15%] md:bottom-[12.5%] lg:bottom-[10%] w-fit h-fit bg-zinc-700 hidden flex-col items-start rounded-lg overflow-hidden py-2"
                  >
                    <div
                      ref={qualitySelector}
                      className="absolute z-[4] w-full h-full cursor-pointer top-0 left-0 hidden flex-col items-start bg-zinc-700 rounded-lg overflow-auto"
                    >
                      {QUALITIES.map((quality, idx) => (
                        <div
                          key={idx}
                          onMouseDown={(e) => {
                            chooseVideoQuality(quality.res);
                            setVideoResolution(quality.name);
                            e.stopPropagation();
                          }}
                          className="py-2 px-3 hover:bg-gray-600 text-white text-xl font-normal w-full"
                        >
                          <span>{quality.name}</span>
                        </div>
                      ))}
                    </div>
                    <div
                      ref={playbackSpeedsContainer}
                      className="absolute z-[5] w-full h-full cursor-pointer top-0 left-0 hidden flex-col items-start bg-zinc-700 rounded-lg overflow-auto"
                    >
                      {PLAYBACK_SPEEDS.map((speed, idx) => (
                        <div
                          key={idx}
                          onMouseDown={(e) => {
                            changePlaybackSpeed(speed);
                            e.stopPropagation();
                          }}
                          className="py-2 px-3 hover:bg-gray-600 text-white text-xl font-normal w-full"
                        >
                          <span>{speed}x</span>
                        </div>
                      ))}
                      <Typography
                        variant="caption"
                        component={"span"}
                        className="text-white capitalize p-1 bg-zinc-800 w-full"
                      >
                        Custom
                      </Typography>
                      <div className="flex flex-row items-center justify-between text-white w-full bg-zinc-800">
                        <IconButton
                          className="hover:bg-gray-600"
                          onMouseDown={increasePlaybackSpeed}
                        >
                          <AddIcon className="text-white" />
                        </IconButton>
                        <Typography variant="button" component={"span"}>
                          {customPlayBackSpeed}
                        </Typography>
                        <IconButton
                          className="hover:bg-gray-600"
                          onMouseDown={decreasePlaybackSpeed}
                        >
                          <RemoveIcon className="text-white" />
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between hover:bg-gray-600 cursor-pointer p-2 w-full">
                      <div
                        ref={showPlaybackSpeedsBtn}
                        className="flex flex-row items-center gap-1"
                      >
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
                        {customPlayBackSpeed}x
                      </Typography>
                      <KeyboardArrowRightIcon />
                    </div>
                    <div
                      ref={showAvailableVideoQualitiesBtn}
                      className="flex flex-row items-center justify-between hover:bg-gray-600 cursor-pointer p-2  w-full"
                    >
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
                        {videoResolution}
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
                    <Tooltip
                      ref={settingIcon}
                      arrow
                      title="Settings"
                      placement="top"
                      className="transition-transform origin-center"
                    >
                      <SettingsIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl text-white" />
                    </Tooltip>
                  </IconButton>
                </div>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1"
                  onClick={showMiniPlayer}
                >
                  <Tooltip
                    ref={miniPlayerBtn}
                    arrow
                    title="Miniplayer (i)"
                    placement="top"
                  >
                    <PictureInPictureAltIcon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                </IconButton>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1 hidden lg:block"
                >
                  <Tooltip arrow title="Theater mode (t)" placement="top">
                    <Crop32Icon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                  <Tooltip
                    className="w-0"
                    arrow
                    title="Theater mode (t)"
                    placement="top"
                  >
                    <Crop169Icon className="opacity-70 hover:opacity-100 md:text-4xl text-2xl" />
                  </Tooltip>
                </IconButton>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  className="text-white font-black p-0 ml-1 mr-1"
                >
                  <Tooltip
                    ref={enterFullScreenBtn}
                    arrow
                    title="Full screen (f)"
                    placement="top"
                  >
                    <FullscreenIcon className="opacity-70 hover:opacity-100 hover:scale-125 transition-all md:text-4xl text-2xl" />
                  </Tooltip>
                  <Tooltip
                    ref={exitFullScreenBtn}
                    className="w-0"
                    arrow
                    title="Full screen (f)"
                    placement="top"
                  >
                    <FullscreenExitIcon className="opacity-70 hover:opacity-100 hover:scale-75 transition-all md:text-4xl text-2xl" />
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
