"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlayListCard, PlayListSkeleton } from "@/ui/ComponentExporter";
import { Typography } from "@mui/material";

const OtherPlaylistTab = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists();
  }, []);

  // get all the playlists
  const getPlaylists = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `/api/user/others/get-playlists?userId=${userId}&category=channel`
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

export default OtherPlaylistTab;
