import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Box,
} from "@mui/material";

// icons
import ShareIcon from "@mui/icons-material/Share";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InfoIcon from "@mui/icons-material/Info";
import PlaceIcon from "@mui/icons-material/Place";

const Info = ({
  open,
  handleClose,
  contact,
  views,
  subscribers,
  videosCount,
  joinedOn,
  location,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="know-more-about"
        aria-describedby="know-more-about-this-channel"
        sx={{
          ".MuiDialog-paper": {
            bgcolor: "#bdbdbd",
            color: "white",
          },
        }}
      >
        <DialogTitle
          id="know-more-dialog-title"
          className="text-slate-900 capitalize"
        >
          More About this Channel
        </DialogTitle>
        <Divider className="bg-slate-500" />
        <DialogContent>
          <DialogContentText id="know-more-dialog-description" tabIndex={-1}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"5px"}
              marginY={"5px"}
            >
              <LanguageIcon className="text-black" />
              <span className="text-slate-800 ml-1">Contact 📧 {contact}</span>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"5px"}
              marginY={"5px"}
            >
              <PeopleOutlineIcon className="text-black" />
              <span className="text-slate-800 ml-1">
                {subscribers} subscribers
              </span>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"5px"}
              marginY={"5px"}
            >
              <SlideshowIcon className="text-black" />
              <span className="text-slate-800 ml-1">{videosCount} videos</span>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"5px"}
              marginY={"5px"}
            >
              <TrendingUpIcon className="text-black" />
              <span className="text-slate-800 ml-1">{views} views</span>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"5px"}
              marginY={"5px"}
            >
              <InfoIcon className="text-black" />
              <span className="text-slate-800 ml-1">joined on {joinedOn}</span>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"5px"}
              marginY={"5px"}
            >
              <PlaceIcon className="text-black" />
              <span className="text-slate-800 ml-1">{location}</span>
            </Box>
            <Button
              variant="contained"
              endIcon={<ShareIcon />}
              className="text-white rounded-full bg-slate-800 mt-5 text-xs md:text-base"
            >
              Share this Channel
            </Button>
          </DialogContentText>
        </DialogContent>
        <Divider className="bg-slate-500" />
        <DialogActions>
          <Button
            onClick={handleClose}
            className="text-white bg-slate-700 rounded-full"
          >
            Close
          </Button>
          <Button
            onClick={handleClose}
            className="text-slate-700 bg-yellow-400 rounded-full"
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Info;
