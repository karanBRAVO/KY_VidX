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
    linkto: "/you/profile/your-videos",
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

const Sidebar = ({ state, setState }) => {
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
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <Divider sx={{ color: "white", bgcolor: "gray" }} />
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;