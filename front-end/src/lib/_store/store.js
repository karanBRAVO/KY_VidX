import { configureStore } from "@reduxjs/toolkit";
import {
  miniVideoPlayerReducer,
  userReducer,
  notifierReducer,
} from "./features/FeatureExporter";

export const makeStore = () => {
  return configureStore({
    reducer: {
      miniVideoPlayer: miniVideoPlayerReducer,
      user: userReducer,
      notifier: notifierReducer,
    },
  });
};
