"use client";

import { Container, Box, Skeleton, Typography } from "@mui/material";
import CommonVideoBox from "../CommonVideoBox";
import { useSession } from "next-auth/react";
import { NotAuthenticated, VideoSkeleton, Wait } from "@/ui/ComponentExporter";
import axios from "axios";
import { useEffect, useState } from "react";
import { getFormatedTime, getLocaleTime } from "@/lib/utils/DateConvertor";
import Link from "next/link";

const Subscriptions = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [subscribedTo, setSubscribedTo] = useState([]);

  const [selectedChannel, setSelectedChannel] = useState({
    channelName: "",
    userId: "",
  });
  const [fetchingVideos, setFetchingVideos] = useState(false);
  const [subscribedVideos, setSubscribedVideos] = useState([]);

  useEffect(() => {
    getSubscriptions();
  }, []);

  // get all subscriptions
  const getSubscriptions = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `/api/user/get-all-videos/subscription/subscribedTo`
      );
      if (res.data.success) {
        setSubscribedTo((prev) => res.data.subTo);
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // get all subscription videos
  const getSubscriptionsVideos = async (channelName, userId) => {
    if (!channelName || !userId || fetchingVideos) return;

    setFetchingVideos(true);

    setSelectedChannel((prev) => ({ channelName, userId }));

    try {
      const res = await axios.get(
        `/api/user/get-all-videos/subscription/subscribedVideos?channelName=${channelName}`
      );
      if (res.data.success) {
        setSubscribedVideos((prev) => res.data.videos);
      } else {
      }
      if (res.data.success) {
        setSubscribedVideos(res.data.videos);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingVideos(false);
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
            <h1 className="font-black text-white capitalize m-1 tracking-tight leading-1">
              Subscriptions
            </h1>
            <div className="flex flex-col items-start text-white w-full">
              <div className="flex flex-row items-center overflow-auto w-full px-3 py-5 my-2 border-2 border-solid border-black border-b-white">
                {loading ? (
                  new Array(10).fill(0).map((_, idx) => (
                    <div
                      className="bg-[#ffffff30] mx-3 rounded-full p-2"
                      key={idx}
                    >
                      <Skeleton
                        variant="circular"
                        component={"span"}
                        animation={"pulse"}
                        className="w-20 h-20 md:w-32 md:h-32 bg-[#00000078]"
                      />
                    </div>
                  ))
                ) : subscribedTo.length === 0 ? (
                  <>
                    <Typography
                      variant="subtitle1"
                      component={"h3"}
                      className="text-slate-300 font-medium font-sans"
                    >
                      You have not subscribed to anyone
                    </Typography>
                  </>
                ) : (
                  subscribedTo.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#ffffff30] mx-3 rounded-full p-2 cursor-pointer flex items-center justify-center"
                      onClick={() =>
                        getSubscriptionsVideos(item.channelName, item.userId)
                      }
                      title={item.userName}
                    >
                      <img
                        src={item.userImage}
                        alt="pic"
                        width={150}
                        height={150}
                        draggable={false}
                        className="border-4 rounded-full border-solid border-black w-20 h-20 md:w-32 md:h-32"
                        title={`Subscribed on: ${getLocaleTime(
                          item.subscribedDate
                        )}`}
                      />
                    </div>
                  ))
                )}
              </div>
              <div className="my-3 p-3">
                {selectedChannel.channelName.length === 0 ? (
                  <>
                    <Typography
                      variant="h6"
                      component={"h3"}
                      className="text-blue-600 w-full text-center font-normal font-mono"
                    >
                      Choose a channel from your above list of subscriptions
                    </Typography>
                  </>
                ) : (
                  <>
                    <Link href={`/other/${selectedChannel.userId}`}>
                      <h2 className="text-slate-300 hover:underline cursor-pointer">
                        {selectedChannel.channelName}
                      </h2>
                    </Link>

                    <div className="w-full gap-3 flex flex-col items-start">
                      {fetchingVideos ? (
                        <>
                          <VideoSkeleton />
                        </>
                      ) : subscribedVideos.length === 0 ? (
                        <>
                          <Typography
                            variant="h6"
                            component={"h3"}
                            className="text-blue-600 w-full text-center font-normal font-mono"
                          >
                            No video uploaded yet
                          </Typography>
                        </>
                      ) : (
                        subscribedVideos.map((item, index) => (
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
                  </>
                )}
              </div>
            </div>
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

export default Subscriptions;
