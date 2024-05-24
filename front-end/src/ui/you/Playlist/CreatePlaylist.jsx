"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";

const CreatePlaylist = ({
  category = "watch-later" || "channel",
  open,
  setOpen,
  getPlaylists,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    category,
  });
  const [loading, setLoading] = useState(false);

  // controlled inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "desc" && value.length >= 200) {
      dispatch(_showNotifier({ msg: "Max Length reached for description." }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit
  const handleSubmit = async () => {
    if (!formData.name || !formData.desc) {
      dispatch(_showNotifier({ msg: "Please fill all the required fields." }));
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `/api/user/playlist/create-new-playlist`,
        formData
      );
      if (res.data.success) {
        getPlaylists();
        handleClose();
      } else {
        dispatch(_showNotifier({ msg: `${res.data.error}` }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // close the box
  const handleClose = () => {
    setOpen(false);
    setFormData((prev) => ({ ...prev, name: "", desc: "" }));
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
        <DialogTitle className="text-white font-black">
          Create Playlist
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText className="text-slate-300 text-base font-medium flex flex-row items-center gap-2">
            Playlist Name:
            <input
              type="text"
              name="name"
              id="playlistname"
              required={true}
              placeholder="Should be unique"
              autoComplete="off"
              value={formData.name}
              onChange={handleInputChange}
              className="outline-none px-3 py-2 rounded-none bg-transparent border-[1px] border-solid border-[#000000] border-t-0 border-x-0 text-base font-mono"
            />
          </DialogContentText>
          <DialogContentText className="text-slate-300 text-base font-medium flex flex-row items-center gap-2 mt-2">
            Playlist Description {`(200)`}:
            <textarea
              name="desc"
              id="playlistdescription"
              required={true}
              placeholder="Should be brief"
              value={formData.desc}
              onChange={handleInputChange}
              className="outline-none px-3 py-2 rounded-none bg-transparent border-[1px] border-solid border-[#000000] border-t-0 border-x-0 min-h-[45px] text-base font-mono"
            ></textarea>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="bg-[#242323] text-white text-base font-normal rounded-full"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="bg-[#484141] text-white text-base font-normal rounded-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePlaylist;
