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
  Snackbar,
  IconButton,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const VideoUploadWindow = ({ isOpen, handleClose }) => {
  const userState = useSelector((state) => state.user);
  const router = useRouter();

  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackMsg, setSnackMsg] = useState("Message");
  const fileUploadInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || uploading) {
      return;
    }

    // checking for if the user has channel
    if (!userState.hasChannel) {
      router.replace("/you/profile/your-channel");
      setFile(null);
      handleClose();
      return;
    }

    // checking if state has user id
    if (!userState._id) {
      setFile(null);
      handleClose();
      return;
    }

    setUploading(true);
    try {
      const res = await axios.post(
        `http://localhost:5599/video-server/upload-new-video/${userState._id}`,
        { file },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.success) {
        const { videoId, url } = res.data;
        console.log(videoId, url);

        setSnackMsg("File uploaded successfully.");
      } else {
        setSnackMsg("Error uploading video.");
      }
      setShowSnackBar(true);
    } catch (e) {
      console.log(e);
    } finally {
      setUploading(false);
      setFile(null);
      handleClose();
    }
  };

  const showAllFiles = () => {
    fileUploadInputRef.current.click();
  };

  return (
    <>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={() => {
          setShowSnackBar(false);
        }}
        message={snackMsg}
        action={
          <IconButton
            size="small"
            onClick={() => {
              setShowSnackBar(false);
            }}
            className="text-white hover:bg-zinc-600"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        className="bg-zinc-700 rounded-lg text-white"
      />
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
          component="form"
          className={
            "flex flex-col items-center shadow-none border-[1px] border-solid border-zinc-400 rounded-md bg-zinc-900 w-full p-2"
          }
          encType="multipart/form-data"
          onSubmit={handleUpload}
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
            type="button"
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
              type="submit"
              disabled={uploading}
              className="flex flex-row items-center gap-3 bg-black p-2 m-1 border-2 border-solid border-black rounded-md disabled:cursor-wait"
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
            bgcolor: "rgb(75 85 99)",
            color: "black",
          },
        }}
      >
        <MenuItem className="hover:bg-zinc-700">
          <ListItemIcon className="text-white text-xl">
            <CreateIcon className="text-white font-black" />
          </ListItemIcon>
          <Typography className="text-white font-bold text-sm">
            Create Now
          </Typography>
        </MenuItem>
        <MenuItem
          className="hover:bg-zinc-700"
          onClick={() => setVideoUploadWindowOpenState((prev) => !prev)}
        >
          <ListItemIcon className="text-white text-xl">
            <UploadIcon className="text-white font-black" />
          </ListItemIcon>
          <Typography className="text-white font-bold text-sm">
            Upload
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default VideoCameraMenu;
