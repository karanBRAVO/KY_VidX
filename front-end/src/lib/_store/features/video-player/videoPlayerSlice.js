import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  src: "",
  pathURL: "",
  startTime: 0,
  playbackRate: 1,
};

const miniVideoPlayerSlice = createSlice({
  name: "video-player",
  initialState,
  reducers: {
    _showMiniVideoPlayer: (state, action) => {
      state.src = action.payload.videoSrc;
      state.pathURL = action.payload.pathURL;
      state.startTime = action.payload.startTime;
      state.playbackRate = action.payload.playbackRate;
      state.status = true;
    },
    _hideMiniVideoPlayer: (state, action) => {
      state.src = "";
      state.pathURL = "";
      state.startTime = 0;
      state.status = false;
    },
  },
});

export const { _showMiniVideoPlayer, _hideMiniVideoPlayer } =
  miniVideoPlayerSlice.actions;

export default miniVideoPlayerSlice.reducer;
