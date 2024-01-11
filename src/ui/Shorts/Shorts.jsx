"use client";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import ShortsCard from "./ShortsCard";
import { useInView } from "react-intersection-observer";

import { SHORTS } from "./fakeData";
import Loader from "./Loader";

const Shorts = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const [shorts, setShorts] = useState([]);

  const limitPerRequest = 9;

  const wait = (delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay * 1000);
    });
  };

  const fetchData = async () => {
    await wait(3);
    setShorts((prev) => [...prev, ...SHORTS]);
  };

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  return (
    <>
      <Container
        disableGutters={false}
        maxWidth={"md"}
        className="bg-black h-screen overflow-y-auto"
      >
        <Box
          component={"div"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          paddingTop={"120px"}
          paddingBottom={"20px"}
        >
          {shorts &&
            shorts.map((item, index) => (
              <motion.div
                drag="y"
                dragConstraints={{ top: -0, bottom: 0 }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: (index % limitPerRequest) * 0.5,
                }}
                viewport={{ once: true }}
                key={index}
                className="w-full h-auto mt-[14px] bg-black"
              >
                <ShortsCard
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
          <div
            className="w-full flex items-center justify-center m-5"
            ref={ref}
          >
            <Loader />
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Shorts;
