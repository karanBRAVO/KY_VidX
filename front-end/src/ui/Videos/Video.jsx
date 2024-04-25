"use client";

import VideoCard from "./videoCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VideoSkeleton } from "../ComponentExporter";

import { VIDEOS } from "./fakeData.js";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const limitPerRequest = 9;

  const wait = (delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay * 1000);
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    await wait(3);
    setVideos((prev) => [...prev, ...VIDEOS]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container
        disableGutters={false}
        maxWidth={false}
        className="bg-black scroll-smooth"
      >
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
          {videos &&
            videos.map((item, index) => (
              <motion.div
                drag="x"
                dragConstraints={{ left: -0, right: 0 }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: (index % limitPerRequest) * 0.5,
                }}
                viewport={{ once: true }}
                key={index}
                className="w-full sm:w-[80%] bg-black md:w-[40%] lg:w-[30%] mt-5"
              >
                <VideoCard
                  uid={index + 1}
                  uploader={item.uploader}
                  thumbnail={item.thumbnail}
                  name={item.name}
                  desc={item.desc}
                  duration={item.duration}
                  views={item.views}
                  uploadTime={item.uploadTime}
                />
              </motion.div>
            ))}
        </Box>
        <Box
          component={"div"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          {isLoading && <VideoSkeleton />}
          <Button
            variant="outlined"
            disabled={isLoading}
            className="text-white border-2 border-solid border-white m-5 disabled:cursor-not-allowed disabled:text-slate-800 disabled:border-slate-800"
            onClick={() => fetchData()}
          >
            {isLoading ? <>Loading ...</> : <>Load More</>}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Video;
