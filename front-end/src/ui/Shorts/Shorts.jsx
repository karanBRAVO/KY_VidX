"use client";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ShortsCard from "./ShortsCard";
import { useInView } from "react-intersection-observer";

import { SHORTS } from "./fakeData";
import Loader from "./Loader";

const Shorts = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const [shorts, setShorts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const wait = (delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay * 1000);
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    await wait(3);
    setShorts((prev) => [...prev, ...SHORTS]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && !isLoading) {
      fetchData();
    }
  }, [inView]);

  return (
    <>
      <Container
        disableGutters={false}
        maxWidth={"md"}
        className="bg-black h-[80vh] mt-[135px] overflow-y-auto scroll-smooth snap-y snap-mandatory"
      >
        <Box
          component={"div"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {shorts &&
            shorts.map((item, index) => (
              <div key={index} className="w-full h-auto mt-10 bg-black">
                <ShortsCard
                  uploader={item.uploader}
                  thumbnail={item.thumbnail}
                  name={item.name}
                  desc={item.desc}
                  duration={item.duration}
                  views={item.views}
                  uploadTime={item.uploadTime}
                />
              </div>
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
