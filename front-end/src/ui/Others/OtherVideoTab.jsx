"use client";

import React, { useEffect, useState } from "react";
import CommonVideoBox from "@/ui/CommonVideoBox.jsx";
import axios from "axios";
import { getFormatedTime, getLocaleTime } from "@/lib/utils/DateConvertor.js";
import { CircularProgress } from "@mui/material";

const OtherVideoTab = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  // get videos
  const getVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/user/others/get-videos?userId=${userId}`
      );
      if (res.data.success) {
        setVideos((prev) => [...res.data.videos]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full gap-3 flex flex-col items-start min-h-screen">
        {loading ? (
          <div className="w-full flex items-center justify-center my-2 p-2 text-white animate-bounce">
            <CircularProgress className="text-white" />
          </div>
        ) : videos.length == 0 ? (
          <div className="w-full flex items-center my-2 p-2 text-white animate-bounce">
            No Videos uploaded yet
          </div>
        ) : (
          videos.map((item, index) => (
            <CommonVideoBox
              key={index}
              userId={item.userId}
              videoId={item.videoId}
              uploader={item.userImg}
              thumbnail={item.thumbnail}
              title={item.title}
              desc={item.desc}
              visibility={item.visibility}
              duration={getFormatedTime(item.duration)}
              views={item.views}
              dateTime={getLocaleTime(item.uploadDate)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default OtherVideoTab;
