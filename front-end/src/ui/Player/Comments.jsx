"use client";

import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  InputBase,
  Dialog,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const ReplyWindow = ({
  cId,
  isOpen,
  handleClose,
  value,
  setValue,
  onformsubmit = (e) => {
    e.preventDefault();
  },
}) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={"lg"}
        sx={{
          ".MuiDialog-paper": {
            bgcolor: "#0000",
            width: "100%",
          },
        }}
      >
        <Paper
          component="form"
          name="reply-form"
          id="reply-form"
          className={
            "flex flex-col items-start shadow-none border-[1px] border-solid border-zinc-400 rounded-md bg-zinc-900 w-full p-2"
          }
          onSubmit={onformsubmit}
        >
          <Box margin={"4px"} paddingX={"3px"}>
            <Typography
              variant="h6"
              component={"h4"}
              className="text-white capitalize"
            >
              Reply
              <Typography className="mx-1" variant="caption" component={"span"}>
                {`cid: (${cId}`.substring(0, 10) + `...)`}
              </Typography>
            </Typography>
          </Box>
          <Divider className="bg-zinc-200 w-full m-1" />
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"start"}
            justifyContent={"space-evenly"}
            width={"100%"}
            margin={"3px"}
            gap={"2px"}
          >
            <IconButton
              aria-label="reply-window-button"
              type="submit"
              className="text-white px-3 cursor-pointer"
            >
              <SendIcon />
            </IconButton>
            <InputBase
              className={
                "w-full text-slate-300 border-2 border-solid border-zinc-900 border-b-blue-500 p-1"
              }
              placeholder="Ya this video is Excellent 💗"
              multiline={true}
              maxRows={5}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              inputProps={{ "aria-label": "reply box" }}
            />
          </Box>
        </Paper>
      </Dialog>
    </>
  );
};

const CommentInputBox = () => {
  return (
    <>
      <Box
        marginY={"4px"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"start"}
        justifyContent={"space-evenly"}
        gap={"5px"}
      >
        <Avatar
          src="/defaultThumbnail.jpg"
          alt="/"
          className="w-8 h-8 m-1 border-2 border-solid border-zinc-400 hidden sm:block"
        />
        <InputBase
          id="user-comment"
          type="text"
          multiline={true}
          maxRows={10}
          placeholder="I like this video 🩷"
          required={true}
          className="w-full rounded-none text-white border-2 border-solid border-black border-b-blue-500 p-2"
        />
        <Button
          variant="contained"
          className="rounded-xl sm:rounded-full border-2 border-solid border-white text-white bg-black"
        >
          <SendIcon className="text-white" />
          <Typography
            variant="button"
            component={"span"}
            className="mx-2 text-white"
          >
            Send
          </Typography>
        </Button>
      </Box>
    </>
  );
};

const CommentBox = ({ cId, replyValue, setReplyValue, handleFormSubmit }) => {
  const [replyWindowOpen, setReplyWindowOpen] = useState(false);
  const handleReplyWindowOpen = () => {
    setReplyWindowOpen(true);
  };
  const handleReplyWindowClose = () => {
    setReplyWindowOpen(false);
  };

  return (
    <>
      <Box
        bgcolor={"#171717"}
        padding={"5px"}
        borderRadius={"5px"}
        margin={"5px 2px"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"start"}
          gap={"5px"}
        >
          <Avatar src="/defaultThumbnail.jpg" alt="/" className="w-10 h-10" />
          <Typography
            variant="h3"
            component={"h6"}
            className="text-white text-lg flex flex-col"
          >
            <Typography variant="inherit" component={"span"}>
              Karan Yadav
            </Typography>
            <Typography
              variant="caption"
              component={"span"}
              className="text-zinc-200"
            >
              16-01-2024
            </Typography>
          </Typography>
        </Box>
        <Box padding={"3px 7px"} margin={"2px 5px"}>
          <Typography
            variant="caption"
            component={"span"}
            className="text-xs md:text-sm"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            molestias quo eius, magni unde aliquid! Rerum, minus aperiam illum
            nemo numquam tempora atque voluptatum quibusdam officiis veniam nam
            explicabo aliquam!
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row"} gap={"5px"} margin={"4px"}>
          <Button
            variant="outlined"
            className="text-blue-500 capitalize"
            onClick={handleReplyWindowOpen}
          >
            Reply
          </Button>
        </Box>
        <ReplyWindow
          cId={cId}
          isOpen={replyWindowOpen}
          handleClose={handleReplyWindowClose}
          value={replyValue}
          setValue={setReplyValue}
          onformsubmit={handleFormSubmit}
        />
      </Box>
    </>
  );
};

const Comments = ({ commentId }) => {
  const [replyValue, setReplyValue] = useState("");
  const handleReplyFormSubmit = (e) => {
    e.preventDefault();
    console.log(replyValue);
  };

  return (
    <>
      <Container maxWidth={false} className="my-2 flex flex-col">
        <Typography
          variant="h5"
          component={"h3"}
          className="capitalize text-white"
        >
          Comments
        </Typography>
        <CommentInputBox />
        <CommentBox
          cId={commentId}
          replyValue={replyValue}
          setReplyValue={setReplyValue}
          handleFormSubmit={handleReplyFormSubmit}
        />
      </Container>
    </>
  );
};

export default Comments;
