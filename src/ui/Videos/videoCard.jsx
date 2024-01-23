import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Avatar,
  Box,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import Link from "next/link";

const VideoCard = ({
  uid,
  uploader,
  thumbnail,
  name,
  desc,
  duration,
  views,
  uploadTime,
}) => {
  const actions = [
    { icon: FileCopyIcon, name: "Copy Path" },
    { icon: SaveIcon, name: "Save" },
    { icon: DownloadIcon, name: "Print" },
    { icon: ShareIcon, name: "Share" },
  ];

  return (
    <>
      <Card className="w-full rounded-lg border-[0.51px] border-solid border-gray-800 text-white bg-black hover:shadow-md hover:shadow-gray-800 hover:rounded-sm hover:border-0 hover:scale-105 transition-all ease-linear duration-150">
        <Link href={`/player/${uid}`}>
          <CardActionArea>
            <Box
              component={"div"}
              position={"relative"}
              bgcolor={"black"}
              marginBottom={"1px"}
            >
              <CardMedia
                component="img"
                height="160"
                image={thumbnail}
                alt="thumnail"
                className="relative object-cover"
              />
              <Box
                component={"div"}
                bgcolor={"black"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                padding={"2px 4px"}
                borderRadius={"5px"}
                border={"2px solid gray"}
                width={"fit-content"}
                position={"absolute"}
                top={"5px"}
                left={"5px"}
              >
                <Typography className="text-white font-light text-xs">
                  {duration}
                </Typography>
              </Box>
            </Box>
          </CardActionArea>
        </Link>

        <CardContent className="bg-black flex flex-col items-start justify-between">
          <Box display={"flex"} flexDirection={"row"} alignItems={"start"}>
            <Avatar className="bg-amber-700">{uploader}</Avatar>
            <Typography
              gutterBottom
              variant="h6"
              component="h1"
              className="text-white mx-2 leading-tight tracking-tight"
            >
              {name}
            </Typography>
            <SpeedDial
              ariaLabel="SpeedDial"
              icon={<MoreVertIcon fontSize="medium" className="text-white" />}
              direction="down"
              className="absolute top-2 right-2"
              sx={{
                ".MuiSpeedDial-actions": {
                  bgcolor: "transparent",
                },
                ".MuiSpeedDial-actionsClosed": {
                  bgcolor: "transparent",
                },
                ".MuiSpeedDial-fab": {
                  bgcolor: "transparent",
                  width: "35px",
                  height: "auto",
                  ":hover": {
                    bgcolor: "#8080803b",
                  },
                },
              }}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={<action.icon className="text-white" />}
                  tooltipTitle={action.name}
                  className="bg-zinc-700 shadow-md shadow-slate-700"
                />
              ))}
            </SpeedDial>
          </Box>
          <Box component={"div"} className="my-3">
            <Typography
              variant="body2"
              color="text.secondary"
              className="text-slate-500 font-sans tracking-tight leading-tight px-2"
            >
              {desc}
            </Typography>
          </Box>
          <Box
            component={"div"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            marginTop={"6px"}
            padding={"1px 5px"}
          >
            <Box
              component={"div"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"5px"}
            >
              <VisibilityIcon color="white" fontSize="inherit" />
              <Typography
                component={"span"}
                variant="span"
                className="text-white text-xs"
              >
                {views}
              </Typography>
            </Box>
            <Box
              component={"div"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"5px"}
            >
              <AccessTimeFilledIcon color="white" fontSize="inherit" />
              <Typography
                component={"span"}
                variant="span"
                className="text-white text-xs"
              >
                {uploadTime + ` ` + "ago"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default VideoCard;
