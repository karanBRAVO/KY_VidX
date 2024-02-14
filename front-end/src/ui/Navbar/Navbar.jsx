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
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { SideBar, RecommendationBar, OAuth } from "../ComponentExporter.js";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoCameraMenu from "./VideoCameraMenu.jsx";
import NotificationMenu from "./NotificationMenu.jsx";
import SearchBox from "./SearchBox.jsx";
import { useSession } from "next-auth/react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  const { data: session, status } = useSession();

  const [oauthScreenIsOpen, setOauthScreenIsOpen] = useState(false);
  const handleOauthScreenOpen = () => {
    setOauthScreenIsOpen(true);
  };
  const handleOauthScreenClose = () => {
    setOauthScreenIsOpen(false);
  };

  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const handleSearchBoxOpen = () => {
    setSearchBoxOpen(true);
  };
  const handleSearchBoxClose = () => {
    setSearchBoxOpen(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchBoxValue);
    handleSearchBoxClose();
  };

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
        <OAuth
          isOpen={oauthScreenIsOpen}
          handleClose={handleOauthScreenClose}
        />
        <SearchBox
          isOpen={searchBoxOpen}
          handleClose={handleSearchBoxClose}
          value={searchBoxValue}
          setValue={setSearchBoxValue}
          onformsubmit={handleSearch}
        />
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
                <IconButton
                  className="text-white hover:bg-gray-800"
                  onClick={handleSearchBoxOpen}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Search with Voice"} className="hidden sm:block">
                <IconButton className="text-white hover:bg-gray-800">
                  <KeyboardVoiceIcon />
                </IconButton>
              </Tooltip>
              {status === "loading" ? (
                <>
                  <HourglassBottomIcon className="text-white animate-spin" />
                </>
              ) : status === "authenticated" ? (
                <>
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
                  {session?.user?.image ? (
                    <>
                      <Avatar
                        src={session?.user?.image}
                        alt="/"
                        className="border-2 border-solid border-white w-11 h-11"
                      />
                    </>
                  ) : (
                    <Avatar className="bg-yellow-500 text-black cursor-pointer">
                      {session?.user?.name[0]}
                    </Avatar>
                  )}
                </>
              ) : (
                <>
                  <Button
                    className="flex flex-row items-center justify-evenly gap-2 text-white bg-black mx-1 rounded-lg sm:rounded-full sm:border-2 border-solid border-white"
                    onClick={handleOauthScreenOpen}
                  >
                    <LoginIcon className="text-white font-black" />
                    <Typography
                      variant="button"
                      component={"span"}
                      className="text-xs hidden sm:block font-black text-white"
                    >
                      Sign In
                    </Typography>
                  </Button>
                </>
              )}
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
