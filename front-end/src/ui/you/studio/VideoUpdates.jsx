"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter";
import { useSession } from "next-auth/react";
import axios from "axios";

const VideoUpdates = ({ videoId }) => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getVideoDetails();
  }, []);

  // get the video details
  const getVideoDetails = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `/api/user/studio/get-video/?videoId=${videoId}`
      );
      console.log({ res: res.data });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // update video details
  const updateVideoDetails = async () => {
    setUpdating(true);

    try {
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
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
          <h1 className="text-white text-xl">VideoId = {videoId}</h1>
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

export default VideoUpdates;
