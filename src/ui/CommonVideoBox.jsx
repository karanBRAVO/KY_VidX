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

const CommonVideoBox = ({
  uploader,
  thumbnail,
  name,
  desc,
  duration,
  views,
  lastWatchTime,
}) => {
  return (
    <>
      <Card className="w-full m-2 bg-black text-white flex flex-col sm:flex-row">
        <CardActionArea className="w-fit">
          <Box component={"div"} bgcolor={"black"} width={"fit-content"}>
            <CardMedia
              component="img"
              height="250"
              image={thumbnail}
              alt="thumnail"
              className="w-full sm:w-[400px] h-[200px] object-cover rounded-lg bg-black border-[0.51px] border-solid border-gray-800"
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

        <CardContent className="bg-black flex flex-col items-start justify-between">
          <Box>
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
            </Box>
            <Box component={"div"} className="my-3 mx-2">
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-slate-500 font-sans tracking-tight leading-tight px-2"
              >
                {desc}
              </Typography>
            </Box>
          </Box>
          <Box
            component={"div"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
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
              marginX={"5px"}
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
              marginX={"5px"}
            >
              <AccessTimeFilledIcon color="white" fontSize="inherit" />
              <Typography
                component={"span"}
                variant="span"
                className="text-white text-xs"
              >
                {lastWatchTime + ` ` + "ago"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CommonVideoBox;
