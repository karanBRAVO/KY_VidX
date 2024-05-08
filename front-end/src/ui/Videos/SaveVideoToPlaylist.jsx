"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { CreatePlaylist } from "@/ui/ComponentExporter";
import axios from "axios";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";
import { useDispatch } from "react-redux";

const SaveVideoToPlaylist = ({
  category = "watch-later" || "channel",
  open,
  setOpen,
  videoId,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [createPlaylistState, setCreatePlaylistState] = useState(false);

  const [fetchingPlaylists, setFetchingPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  // select the playlist
  const [playlistId, setPlaylistId] = useState("");

  useEffect(() => {
    getAllPlaylists();
  }, []);

  // get all playlists
  const getAllPlaylists = async () => {
    setFetchingPlaylists(true);

    try {
      const res = await axios.get(
        `/api/user/playlist/get-all-my-playlists?category=${category}`
      );
      if (res.data.success) {
        setPlaylists((prev) => res.data.playlistData);
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingPlaylists(false);
    }
  };

  // save the video
  const saveVideo = async () => {
    if (loading || !category || !videoId) return;
    if (!playlistId) {
      dispatch(_showNotifier(`Please select a playlist.`));
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`/api/user/playlist/add-to-playlist`, {
        category,
        playlistId,
        videoId,
      });
      if (res.data.success) {
        dispatch(_showNotifier({ msg: `Saved to ${category} playlist` }));
        handleClose();
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // close the box
  const handleClose = () => {
    setOpen(false);
    setPlaylistId((prev) => "");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        className="bg-black text-white"
        sx={{
          ".MuiDialog-paper": {
            bgcolor: "#242323",
            width: "100%",
          },
        }}
      >
        <DialogTitle className="text-white font-black">Save Video</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            component={"div"}
            className="text-slate-300 text-base font-medium flex flex-row items-center gap-2"
          >
            Playlists
            <Button
              variant="contained"
              onClick={getAllPlaylists}
              title="if you cannot see the playlist then hit refresh"
              className="bg-white text-black font-black text-xs rounded-full"
            >
              Refresh
            </Button>
          </DialogContentText>
          {fetchingPlaylists ? (
            <div className="w-full flex items-center justify-center p-1 flex-col">
              <CircularProgress className="text-white" />
              <Typography
                variant="h6"
                className="text-slate-300 my-3 w-full text-wrap flex items-center justify-center"
              >
                Fetching Playlists
              </Typography>
            </div>
          ) : playlists.length === 0 ? (
            <>
              <Typography variant="subtitle1" className="text-slate-300">
                No playlists found
              </Typography>
            </>
          ) : (
            <div className="flex flex-col w-full p-1 mt-2">
              {playlists.map((playlist, idx) => (
                <div
                  key={idx}
                  className={`my-1 cursor-pointer w-full p-1 hover:bg-[#0000007e] border-[1px] border-solid border-[#ffffff] ${
                    playlistId == playlist.id ? "bg-[#000000c0]" : ""
                  }`}
                  onClick={() => setPlaylistId((prev) => playlist.id)}
                >
                  <span className="text-white capitalize">{playlist.name}</span>
                </div>
              ))}
            </div>
          )}
          <Divider className="bg-gray-300" />
          <Button
            variant="contained"
            onClick={() => setCreatePlaylistState(true)}
            className="bg-white text-black font-black capitalize font-sans mt-2"
          >
            Create New Playlist
          </Button>
          <CreatePlaylist
            category="watch-later"
            open={createPlaylistState}
            setOpen={setCreatePlaylistState}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="bg-[#242323] text-white text-base font-normal rounded-full"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="contained"
            className="bg-[#484141] text-white text-base font-normal rounded-full"
            disabled={loading}
            onClick={saveVideo}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveVideoToPlaylist;
