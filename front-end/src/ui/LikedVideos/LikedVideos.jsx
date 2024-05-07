"use client";

import { Container, Typography } from "@mui/material";
import CommonVideoBox from "../CommonVideoBox";
import { useSession } from "next-auth/react";
import { NotAuthenticated, VideoSkeleton, Wait } from "@/ui/ComponentExporter";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";
import { getFormatedTime, getLocaleTime } from "@/lib/utils/DateConvertor";

const LikedVideos = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  // states
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLikedVideos();
  }, []);

  // get all liked videos
  const getLikedVideos = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`/api/user/get-all-videos/liked`);
      if (res.data.success) {
        setLikedVideos((prev) => res.data.videos);
      } else {
        dispatch(_showNotifier({ msg: `No liked videos` }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        className="min-h-screen mt-[130px] rounded-md"
        maxWidth={false}
      >
        {status === "loading" ? (
          <>
            <div className="w-full flex items-center justify-center">
              <Wait />
            </div>
          </>
        ) : status === "authenticated" ? (
          <div className="flex flex-col md:flex-row w-full h-screen">
            <h1 className="text-white tracking-tight leading-none font-black md:hidden my-2">
              Liked Videos
            </h1>
            <div className="md:w-[30%] hidden md:flex flex-col rounded-lg bg-gradient-to-b from-slate-800 via-slate-600 to-slate-200">
              <div className="w-full p-3">
                <Image
                  src="/liked.png"
                  alt="image"
                  width={190}
                  height={150}
                  draggable={false}
                  className="w-full h-[250px] rounded-lg shadow-md shadow-slate-400"
                />
              </div>
              <h1 className="font-bold text-white text-center m-2">
                Liked Videos
              </h1>
              <button className="rounded-full bg-white text-black m-3 p-4 cursor-pointer text-xl tracking-tight leading-none">
                Play All
              </button>
            </div>
            <div className={"md:w-[70%] text-white p-2 overflow-auto"}>
              <div className="w-full gap-3 flex flex-col items-start">
                {loading ? (
                  <>
                    <VideoSkeleton />
                  </>
                ) : likedVideos.length === 0 ? (
                  <>
                    <Typography variant="subtitle1" className="text-blue-500">
                      No video found
                    </Typography>
                  </>
                ) : (
                  likedVideos.map((item, index) => (
                    <CommonVideoBox
                      key={index}
                      userId={item.userId}
                      videoId={item.videoId}
                      uploader={item.uploader}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      desc={item.desc}
                      duration={getFormatedTime(item.duration)}
                      views={item.views}
                      dateTime={getLocaleTime(item.dateTime)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-center">
              <NotAuthenticated />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default LikedVideos;
