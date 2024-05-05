"use client";

import React from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { _hideNotifier } from "@/lib/_store/features/notifier/notifierSlice";

const Notifier = () => {
  const notifierState = useSelector((state) => state.notifier);
  const dispatch = useDispatch();

  // close the notifier window
  const closeNotifier = () => {
    dispatch(_hideNotifier());
  };

  return (
    <>
      <Snackbar
        open={notifierState?.visible}
        autoHideDuration={5000}
        onClose={() => closeNotifier()}
        message={notifierState?.msg}
        action={
          <IconButton
            size="small"
            onClick={() => closeNotifier()}
            className="text-white hover:bg-zinc-600"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        className="bg-zinc-700 rounded-lg text-white"
      />
    </>
  );
};

export default Notifier;
