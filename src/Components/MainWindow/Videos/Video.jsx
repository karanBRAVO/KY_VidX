import VideoCard from "./videoCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DEFAULT_THUMBNAIL } from "../../../assets/AssetExporter.js";

const Video = () => {
  const videos = [
    {
      uploader: "KY",
      thumbnail: DEFAULT_THUMBNAIL,
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "RS",
      thumbnail: DEFAULT_THUMBNAIL,
      name: "test name2",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1M+",
      uploadTime: "3 years",
    },
    {
      uploader: "KY",
      thumbnail: DEFAULT_THUMBNAIL,
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "RS",
      thumbnail: DEFAULT_THUMBNAIL,
      name: "test name2",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1M+",
      uploadTime: "3 years",
    },
    {
      uploader: "KY",
      thumbnail: DEFAULT_THUMBNAIL,
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "RS",
      thumbnail: DEFAULT_THUMBNAIL,
      name: "test name2",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1M+",
      uploadTime: "3 years",
    },
    {
      uploader: "KY",
      thumbnail: DEFAULT_THUMBNAIL,
      name: "This is test name1",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1k",
      uploadTime: "2 hours",
    },
    {
      uploader: "RS",
      thumbnail: DEFAULT_THUMBNAIL,
      name: "test name2",
      desc: "This is the description of the video with random text. This will be shown below the name",
      duration: "10:30:37",
      views: "1M+",
      uploadTime: "3 years",
    },
  ];

  return (
    <>
      <Container disableGutters={false} maxWidth={false} className="bg-black">
        <Box component={"div"}>
          {videos.map((item, index) => (
            <Box component={"div"} key={index}>
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
