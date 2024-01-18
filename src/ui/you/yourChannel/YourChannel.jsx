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
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InfoIcon from "@mui/icons-material/Info";
import PlaceIcon from "@mui/icons-material/Place";
import { useSession } from "next-auth/react";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter.js";

import Info from "./Info";

import { useState } from "react";

const YourChannel = () => {
  const { data: session, status } = useSession();

  const [showInfo, setShowInfo] = useState(false);
  const [currentTab, setCurrentTab] = useState("one");

  const contents = [
    { desc: "www.vidx.com/@K.Y_KaranYadav98", icon: LanguageIcon },
    { desc: "25 subscribers", icon: PeopleOutlineIcon },
    { desc: "14 videos", icon: SlideshowIcon },
    { desc: "1k+ views", icon: TrendingUpIcon },
    { desc: "joined on Jan, 01-2024", icon: InfoIcon },
    { desc: "India", icon: PlaceIcon },
  ];

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
          <Box>
            <Info
              open={showInfo}
              handleClose={handleShowInfoChange}
              contents={contents}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              color={"white"}
            >
              <Box width={"100%"} height={"250px"} marginY={"10px"}>
                <img
                  src={`/defaultThumbnail.jpg`}
                  alt="banner"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-xl cursor-pointer border-2 border-solid border-black shadow-sm shadow-slate-900"
                />
              </Box>
              <div className="flex flex-col md:flex-row items-center gap-5">
                <Box>
                  <Avatar
                    alt="Avatar"
                    src="/defaultThumbnail.jpg"
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
                      className="capitalize font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tight"
                    >
                      Karan Yadav
                    </Typography>
                  </Box>
                  <Box marginLeft={"15px"}>
                    <Breadcrumbs
                      separator={<DoubleArrowIcon className="text-white" />}
                      aria-label="caption"
                      className="text-slate-400"
                    >
                      <Typography variant="caption" component={"h2"}>
                        @K.Y_KaranYadav98
                      </Typography>
                      <Typography variant="caption" component={"h2"}>
                        25 subscribers
                      </Typography>
                      <Typography variant="caption" component={"h2"}>
                        14 videos
                      </Typography>
                      <Typography variant="caption" component={"h2"}>
                        1K+ views
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
                  <Tab value="one" label="Home" className="text-slate-400" />
                  <Tab value="two" label="Videos" className="text-slate-400" />
                  <Tab
                    value="three"
                    label="Playlists"
                    className="text-slate-400"
                  />
                  <Tab
                    value="four"
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
            <Box></Box>
          </Box>
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
