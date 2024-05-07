"use client";

import { Typography, Menu, MenuItem, ListItemIcon } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UploadIcon from "@mui/icons-material/Upload";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const VideoCameraMenu = ({ isMenuOpen, handleMenuClose, anchorEl }) => {
  const userState = useSelector((state) => state.user);
  const router = useRouter();

  const uploadVideo = () => {
    handleMenuClose((prev) => !prev);
    if (!userState.hasChannel) {
      router.replace("/you/create-channel");
      return null;
    }
    router.replace("/you/upload-video");
  };

  return (
    <>
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
        <MenuItem className="hover:bg-zinc-700" onClick={uploadVideo}>
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
