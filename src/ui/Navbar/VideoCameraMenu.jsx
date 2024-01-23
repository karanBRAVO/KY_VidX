"use client";

import {
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  Paper,
  Box,
  Button,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UploadIcon from "@mui/icons-material/Upload";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import { useRef, useState } from "react";
import axios from "axios";

const VideoUploadWindow = ({ isOpen, handleClose }) => {
  const fileUploadInputRef = useRef(null);
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || uploading) {
      return;
    }

    setUploading(true);
    try {
      const res = await axios.post(`/api/video/upload`, { file });
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setUploading(false);
    }
  };

  const showAllFiles = () => {
    fileUploadInputRef.current.click();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={"lg"}
        sx={{
          ".MuiDialog-paper": {
            bgcolor: "#0000",
            width: "100%",
          },
        }}
      >
        <Paper
          component="div"
          className={
            "flex flex-col items-center shadow-none border-[1px] border-solid border-zinc-400 rounded-md bg-zinc-900 w-full p-2"
          }
        >
          <input
            type="file"
            name="videoFile"
            id="userFileUploadInput"
            ref={fileUploadInputRef}
            onChange={(e) => setFile((prev) => e.target.files[0])}
            required
            multiple={false}
            accept="video/*"
            className="hidden"
          />
          <Button
            disableFocusRipple={true}
            disableTouchRipple={true}
            disableRipple={true}
            disableElevation={true}
            className="w-full flex flex-col items-center hover:bg-transparent"
            onClick={showAllFiles}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <CloudCircleIcon className="text-white font-black text-9xl mx-1" />
              <Typography
                variant="caption"
                component={"span"}
                className="flex flex-col text-white text-lg sm:text-5xl leading-snug tracking-tight font-mono"
              >
                <span className="text-xs text-zinc-500">{`(Click me to choose a video)`}</span>
                Upload your videos or shorts{" "}
              </Typography>
            </Box>
          </Button>
          {file && (
            <Button
              disabled={uploading}
              className="flex flex-row items-center gap-3 bg-black p-2 m-1 border-2 border-solid border-black rounded-md disabled:cursor-wait"
              onClick={() => handleUpload()}
            >
              <UploadIcon className="text-white text-5xl" />
              <Typography className="text-white font-sans">
                {uploading ? <>Uploading...</> : <>Upload</>}
              </Typography>
            </Button>
          )}
        </Paper>
      </Dialog>
    </>
  );
};

const VideoCameraMenu = ({ isMenuOpen, handleMenuClose, anchorEl }) => {
  const [videoUploadWindowOpenState, setVideoUploadWindowOpenState] =
    useState(false);

  return (
    <>
      <VideoUploadWindow
        isOpen={videoUploadWindowOpenState}
        handleClose={() => setVideoUploadWindowOpenState((prev) => !prev)}
      />
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "video-menu-button",
        }}
        sx={{
          ".MuiMenu-paper": {
            bgcolor: "white",
            color: "black",
          },
        }}
      >
        <MenuItem className="hover:bg-zinc-300">
          <ListItemIcon className="text-black text-xl">
            <CreateIcon />
          </ListItemIcon>
          <Typography className="text-black font-bold text-sm">
            Create Now
          </Typography>
        </MenuItem>
        <MenuItem
          className="hover:bg-zinc-300"
          onClick={() => setVideoUploadWindowOpenState((prev) => !prev)}
        >
          <ListItemIcon className="text-black text-xl">
            <UploadIcon />
          </ListItemIcon>
          <Typography className="text-black font-bold text-sm">
            Upload
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default VideoCameraMenu;
