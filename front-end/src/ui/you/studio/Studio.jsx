"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter";
import { useSession } from "next-auth/react";
import { getLocaleTime } from "@/lib/utils/DateConvertor";
import Link from "next/link";
import axios from "axios";

// icons
import TableChartIcon from "@mui/icons-material/TableChart";

const Studio = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  // fetch the videos
  const getVideos = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`/api/user/studio/get-videos`);
      if (res.data.success) {
        setVideos((prev) => [...res.data.videos]);
      }
    } catch (error) {
      console.error(error);
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
          <>
            <Typography
              variant="h4"
              component={"h1"}
              className="text-white my-3 p-1 flex flex-row items-center gap-3 justify-start w-full"
            >
              <TableChartIcon className="text-white font-black text-4xl" />
              Studio
            </Typography>

            {loading ? (
              <div className="my-2 w-full p-1 flex items-center justify-center animate-bounce">
                Fetching Videos...
              </div>
            ) : (
              videos.length > 0 && (
                <TableContainer
                  component={Paper}
                  className="bg-black border-white border-[1px] border-solid"
                >
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                    className="bg-zinc-900 text-white"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-white">Title</TableCell>
                        <TableCell align="right" className="text-white">
                          Visibility
                        </TableCell>
                        <TableCell align="right" className="text-white">
                          Likes
                        </TableCell>
                        <TableCell align="right" className="text-white">
                          Views
                        </TableCell>
                        <TableCell align="right" className="text-white">
                          Upload Date
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="text-zinc-200">
                      {videos.map((video, idx) => (
                        <TableRow
                          key={video.videoId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className="text-zinc-200 hover:bg-zinc-950"
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className="text-zinc-300 flex flex-col items-start"
                            title={video.videoId}
                          >
                            <div className="flex flex-row items-center w-full gap-2 my-1">
                              <img
                                src={video.thumbnail}
                                alt="Image"
                                width={100}
                                height={100}
                                draggable={false}
                                className="w-[67px] h-[55px] rounded-sm mx-1 aspect-video border-2 border-solid border-[#000000] shadow-sm shadow-slate-300"
                              />
                              <Link
                                href={`/you/studio/update-video/${video.videoId}`}
                              >
                                <Typography
                                  variant="h5"
                                  component={"span"}
                                  className="text-white hover:underline font-bold text-base capitalize max-w-sm truncate"
                                >
                                  {video.title}
                                </Typography>
                              </Link>
                            </div>
                            <Typography
                              variant="caption"
                              component={"span"}
                              className="text-slate-400 font-light text-xs truncate px-3 py-2 max-w-sm"
                            >
                              {video.desc}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" className="text-zinc-300">
                            {video.visibility}
                          </TableCell>
                          <TableCell align="right" className="text-zinc-300">
                            {video.likes}
                          </TableCell>
                          <TableCell align="right" className="text-zinc-300">
                            {video.views}
                          </TableCell>
                          <TableCell align="right" className="text-zinc-300">
                            {getLocaleTime(video.uploadDate)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            )}
          </>
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

export default Studio;
