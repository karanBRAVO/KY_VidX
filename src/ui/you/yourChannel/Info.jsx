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
import ShareIcon from "@mui/icons-material/Share";

const Info = ({ open, handleClose, contents = [] }) => {
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
            {contents.map((item, index) => {
              return (
                <Box
                  key={index}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"5px"}
                  marginY={"5px"}
                >
                  <item.icon className="text-black" />
                  <span className="text-slate-800 ml-1">{item.desc}</span>
                </Box>
              );
            })}
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
