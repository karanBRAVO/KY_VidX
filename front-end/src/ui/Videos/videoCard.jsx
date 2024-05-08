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
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";
import { SaveVideoToPlaylist } from "@/ui/ComponentExporter";

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";

const VideoCard = ({
  userId,
  videoId,
  channelName,
  uploader,
  thumbnail,
  name,
  desc,
  duration,
  views,
  uploadTime,
}) => {
  if (!userId || !videoId) return <></>;

  const dispatch = useDispatch();

  const actions = [
    {
      icon: FileCopyIcon,
      name: "Copy Path",
      clickHandler: () => {
        handlePathCopy();
      },
    },
    {
      icon: SaveIcon,
      name: "Save",
      clickHandler: () => {
        handleVideoSave();
      },
    },
    {
      icon: DownloadIcon,
      name: "Download",
      clickHandler: () => {
        handleDownload();
      },
    },
    { icon: ShareIcon, name: "Share", clickHandler: () => {} },
  ];

  // handle path copy
  const handlePathCopy = async () => {
    const path = `${process.env.NEXT_PUBLIC_VIDEO_SERVER_URL}/${videoId}/hls/master.m3u8`;
    await navigator.clipboard.writeText(path);
    dispatch(
      _showNotifier({
        msg: `Stream Video path copied | Use HLS supported video player`,
      })
    );
  };

  const [videoSaveComponentState, setVideoSaveComponentState] = useState(false);

  // handle video save opens dialog modal
  const handleVideoSave = async () => {
    setVideoSaveComponentState(true);
  };

  // handle download
  const handleDownload = async () => {};

  return (
    <>
      <SaveVideoToPlaylist
        category={"watch-later"}
        open={videoSaveComponentState}
        setOpen={setVideoSaveComponentState}
        videoId={videoId}
      />

      <Card className="w-full rounded-lg border-[0.51px] border-solid border-gray-800 text-white bg-black hover:shadow-md hover:shadow-gray-800 hover:rounded-sm hover:border-0 hover:scale-105 transition-all ease-linear duration-150">
        <Link href={`/player/${userId}/${videoId}`}>
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
            <Link href={`/other/${userId}`} title={channelName}>
              <Avatar className="bg-amber-700" src={uploader} />
            </Link>
            <Typography
              gutterBottom
              variant="h6"
              component="h1"
              className="text-white mx-2 leading-tight tracking-tight capitalize"
            >
              {name}
            </Typography>
            <SpeedDial
              ariaLabel="SpeedDial"
              icon={
                <div className="bg-black rounded-full p-2 flex items-center justify-center">
                  <MoreVertIcon fontSize="small" className="text-black" />
                </div>
              }
              direction="down"
              className="absolute top-[5px] right-[5px]"
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
                    bgcolor: "#0000008a",
                  },
                },
              }}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={<action.icon className="text-white" />}
                  tooltipTitle={action.name}
                  onClick={action.clickHandler}
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
                {uploadTime}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default VideoCard;
