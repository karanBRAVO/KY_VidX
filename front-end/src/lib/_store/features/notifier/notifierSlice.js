import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  msg: "Hello World!",
};

const notifierSlice = createSlice({
  name: "notifier",
  initialState,
  reducers: {
    _showNotifier: (state, action) => {
      state.visible = true;
      state.msg = action.payload.msg;
    },
    _hideNotifier: (state, action) => {
      state.visible = false;
    },
  },
});

export const { _showNotifier, _hideNotifier } = notifierSlice.actions;

export default notifierSlice.reducer;
