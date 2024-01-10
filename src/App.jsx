import React from "react";
import {
  NavigationBar,
  VideoContainer,
} from "./Components/ComponentExporter.js";
import CssBaseLine from "@mui/material/CssBaseline";

const App = () => {
  return (
    <>
      <CssBaseLine />
      <NavigationBar />
      <VideoContainer />
    </>
  );
};

export default App;
