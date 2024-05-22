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
  Skeleton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getLocaleTime } from "@/lib/utils/DateConvertor";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";
import Link from "next/link";

const ReplyWindow = ({ commentid, isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleValueChange = (e) => setValue((prev) => e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentid || loading || !value) return;

    setLoading(true);

    try {
      const res = await axios.post(`/api/user/channel/video/comment/reply`, {
        commentId: commentid,
        comment: value,
      });
      if (res.data.success) {
        dispatch(_showNotifier({ msg: "Reply Success." }));
      } else {
        dispatch(_showNotifier({ msg: `Error while replying` }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

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
          onSubmit={handleSubmit}
        >
          <Box margin={"4px"} paddingX={"3px"}>
            <Typography
              variant="h6"
              component={"h4"}
              className="text-white capitalize"
            >
              Reply
              <Typography className="mx-1" variant="caption" component={"span"}>
                {`cid: (${commentid}`.substring(0, 10) + `...)`}
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
              disabled={value.length === 0 || loading}
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
              onChange={handleValueChange}
              required
              inputProps={{ "aria-label": "reply box" }}
            />
          </Box>
        </Paper>
      </Dialog>
    </>
  );
};

const CommentInputBox = ({ videoId }) => {
  // global states
  const { data: session, status } = useSession();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // states
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // control the comment input
  const handleInputChange = (e) => {
    setInputValue((prev) => e.target.value);
  };

  // submit the comment
  const handleSubmit = async () => {
    if (inputValue.length === 0 || loading || !videoId) return;

    setLoading(true);
    try {
      const res = await axios.post(`/api/user/channel/video/comment`, {
        videoId,
        comment: inputValue,
      });
      if (res.data.success) {
        dispatch(_showNotifier({ msg: "Comment posted successfully" }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status === "loading" ? (
        <div className="flex flex-row items-center space-x-2 gap-1">
          <Skeleton
            animation="wave"
            variant="circular"
            component={"span"}
            className="bg-[#3d3a3a] w-16 h-12"
          />
          <Skeleton
            animation="wave"
            variant="text"
            component={"span"}
            className="bg-[#3d3a3a] text-base w-full"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            component={"span"}
            className="bg-[#3d3a3a] w-40 h-10"
          />
        </div>
      ) : status === "unauthenticated" ? (
        <></>
      ) : (
        <Box
          marginY={"4px"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"start"}
          justifyContent={"space-evenly"}
          gap={"5px"}
        >
          <Avatar
            src={session?.user?.image}
            alt="/"
            className="w-8 h-8 m-1 border-2 border-solid border-zinc-400 hidden sm:block"
          />
          <InputBase
            id="user-comment"
            disabled={!user._id || loading}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            multiline={true}
            maxRows={10}
            placeholder="I like this video 🩷"
            required={true}
            className="w-full rounded-none text-white border-2 border-solid border-black border-b-blue-500 p-2"
          />
          <Button
            variant="contained"
            disabled={!user._id || inputValue.length === 0 || loading}
            onClick={handleSubmit}
            className="rounded-xl sm:rounded-full border-2 border-solid border-white text-white bg-black disabled:cursor-not-allowed"
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
      )}
    </>
  );
};

const CommentBox = ({ videoId }) => {
  // global state variables
  const { data: session, status } = useSession();

  // states
  const [fetching, setFetching] = useState(false);
  const [comments, setComments] = useState([]);
  const [replyWindowOpen, setReplyWindowOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState("");

  // open the reply window
  const handleReplyWindowOpen = () => {
    setReplyWindowOpen(true);
  };

  // close the reply window
  const handleReplyWindowClose = () => {
    setReplyWindowOpen(false);
  };

  // getting the comments
  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    setFetching(true);

    try {
      const res = await axios.get(
        `/api/user/get-all-videos/comments/get-comments?videoId=${videoId}`
      );
      if (res.data.success) {
        setComments((prev) => [...res.data.details]);
      } else {
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  // TODO: to show the replies
  const getReplies = async (commentId) => {
    if (!videoId || !commentId) return;

    try {
      const res = await axios.get(
        `/api/user/get-all-videos/comments/get-replies?videoId=${videoId}&commentId=${commentId}`
      );
      console.log(res.data);
      if (res.data.success) {
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {status === "loading" || fetching ? (
        new Array(3).fill(0).map((_, i) => (
          <div key={i} className="w-full rounded-md p-3 bg-[#1b1919] my-2">
            <div className="w-full flex flex-row items-start justify-start gap-4">
              <Skeleton
                variant="circular"
                animation="pulse"
                className="w-16 h-14 bg-[#4e4646]"
              />
              <Skeleton
                variant="text"
                animation="pulse"
                className="w-24 bg-[#4e4646]"
              />
            </div>
            <div className="w-full">
              <Skeleton
                animation="pulse"
                variant="text"
                className="w-full bg-[#4e4646]"
              />
              <Skeleton
                animation="pulse"
                variant="text"
                className="w-[90%] bg-[#4e4646]"
              />
              <Skeleton
                animation="pulse"
                variant="text"
                className="w-[80%] bg-[#4e4646]"
              />
            </div>
            <div className="w-full flex items-center justify-start p-1">
              <Skeleton
                animation="pulse"
                variant="rectangular"
                className="bg-[#4e4646] w-16 h-8"
              />
            </div>
          </div>
        ))
      ) : comments.length === 0 ? (
        <>
          <Typography
            variant="subtitle1"
            component={"span"}
            className="text-blue-700"
          >
            No comments yet.
          </Typography>
        </>
      ) : (
        comments.map((comment, idx) => (
          <Box
            key={idx}
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
              <Avatar
                src={comment.commentor_image}
                alt="/"
                className="w-10 h-10"
              />
              <Typography
                variant="h3"
                component={"h6"}
                className="text-white text-lg flex flex-col"
              >
                <Typography
                  variant="inherit"
                  component={"span"}
                  className="capitalize hover:underline"
                >
                  <Link href={`/other/${comment.commentorId}`}>
                    {comment.commentor}
                  </Link>
                </Typography>
                <Typography
                  variant="caption"
                  component={"span"}
                  className="text-zinc-200"
                >
                  {getLocaleTime(comment.commentedAt)}
                </Typography>
              </Typography>
            </Box>
            <Box padding={"3px 7px"} margin={"2px 5px"}>
              <Typography
                variant="caption"
                component={"span"}
                className="text-xs md:text-sm"
              >
                {comment.comment}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={"5px"}
              margin={"4px"}
              width={"100%"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Button
                variant="outlined"
                className="text-blue-500 capitalize rounded-full"
                onClick={() => getReplies(comment.commentId)}
              >
                {comment.totalReplies} replies
              </Button>
              <Button
                variant="outlined"
                className="text-blue-500 capitalize rounded-full"
              >
                0 Likes
              </Button>
              <Button
                variant="outlined"
                className="text-blue-500 capitalize rounded-full"
              >
                0 Dislikes
              </Button>
              <Button
                variant="text"
                className="text-[#fff] capitalize ml-2 text-sm underline"
                onClick={() => {
                  setSelectedCommentId((prev) => comment.commentId);
                  handleReplyWindowOpen();
                }}
              >
                Reply
              </Button>
            </Box>
          </Box>
        ))
      )}
      <ReplyWindow
        commentid={selectedCommentId}
        isOpen={replyWindowOpen}
        handleClose={handleReplyWindowClose}
      />
    </>
  );
};

const Comments = ({ videoId }) => {
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
        <CommentInputBox videoId={videoId} />
        <CommentBox videoId={videoId} />
      </Container>
    </>
  );
};

export default Comments;
