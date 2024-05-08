"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import MenuIcon from "@mui/icons-material/Menu";
import HouseIcon from "@mui/icons-material/House";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PortraitIcon from "@mui/icons-material/Portrait";
import HistoryIcon from "@mui/icons-material/History";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const mainItems = [
  { name: "Home", iconname: HouseIcon, linkto: "/" },
  { name: "Shorts", iconname: BurstModeIcon, linkto: "/Main/shorts" },
  {
    name: "Subscriptions",
    iconname: SubscriptionsIcon,
    linkto: "/Main/subscriptions",
  },
];

const personalItems = [
  {
    name: "Your Channel",
    iconname: PortraitIcon,
    linkto: "/you/profile/your-channel",
  },
  { name: "History", iconname: HistoryIcon, linkto: "/you/profile/history" },
  {
    name: "Your Videos",
    iconname: VideoCameraFrontIcon,
    linkto: "/you/studio",
  },
  {
    name: "Watch Later",
    iconname: WatchLaterIcon,
    linkto: "/you/profile/watch-later",
  },
  {
    name: "Liked Videos",
    iconname: ThumbUpIcon,
    linkto: "/you/profile/liked-videos",
  },
];

const myItems = [
  { name: "About me", linkto: "/about" },
  { name: "Privacy policy", linkto: "/privacy-policy" },
  { name: "terms and conditions", linkto: "/terms-and-conditions" },
];

const Sidebar = ({ state, setState }) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Drawer
        anchor="left"
        open={state}
        onClose={() => setState((prev) => !prev)}
        variant="temporary"
        component={"div"}
        hideBackdrop={false}
        elevation={16}
        ModalProps={{
          sx: {
            backgroundColor: "transparent",
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "white",
            borderRight: "1px solid gray",
          },
        }}
      >
        <List>
          <Box
            component={"li"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            padding={"0 5px"}
            marginBottom={"7px"}
          >
            <IconButton
              sx={{
                color: "white",
                ":hover": {
                  backgroundColor: "#bdbdbd40",
                },
                marginLeft: "1px",
              }}
              onClick={() => setState((prev) => !prev)}
            >
              <MenuIcon />
            </IconButton>
            <Link
              href={"/"}
              className="flex flex-row items-center justify-between"
            >
              <Image
                src="/Logo.png"
                alt="logo"
                width={100}
                height={100}
                style={{
                  width: "2.75rem",
                  height: "auto",
                  borderRadius: ".125rem",
                  marginLeft: "17px",
                  marginRight: "5px",
                  flexShrink: "0",
                }}
              />
              <Typography
                variant="h4"
                component={"h1"}
                noWrap
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  color: "white",
                  lineHeight: "1.25",
                  letterSpacing: "1.25rem",
                }}
              >
                <Typography
                  variant="h5"
                  component={"span"}
                  sx={{
                    fontWeight: "100",
                  }}
                >
                  vid
                </Typography>
                <Typography
                  variant="h3"
                  component={"span"}
                  sx={{
                    fontWeight: "900",
                    textTransform: "uppercase",
                  }}
                >
                  X
                </Typography>
              </Typography>
            </Link>
          </Box>
          <Divider sx={{ color: "white", bgcolor: "gray" }} />
          <Typography
            variant="h6"
            component={"h2"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ color: "white", padding: "4px", margin: "3px 0px" }}
          >
            Main
          </Typography>
          <Divider sx={{ color: "white", bgcolor: "gray" }} />
          {mainItems.map((item, index) => (
            <Link href={item.linkto} key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    color: "white",
                    ":hover": {
                      backgroundColor: "#bdbdbd40",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    <item.iconname />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {item.name.toLowerCase() === "subscriptions" &&
                    status !== "authenticated" && (
                      <sub>
                        <LockPersonIcon
                          fontSize="small"
                          className="text-xs font-black text-gray-300 ml-[3px]"
                        />
                      </sub>
                    )}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <Divider sx={{ color: "white", bgcolor: "gray" }} />
          <Typography
            variant="h6"
            component={"h2"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ color: "white", padding: "4px", margin: "3px 0px" }}
          >
            You
          </Typography>
          <Divider sx={{ color: "white", bgcolor: "gray" }} />
          {personalItems.map((item, index) => (
            <Link href={item.linkto} key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    color: "white",
                    ":hover": {
                      backgroundColor: "#bdbdbd40",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    <item.iconname />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {status !== "authenticated" && (
                    <sub>
                      <LockPersonIcon
                        fontSize="small"
                        className="text-xs font-black text-gray-300 ml-[3px]"
                      />
                    </sub>
                  )}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <Divider sx={{ color: "white", bgcolor: "gray" }} />
        </List>
        <Box
          padding={"3px"}
          margin={"1px"}
          gap={"1px"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box>
            {myItems.map((item, index) => (
              <Link key={index} href={item.linkto}>
                <Typography
                  className="capitalize cursor-pointer text-white hover:underline"
                  variant="caption"
                  component={"blockquote"}
                >
                  {item.name}
                </Typography>
              </Link>
            ))}
          </Box>
          <Typography
            className="text-white my-3"
            variant="caption"
            component={"blockquote"}
          >
            &copy; Karan Yadav 2024
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
