import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ShareIcon from "@mui/icons-material/Share";

const ShortsCard = ({
  uploader,
  thumbnail,
  name,
  desc,
  duration,
  views,
  uploadTime,
}) => {
  return (
    <>
      <Card className="w-full rounded-none border-[0.51px] border-solid border-gray-800 text-white bg-black">
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
              image={`/${thumbnail}`}
              alt="thumnail"
              className="relative object-cover h-[53vh] sm:h-[55vh] lg:h-[59vh]"
            />
            <Box
              component={"div"}
              bgcolor={"black"}
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
              className="hidden sm:flex"
            >
              <Typography className="text-white font-light text-xs">
                {duration + ` ` + `sec`}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>

        <CardContent className="bg-black flex flex-col items-start justify-between">
          <Box display={"flex"} flexDirection={"row"} alignItems={"start"}>
            <Avatar className="bg-amber-700 w-5 h-5 text-white text-xs sm:w-11 sm:h-11 sm:text-xl">
              {uploader}
            </Avatar>
            <Typography
              gutterBottom
              variant="h6"
              component="h1"
              className="text-white mx-2 leading-tight tracking-tight text-base"
            >
              {name}
            </Typography>
          </Box>
          <Box component={"div"} className="my-3">
            <Typography
              variant="body2"
              color="text.secondary"
              className="text-slate-500 font-sans tracking-tight leading-tight px-2 text-sm"
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
              <ShareIcon color="white" fontSize="inherit" />
              <Typography
                component={"span"}
                variant="span"
                className="text-white text-xs cursor-pointer hover:underline"
              >
                Share
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

export default ShortsCard;
