"use client";

import CommonVideoBox from "@/ui/CommonVideoBox.jsx";
import { _YOUR_VIDEOS_ } from "./fakeData.js";

const VideoTab = () => {
  return (
    <>
      <div className="w-full gap-3 flex flex-col items-start">
        {_YOUR_VIDEOS_.map((item, index) => (
          <CommonVideoBox
            key={index}
            uid={index + 1}
            uploader={item.uploader}
            thumbnail={`/${item.thumbnail}`}
            name={item.name}
            desc={item.desc}
            duration={item.duration}
            views={item.views}
            lastWatchTime={item.uploadTime}
          />
        ))}
      </div>
    </>
  );
};

export default VideoTab;
