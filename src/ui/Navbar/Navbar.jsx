"use client";

import {
  AppBar,
  Box,
  Stack,
  IconButton,
  Avatar,
  Badge,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { SideBar, RecommendationBar } from "../ComponentExporter.js";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoCameraMenu from "./VideoCameraMenu.jsx";
import NotificationMenu from "./NotificationMenu.jsx";

const Navbar = () => {
  const [isVideoCameraOpen, setisVideoCameraOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleVideoCameraOpen = (e) => {
    setisVideoCameraOpen(true);
    setAnchorEl(e.currentTarget);
  };
  const handleVideoCameraClose = () => {
    setisVideoCameraOpen(false);
    setAnchorEl(null);
  };

  const [isNotificationOpen, setisNotificationOpen] = useState(false);
  const [notification_anchorEl, setNotification_AnchorEl] = useState(null);
  const handleNotificationMenuOpen = (e) => {
    setisNotificationOpen(true);
    setNotification_AnchorEl(e.currentTarget);
  };
  const handleNotificationMenuClose = () => {
    setisNotificationOpen(false);
    setNotification_AnchorEl(null);
  };

  const [sidebarIsOpen, setSideBarIsOpen] = useState(false);
  const [recommendationItems, setRecommendationItems] = useState([
    { name: "All" },
    { name: "DSA" },
    { name: "Computer" },
    { name: "Blender" },
    { name: "Games" },
    { name: "Docker" },
    { name: "Funny" },
    { name: "Nginx" },
    { name: "Redis" },
    { name: "API" },
    { name: "ML/DL" },
    { name: "API" },
    { name: "Racing" },
    { name: "Fitness" },
    { name: "Karan Yadav" },
    { name: "Live" },
    { name: "Blockchain" },
  ]);
  const [currentRecommendation, setCurrentRecommendationState] =
    useState("all");

  return (
    <>
      <AppBar
        position="fixed"
        component={"nav"}
        enableColorOnDark
        className="bg-black px-2 md:py-3 py-2 text-white"
      >
        <SideBar state={sidebarIsOpen} setState={setSideBarIsOpen} />
        <VideoCameraMenu
          isMenuOpen={isVideoCameraOpen}
          handleMenuClose={handleVideoCameraClose}
          anchorEl={anchorEl}
        />
        <NotificationMenu
          isMenuOpen={isNotificationOpen}
          handleMenuClose={handleNotificationMenuClose}
          anchorEl={notification_anchorEl}
        />
        <Stack
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          component={"div"}
        >
          <Box component={"div"}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
              component={"div"}
            >
              <IconButton
                onClick={() => setSideBarIsOpen((prev) => !prev)}
                className="text-white hover:bg-gray-800"
              >
                <MenuIcon />
              </IconButton>
              <Link href={"/"}>
                <Box
                  component={"div"}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  className="cursor-pointer gap-1"
                >
                  <Image
                    src="/Logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-11 h-auto rounded-sm"
                  />
                  <Typography
                    variant="h4"
                    component={"h1"}
                    noWrap
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    className="text-white tracking-tight leading-tight"
                  >
                    <Typography
                      variant="h5"
                      component={"span"}
                      className="font-thin"
                    >
                      vid
                    </Typography>
                    <Typography
                      variant="h3"
                      component={"span"}
                      className="uppercase font-black"
                    >
                      X
                    </Typography>
                  </Typography>
                </Box>
              </Link>
            </Stack>
          </Box>
          <Box component={"div"}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={1}
              component={"div"}
            >
              <Tooltip title={"Search"}>
                <IconButton className="text-white hover:bg-gray-800">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Search with Voice"} className="hidden sm:block">
                <IconButton className="text-white hover:bg-gray-800">
                  <KeyboardVoiceIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Create"} className="hidden sm:block">
                <IconButton
                  className="text-white hover:bg-gray-800"
                  onClick={handleVideoCameraOpen}
                >
                  <VideoCallIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Notifications"}>
                <IconButton
                  className="text-white hover:bg-gray-800"
                  onClick={handleNotificationMenuOpen}
                >
                  <Badge
                    badgeContent={3}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    color="info"
                  >
                    <NotificationsNoneOutlinedIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Avatar className="bg-yellow-500 text-black cursor-pointer">
                KY
              </Avatar>
            </Stack>
          </Box>
        </Stack>
        <RecommendationBar
          items={recommendationItems}
          setCurrentRecommendationState={setCurrentRecommendationState}
        />
      </AppBar>
    </>
  );
};

export default Navbar;
