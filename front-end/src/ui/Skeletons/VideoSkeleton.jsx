"use client";

import React from "react";
import { Skeleton, Typography } from "@mui/material";

const VideoSkeleton = ({ totalVideos = 10 }) => {
  const videos = Array.from({ length: totalVideos }, (_, index) => index + 1);

  return (
    <>
      <div className="w-full flex flex-row items-start justify-evenly flex-wrap">
        {videos.map((_, idx) => (
          <div
            key={idx}
            className="w-full sm:w-[80%] bg-black md:w-[40%] lg:w-[30%] border-[1px] p-1 rounded-md border-solid border-[#ffffff29] mt-5"
          >
            <Skeleton
              variant="rounded"
              animation="wave"
              width={350}
              height={150}
              className="bg-[#ffffff29] w-full max-w-full"
            />
            <div className="flex flex-row items-center justify-start gap-2 w-full-1 py-5">
              <Skeleton
                variant="circular"
                animation="wave"
                width={60}
                height={50}
                className="bg-[#ffffff29]"
              />
              <Typography variant="h4" component={"span"} className="w-full">
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="bg-[#ffffff29] w-full"
                />
              </Typography>
            </div>
            <div className="flex flex-col items-start">
              <Skeleton
                variant="text"
                animation="wave"
                className="bg-[#ffffff29] w-full"
              />
              <Skeleton
                variant="text"
                animation="wave"
                className="bg-[#ffffff29] w-full max-w-xs"
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <Typography variant="caption" component={"span"} className="w-10">
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="bg-[#ffffff29]"
                />
              </Typography>
              <Typography variant="caption" component={"span"} className="w-10">
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="bg-[#ffffff29]"
                />
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoSkeleton;
