import React from "react";
import { Typography } from "@mui/material";
import Link from "next/link";

const PlaylistCard = ({ name, imgSrc, desc }) => {
  return (
    <>
      <Link href={`/you/profile/watch-later/${name}`}>
        <div className="border-[1px] border-solid border-[#3f3c3c] bg-[#3f3c3c] w-full max-w-sm rounded-md p-1 mt-5 flex flex-col gap-3 my-4">
          <img
            src={imgSrc ? imgSrc : "/watch-later.png"}
            alt={name}
            width={250}
            height={150}
            draggable={false}
            className="w-full max-w-sm h-[200px] rounded-md bg-white"
          />
          <Typography
            variant="h5"
            component={"span"}
            className="text-white font-serif font-bold capitalize"
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            component={"span"}
            className="text-slate-300 font-sans font-light"
          >
            {desc}
          </Typography>
        </div>
      </Link>
    </>
  );
};

export default PlaylistCard;
