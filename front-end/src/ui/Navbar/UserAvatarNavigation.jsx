"use client";

import React from "react";
import {
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Dialog,
} from "@mui/material";
import { signOut } from "next-auth/react";

// icons
import ViewArrayIcon from "@mui/icons-material/ViewArray";
import LogoutIcon from "@mui/icons-material/Logout";

const UserAvatarNavigation = ({ showBar, setShowBar }) => {
  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  const handleClose = () => {
    setShowBar(false);
  };

  return (
    <>
      <Dialog
        open={showBar}
        onClose={handleClose}
        sx={{
          ".MuiDialog-paper": {
            bgcolor: "#000",
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        className="flex items-end justify-end"
      >
        <Paper
          sx={{
            width: "fit-content",
            display: "flex",
            bgcolor: "gray",
            color: "black",
          }}
        >
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <ViewArrayIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Your Channel</ListItemText>
              <Typography variant="body2" color="text.secondary">
                🫵
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Dialog>
    </>
  );
};

export default UserAvatarNavigation;
