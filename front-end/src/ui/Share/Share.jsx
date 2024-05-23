import {
  EmailShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailIcon,
  WhatsappIcon,
  InstapaperIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const Share = ({ open, setOpen, url }) => {
  const handleClose = () => setOpen((prev) => false);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"lg"}
        scroll="paper"
        sx={{
          ".MuiDialog-paper": {
            bgcolor: "#303030",
          },
        }}
      >
        <DialogTitle className="text-white">Share</DialogTitle>
        <DialogContent
          dividers={true}
          className="text-white flex flex-row gap-5 items-start w-full justify-evenly max-w-lg flex-wrap"
        >
          <EmailShareButton
            url={`${url}`}
            className="flex flex-col items-center gap-2"
          >
            <EmailIcon />
            <Typography
              variant="subtitle2"
              component={"span"}
              className="text-gray-300"
            >
              Email
            </Typography>
          </EmailShareButton>
          <WhatsappShareButton
            url={`${url}`}
            className="flex flex-col items-center gap-2"
          >
            <WhatsappIcon />
            <Typography
              variant="subtitle2"
              component={"span"}
              className="text-gray-300"
            >
              Whatsapp
            </Typography>
          </WhatsappShareButton>
          <InstapaperShareButton
            url={`${url}`}
            className="flex flex-col items-center gap-2"
          >
            <InstapaperIcon />
            <Typography
              variant="subtitle2"
              component={"span"}
              className="text-gray-300"
            >
              Instapaper
            </Typography>
          </InstapaperShareButton>
          <FacebookShareButton
            url={`${url}`}
            className="flex flex-col items-center gap-2"
          >
            <FacebookIcon />
            <Typography
              variant="subtitle2"
              component={"span"}
              className="text-gray-300"
            >
              Facebook
            </Typography>
          </FacebookShareButton>
          <LinkedinShareButton
            url={`${url}`}
            className="flex flex-col items-center gap-2"
          >
            <LinkedinIcon />
            <Typography
              variant="subtitle2"
              component={"span"}
              className="text-gray-300"
            >
              Linked in
            </Typography>
          </LinkedinShareButton>
          <PinterestShareButton
            url={`${url}`}
            className="flex flex-col items-center gap-2"
          >
            <PinterestIcon />
            <Typography
              variant="subtitle2"
              component={"span"}
              className="text-gray-300"
            >
              Pinterest
            </Typography>
          </PinterestShareButton>
          <TelegramShareButton
            url={`${url}`}
            className="flex flex-col items-center gap-2"
          >
            <TelegramIcon />
            <Typography
              variant="subtitle2"
              component={"span"}
              className="text-gray-300"
            >
              Telegram
            </Typography>
          </TelegramShareButton>
          <TwitterShareButton
            url={`${url}`}
            className="flex flex-col items-center gap-2"
          >
            <TwitterIcon />
            <Typography
              variant="subtitle2"
              component={"span"}
              className="text-gray-300"
            >
              Twitter
            </Typography>
          </TwitterShareButton>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            className="capitalize text-[#e4e3e3] bg-none border-2 border-solid border-white rounded-full"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Share;
