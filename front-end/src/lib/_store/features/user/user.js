import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  dob: "",
  methodOfLogin: "",
  hasChannel: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    _setUserData: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.dob = action.payload.dob;
      state.methodOfLogin = action.payload.methodOfLogin;
      state.hasChannel = action.payload.hasChannel;
    },
    _resetUserData: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.dob = "";
      state.methodOfLogin = "";
      state.hasChannel = false;
    },
  },
});

export const { _setUserData, _resetUserData } = userSlice.actions;

export default userSlice.reducer;
