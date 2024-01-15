import { Typography, Menu, MenuItem, ListItemIcon } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UploadIcon from "@mui/icons-material/Upload";

const VideoCameraMenu = ({ isMenuOpen, handleMenuClose, anchorEl }) => {
  return (
    <>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "video-menu-button",
        }}
        sx={{
          ".MuiMenu-paper": {
            bgcolor: "white",
            color: "black",
          },
        }}
      >
        <MenuItem className="hover:bg-zinc-300">
          <ListItemIcon className="text-black text-xl">
            <CreateIcon />
          </ListItemIcon>
          <Typography className="text-black font-bold text-sm">
            Create Now
          </Typography>
        </MenuItem>
        <MenuItem className="hover:bg-zinc-300">
          <ListItemIcon className="text-black text-xl">
            <UploadIcon />
          </ListItemIcon>
          <Typography className="text-black font-bold text-sm">
            Upload
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default VideoCameraMenu;
