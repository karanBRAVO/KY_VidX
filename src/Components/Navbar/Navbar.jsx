import { LOGO } from "../../assets/AssetExporter.js";
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

const Navbar = () => {
  return (
    <>
      <AppBar
        position="fixed"
        component={"nav"}
        enableColorOnDark
        className="bg-black px-2 md:py-3 py-2 text-white"
      >
        <Stack
          direction={"row"}
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
              <IconButton className="text-white hover:bg-gray-800">
                <MenuIcon />
              </IconButton>
              <Box
                component={"div"}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <img
                  src={LOGO}
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-11 h-auto rounded-full cursor-pointer"
                />
                <Typography
                  variant="h4"
                  component={"h1"}
                  noWrap
                  className="text-white"
                >
                  vidX
                </Typography>
              </Box>
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
              <Tooltip title={"Search with Voice"}>
                <IconButton className="text-white hover:bg-gray-800">
                  <KeyboardVoiceIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Create"}>
                <IconButton className="text-white hover:bg-gray-800">
                  <VideoCallIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Notifications"}>
                <IconButton className="text-white hover:bg-gray-800">
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
      </AppBar>
    </>
  );
};

export default Navbar;
