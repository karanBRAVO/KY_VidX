import { configureStore } from "@reduxjs/toolkit";
import miniVideoPlayerReducer from "@/lib/_store/features/video-player/videoPlayerSlice.js";

export const makeStore = () => {
  return configureStore({
    reducer: {
      miniVideoPlayer: miniVideoPlayerReducer,
    },
  });
};
