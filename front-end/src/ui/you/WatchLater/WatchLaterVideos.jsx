"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { NotAuthenticated, VideoSkeleton, Wait } from "@/ui/ComponentExporter";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getFormatedTime, getLocaleTime } from "@/lib/utils/DateConvertor";
import CommonVideoBox from "@/ui/CommonVideoBox";

// icons
import ListIcon from "@mui/icons-material/List";

const WatchLaterVideos = ({ playlist }) => {
  if (!playlist) return <></>;

  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAllVideosInPlaylist();
  }, []);

  // get all the videos in the playlist
  const getAllVideosInPlaylist = async () => {
    if (!playlist) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `/api/user/get-all-videos/watch-later?playlist=${playlist}`
      );
      console.log(res.data);
      if (res.data.success) {
        setVideos((prev) => res.data.videos);
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="min-h-screen mt-[130px]" maxWidth={false}>
        {status === "loading" ? (
          <>
            <div className="w-full flex items-center justify-center">
              <Wait />
            </div>
          </>
        ) : status === "authenticated" ? (
          <Box>
            <div className="flex flex-row items-start gap-2">
              <sup>
                <ListIcon fontSize="small" className="text-white font-black" />
              </sup>
              <Typography
                variant="h4"
                component={"h1"}
                className="font-black text-white capitalize m-1 tracking-tight leading-1"
              >
                {playlist}
              </Typography>
            </div>
            {loading ? (
              <div>
                <VideoSkeleton totalVideos={10} />
              </div>
            ) : (
              <div>
                {videos.length === 0 ? (
                  <div className="w-full flex items-center justify-center flex-row mt-6">
                    <Typography
                      variant="h5"
                      component={"h6"}
                      className="text-blue-600 font-normal"
                    >
                      No videos in this Playlist
                    </Typography>
                  </div>
                ) : (
                  <div>
                    {videos.map((video, idx) => (
                      <CommonVideoBox
                        key={idx}
                        userId={video.userId}
                        videoId={video.videoId}
                        uploader={video.uploader}
                        title={video.title}
                        desc={video.desc}
                        thumbnail={video.thumbnail}
                        duration={getFormatedTime(video.duration)}
                        dateTime={getLocaleTime(video.dateTime)}
                        views={video.views}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Box>
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

export default WatchLaterVideos;
