"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
  Box,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import OtherHomeTab from "./OtherHomeTab";
import OtherVideoTab from "./OtherVideoTab";
import OtherPlaylistTab from "./OtherPlaylistTab";
import OtherAnnouncementTab from "./OtherAnnouncementTab";
import Info from "../you/yourChannel/Info";
import axios from "axios";

// icons
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getLocaleTime } from "@/lib/utils/DateConvertor";

const OtherProfile = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");

  useEffect(() => {
    getUsersChannelData();
  }, []);

  const getUsersChannelData = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `/api/user/others/get-channel-details?userId=${userId}`
      );
      if (res.data.success) {
        setUserData((prev) => res.data.details);
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowInfoChange = () => {
    setShowInfo((prev) => !prev);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Container className="min-h-screen mt-[130px]" maxWidth={false}>
        {loading ? (
          <div className="w-full p-5 my-4 flex items-center justify-center">
            <CircularProgress className="text-white font-black" />
          </div>
        ) : !userData ? (
          <div className="flex items-center justify-center p-4 my-5">
            <Typography variant="subtitle1" component={"h5"}>
              Sorry, No channel found.
            </Typography>
          </div>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
            color={"white"}
          >
            <Info
              open={showInfo}
              handleClose={handleShowInfoChange}
              contact={userData.userEmail}
              views={userData.views}
              subscribers={userData.subscribers}
              videosCount={userData.videos}
              joinedOn={getLocaleTime(userData.joinedat)}
              location={userData.location}
            />
            <Box width={"100%"} height={"250px"} marginY={"10px"}>
              <img
                src={userData.bgImg}
                alt="banner"
                width={100}
                height={100}
                className="w-full h-full rounded-xl cursor-pointer border-2 border-solid border-black shadow-sm shadow-slate-900"
              />
            </Box>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Avatar
                  alt="Avatar"
                  src={userData.userImage}
                  className="cursor-pointer w-20 h-20 lg:w-32 lg:h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-solid border-black"
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                gap={"5px"}
              >
                <Box>
                  <Typography
                    variant="h1"
                    component={"h1"}
                    className="capitalize font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tight flex flex-col items-start"
                  >
                    {userData.userName}
                    <Typography
                      variant="subtitle1"
                      className="text-zinc-300 mx-4 p-[.5px] my-1"
                      component={"span"}
                    >
                      <Typography
                        variant="caption"
                        component={"span"}
                        className="bg-yellow-500 text-black rounded-full py-1 text-sm px-2 mr-3"
                      >
                        CHANNEL:
                      </Typography>
                      {userData.channelName}
                    </Typography>
                    <Typography
                      variant="overline"
                      className="text-zinc-300 mx-4 p-[.5px] my-1"
                      component={"span"}
                    >
                      <Typography
                        variant="caption"
                        component={"span"}
                        className="bg-yellow-500 text-black rounded-full py-1 text-sm px-2 mr-3"
                      >
                        UID:
                      </Typography>
                      {userData.userId}
                    </Typography>
                  </Typography>
                </Box>
                <Box marginLeft={"15px"}>
                  <Breadcrumbs
                    separator={<DoubleArrowIcon className="text-white" />}
                    aria-label="caption"
                    className="text-slate-400"
                  >
                    <Typography variant="caption" component={"h2"}>
                      @{userData.tagline}
                    </Typography>
                    <Typography variant="caption" component={"h2"}>
                      {userData.subscribers} subscribers
                    </Typography>
                    <Typography variant="caption" component={"h2"}>
                      {userData.videos} videos
                    </Typography>
                    <Typography variant="caption" component={"h2"}>
                      created on {getLocaleTime(userData.joinedat)}
                    </Typography>
                  </Breadcrumbs>
                </Box>
                <Box marginLeft={"5px"}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIosIcon />}
                    className="text-white rounded-full bg-slate-800 text-xs sm:text-base my-1"
                    onClick={handleShowInfoChange}
                  >
                    Know more about this channel
                  </Button>
                </Box>
              </Box>
            </div>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              width={"100%"}
              marginTop={"5px"}
            >
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                indicatorColor="secondary"
                aria-label="tabs"
                variant="scrollable"
                scrollButtons="auto"
                className="text-white"
              >
                <Tab value="home" label="Home" className="text-slate-400" />
                <Tab value="videos" label="Videos" className="text-slate-400" />
                <Tab
                  value="playlists"
                  label="Playlists"
                  className="text-slate-400"
                />
                <Tab
                  value="announcements"
                  label="Announcements"
                  className="text-slate-400"
                />
              </Tabs>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                gap={"4px"}
              >
                <LocationSearchingIcon className="text-white" />
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search"
                  required
                  className="text-white bg-transparent outline-none px-3 py-1 placeholder:text-slate-400 text-lg font-normal border-2 border-solid border-black border-b-slate-400 focus:border-b-fuchsia-500"
                />
              </Box>
            </Box>
            <Divider className="bg-slate-400 my-4 h-[.5px]" />
            <Box width={"100%"}>
              {currentTab === "home" && (
                <OtherHomeTab userId={userData.userId} />
              )}
              {currentTab === "videos" && (
                <OtherVideoTab userId={userData.userId} />
              )}
              {currentTab === "playlists" && (
                <OtherPlaylistTab userId={userData.userId} />
              )}
              {currentTab === "announcements" && (
                <OtherAnnouncementTab userId={userData.userId} />
              )}
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default OtherProfile;
