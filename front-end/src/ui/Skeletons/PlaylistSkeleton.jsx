"use client";

import React from "react";
import { Skeleton, Typography } from "@mui/material";

const PlaylistSkeleton = ({ totalPlaylists = 10 }) => {
  return (
    <>
      <div className="w-full flex flex-row flex-wrap items-center justify-evenly gap-3 text-white p-1">
        {new Array(totalPlaylists).fill(null).map((_, idx) => (
          <div
            key={idx}
            className="border-[1px] border-solid border-[#3f3c3c] w-full max-w-sm rounded-md p-1 mt-5"
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="bg-[#3f3c3cc7] w-full h-[30px] mb-1"
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="bg-[#3f3c3cc7] w-full max-w-sm h-[160px]"
            />
            <Typography variant="h2">
              <Skeleton
                variant="text"
                animation={"wave"}
                className="text-3xl w-[60%] bg-[#3f3c3cc7]"
              />
            </Typography>
            <Typography variant="h4">
              <Skeleton
                variant="text"
                animation={"wave"}
                className="text-base w-full bg-[#3f3c3cc7]"
              />
            </Typography>
            <Typography variant="h4">
              <Skeleton
                variant="text"
                animation={"wave"}
                className="text-base w-[80%] bg-[#3f3c3cc7]"
              />
            </Typography>
            <Typography variant="h4">
              <Skeleton
                variant="text"
                animation={"wave"}
                className="text-base w-[70%] bg-[#3f3c3cc7]"
              />
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlaylistSkeleton;
