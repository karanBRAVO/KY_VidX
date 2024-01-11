"use client";

import VideoCard from "./videoCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Video = () => {
  const videos = [
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "KY",
      thumbnail: "defaultThumbnail.jpg",
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
  ];

  return (
    <>
      <Container disableGutters={false} maxWidth={false} className="bg-black">
        <Box
          component={"div"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"start"}
          justifyContent={"space-evenly"}
          flexWrap={"wrap"}
          gap={"13px"}
          paddingTop={"130px"}
          paddingBottom={"20px"}
        >
          {videos.map((item, index) => (
            <Box
              component={"div"}
              key={index}
              className="w-full sm:w-[80%] bg-black md:w-[40%] lg:w-[30%] mt-5"
            >
              <VideoCard
                uploader={item.uploader}
                thumbnail={item.thumbnail}
                name={item.name}
                desc={item.desc}
                duration={item.duration}
                views={item.views}
                uploadTime={item.uploadTime}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Video;
