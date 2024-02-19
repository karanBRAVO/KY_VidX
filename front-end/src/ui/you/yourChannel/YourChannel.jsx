"use client";

import {
  Container,
  Box,
  Tabs,
  Tab,
  Avatar,
  Typography,
  Button,
  Breadcrumbs,
  Divider,
  CircularProgress,
} from "@mui/material";

// icons
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Info from "./Info";

import { useSession } from "next-auth/react";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter.js";
import { useEffect, useState } from "react";
import VideoTab from "./VideoTab";
import AnnouncementTab from "./AnnouncementTab";
import axios from "axios";
import { getLocaleTime } from "@/lib/utils/DateConvertor";

const YourChannel = () => {
  const { data: session, status } = useSession();

  const [showInfo, setShowInfo] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");

  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState({});

  const getChannelData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.get(`/api/user/channel/channel-details`);
      if (res.data.success) {
        setContents(res.data.details);
      } else {
        console.log(res.data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannelData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleShowInfoChange = () => {
    setShowInfo((prev) => !prev);
  };

  return (
    <>
      <Container className="min-h-screen mt-[130px]" maxWidth={false}>
        {status === "loading" ? (
          <>
            <div className="w-full flex items-center justify-center">
              <Wait />
            </div>
          </>
        ) : status === "authenticated" ? (
          loading ? (
            <div className="w-full h-full p-3 my-5 flex items-center justify-center">
              <CircularProgress className="text-yellow-600" />
            </div>
          ) : (
            <Box>
              <Info
                open={showInfo}
                handleClose={handleShowInfoChange}
                contact={contents.userEmail}
                views={contents.views}
                subscribers={contents.subscribers}
                videosCount={contents.videos}
                joinedOn={getLocaleTime(contents.createdAt)}
                location={contents.location}
              />
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                color={"white"}
              >
                <Box width={"100%"} height={"250px"} marginY={"10px"}>
                  <img
                    src={
                      contents.bgImg ? contents.bgImg : `/defaultThumbnail.jpg`
                    }
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
                      src={
                        contents.userImage
                          ? contents.userImage
                          : session?.user?.image
                      }
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
                        {contents.userName
                          ? contents.userName
                          : session?.user?.name}
                        <Typography
                          variant="subtitle1"
                          className="text-zinc-300 mx-4 p-[.5px]"
                          component={"span"}
                        >
                          CHANNEL:{" "}
                          {contents.channelName && contents.channelName}
                        </Typography>
                        <Typography
                          variant="overline"
                          className="text-zinc-300 mx-4 p-[.5px]"
                          component={"span"}
                        >
                          UID: {contents.userId && contents.userId}
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
                          @{contents.tagline && contents.tagline}
                        </Typography>
                        <Typography variant="caption" component={"h2"}>
                          {contents.subscribers && contents.subscribers}{" "}
                          subscribers
                        </Typography>
                        <Typography variant="caption" component={"h2"}>
                          {contents.videos && contents.videos} videos
                        </Typography>
                        <Typography variant="caption" component={"h2"}>
                          created on{" "}
                          {contents.joinedat &&
                            getLocaleTime(contents.joinedat)}
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
                    <Tab
                      value="videos"
                      label="Videos"
                      className="text-slate-400"
                    />
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
              </Box>
              <Divider className="bg-slate-400 my-4" />
              <Box>
                {currentTab === "videos" && <VideoTab />}
                {currentTab === "announcements" && <AnnouncementTab />}
              </Box>
            </Box>
          )
        ) : (
          <>
            <div className="w-full flex items-center justify-center">
              <NotAuthenticated />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default YourChannel;
