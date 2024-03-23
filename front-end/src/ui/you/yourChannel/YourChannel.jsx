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
import FiberNewIcon from "@mui/icons-material/FiberNew";
import EditNoteIcon from "@mui/icons-material/EditNote";

import Info from "./Info";

import { useSession } from "next-auth/react";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter.js";
import { useEffect, useRef, useState } from "react";
import VideoTab from "./VideoTab";
import AnnouncementTab from "./AnnouncementTab";
import axios from "axios";
import { getLocaleTime } from "@/lib/utils/DateConvertor";
import Link from "next/link";
import { uploadUserImagesToFirebaseStorage } from "@/lib/_firebase/firebase.storage";
import HomeTab from "./HomeTab";

const YourChannel = () => {
  const { data: session, status } = useSession();

  const [showInfo, setShowInfo] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");

  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState(undefined);

  const newBannerInputRef = useRef(null);
  const [bannerImg, setBannerImg] = useState(undefined);
  const [uploadingStatus, setUploadingStatus] = useState(false);

  const getChannelData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.get(`/api/user/channel/channel-details`);
      if (res.data.success) {
        setContents(res.data.details);
      } else {
        console.log(res.data.error);
        setContents(undefined);
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

  // upload to firebase
  const uploadToFirebase = async () => {
    if (!bannerImg || uploadingStatus) return;

    setUploadingStatus(true);
    try {
      const user = await axios.get(`/api/user/get-user-details/get-user-id`);

      if (!user.data.success) throw new Error(user.data.error);
      const userID = user.data.uid;

      const res = await uploadUserImagesToFirebaseStorage(
        userID,
        "channel",
        bannerImg
      );

      if (res[0]) {
        const response = await axios.post(
          `/api/user/channel/update-channel/banner`,
          { bgImgUrl: res[1] }
        );
        if (response.data.success) {
          setBannerImg(undefined);
          contents.bgImg = res[1];
        } else {
          console.error(response.data.error);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploadingStatus(false);
    }
  };

  // cancel selection
  const cancelBannerSelection = () => {
    setBannerImg(undefined);
  };

  // choose new banner
  const chooseNewBanner = (e) => {
    setBannerImg(e.target.files[0]);
  };

  // open image explorer
  const openImageExplorer = () => {
    if (newBannerInputRef.current) {
      newBannerInputRef.current.click();
    }
  };

  return (
    <>
      <Container
        className="min-h-screen mt-[130px] text-white"
        maxWidth={false}
      >
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
          ) : contents && Object.keys(contents).length != 0 ? (
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
                  <input
                    name="bannerimg"
                    id="bannerImg"
                    type="file"
                    multiple={false}
                    accept="image/*"
                    className="hidden"
                    ref={newBannerInputRef}
                    onChange={chooseNewBanner}
                  />
                  <img
                    src={
                      bannerImg
                        ? URL.createObjectURL(bannerImg)
                        : contents.bgImg
                        ? contents.bgImg
                        : `/defaultThumbnail.jpg`
                    }
                    alt="banner"
                    width={100}
                    height={100}
                    className="w-full h-full rounded-xl cursor-pointer border-2 border-solid border-black shadow-sm shadow-slate-900"
                    onClick={openImageExplorer}
                  />
                </Box>
                {bannerImg && (
                  <Box
                    display="flex"
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    gap={"5px"}
                    marginY={"3px"}
                    width={"100%"}
                  >
                    <Button
                      variant="outlined"
                      className="text-white border-white mx-3"
                      onClick={cancelBannerSelection}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-white text-black mx-3 border-white"
                      onClick={uploadToFirebase}
                      disabled={uploadingStatus}
                    >
                      {uploadingStatus ? <>Uploading...</> : <>Upload</>}
                    </Button>
                  </Box>
                )}
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
                          {contents.channelName && contents.channelName}
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
                          {contents.userId && contents.userId}
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
                {currentTab === "home" && <HomeTab />}
                {currentTab === "videos" && <VideoTab />}
                {currentTab === "announcements" && <AnnouncementTab />}
              </Box>
            </Box>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              width={"100%"}
              padding={"9xl"}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"3px"}
              >
                <Typography
                  variant="h5"
                  component={"span"}
                  className="text-white font-semibold"
                >
                  Create
                </Typography>
                <FiberNewIcon className="text-white text-9xl font-black" />
                <Typography
                  variant="h5"
                  component={"span"}
                  className="text-white font-semibold"
                >
                  Channel
                </Typography>
              </Box>
              <Link href={"/you/create-channel"}>
                <Button
                  variant="contained"
                  className="font-bold capitalize my-6"
                  startIcon={<EditNoteIcon className="text-3xl" />}
                >
                  Create Now
                </Button>
              </Link>
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
