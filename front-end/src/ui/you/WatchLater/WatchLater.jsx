"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import {
  CreatePlaylist,
  NotAuthenticated,
  PlayListCard,
  PlayListSkeleton,
  Wait,
} from "@/ui/ComponentExporter";
import axios from "axios";
import { useSession } from "next-auth/react";

// icons
import ListIcon from "@mui/icons-material/List";

const WatchLater = () => {
  const { data: session, status } = useSession();

  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists();
  }, []);

  // get all playlists
  const getPlaylists = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `/api/user/playlist/get-all-my-playlists?category=watch-later`
      );
      if (res.data.success) {
        setPlaylists((prev) => res.data.playlistData);
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
            <div className="flex flex-row items-center gap-2">
              <ListIcon fontSize="large" className="text-white font-black" />
              <Typography
                variant="h4"
                component={"h1"}
                className="font-black text-white capitalize m-1 tracking-tight leading-1 flex gap-2 flex-row flex-wrap items-center justify-center"
              >
                Watch Later
                <Typography
                  variant="caption"
                  component={"span"}
                  className="text-slate-800 px-2 py-1 rounded-md bg-gray-400 lowercase"
                >
                  now
                </Typography>
              </Typography>
            </div>

            <div>
              {loading ? (
                <div>
                  <PlayListSkeleton totalPlaylists={3} />
                </div>
              ) : (
                <div>
                  {playlists.length === 0 ? (
                    <div className="w-full p-1 my-2 flex items-center justify-center flex-wrap flex-col gap-2">
                      <Typography
                        variant="h5"
                        component={"h5"}
                        className="text-blue-600"
                      >
                        No playlist created yet
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => setShowCreatePlaylist(true)}
                        className="bg-slate-300 text-slate-950 text-base font-normal font-sans capitalize"
                      >
                        Create Playlist
                      </Button>
                      <CreatePlaylist
                        category="watch-later"
                        open={showCreatePlaylist}
                        setOpen={setShowCreatePlaylist}
                        getPlaylists={getPlaylists}
                      />
                    </div>
                  ) : (
                    <div className="w-full flex flex-row items-center justify-evenly flex-wrap">
                      {playlists.map((playlist, idx) => (
                        <PlayListCard
                          key={idx}
                          name={playlist.name}
                          imgSrc={playlist.imgSrc}
                          desc={playlist.desc}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
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

export default WatchLater;
