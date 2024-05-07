"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CreatePlaylist,
  PlayListCard,
  PlayListSkeleton,
} from "@/ui/ComponentExporter";
import { Button, Typography } from "@mui/material";

const PlaylistTab = () => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists();
  }, []);

  // get all the playlists
  const getPlaylists = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `/api/user/playlist/get-all-my-playlists?category=channel`
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
      <div className="w-full min-h-screen gap-3 flex flex-col items-start">
        {loading ? (
          <div className="w-full flex items-center my-2 p-2 text-white">
            <PlayListSkeleton totalPlaylists={10} />
          </div>
        ) : playlists.length === 0 ? (
          <div className="w-full p-1 my-2 flex items-center justify-center flex-wrap flex-col gap-2">
            <Typography variant="h5" component={"h5"} className="text-blue-600">
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
              category="channel"
              open={showCreatePlaylist}
              setOpen={setShowCreatePlaylist}
            />
          </div>
        ) : (
          <div>
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
    </>
  );
};

export default PlaylistTab;
