"use client";

import React, { useState, useRef } from "react";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter";
import {
  Container,
  Typography,
  Box,
  Chip,
  ListItem,
  Button,
  Select,
  MenuItem,
  Dialog,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSelector } from "react-redux";

// icons
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import UploadIcon from "@mui/icons-material/Upload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PublishIcon from "@mui/icons-material/Publish";
import { useRouter } from "next/navigation";
import { uploadUserImagesToFirebaseStorage } from "@/lib/_firebase/firebase.storage";

const VideoUploadWindow = ({
  isOpen,
  handleClose,
  file,
  setFile,
  uploading,
  setUploading,
  setFormData,
}) => {
  const userState = useSelector((state) => state.user);
  const fileUploadInputRef = useRef(null);

  // open explorer to choose file
  const showAllFiles = () => {
    fileUploadInputRef.current.click();
  };

  // select the file
  const handleFileChange = (e) => {
    setFile((prev) => e.target.files[0]);
  };

  // video duration
  const getVideoDuration = (ifile) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canPlay = video.canPlayType(ifile.type);
      if (canPlay === "") {
        reject("Unsupported file type");
        return;
      }
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.onerror = () => {
        reject("Error loading video");
      };
      video.src = URL.createObjectURL(ifile);
    });
  };

  // upload the file
  const handleUpload = async (e) => {
    e.preventDefault();

    // checking if user id is present
    if (!userState._id) return;

    // check if file is selected
    if (!file) return;

    // get the file duration
    const duration = await getVideoDuration(file);
    if (!duration) return;

    // close the modal
    handleClose((prev) => !prev);

    setUploading(true);

    try {
      const res = await axios.post(
        `http://localhost:5599/video-server/upload-new-video/${userState?._id}`,
        { file },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        const { videoId, url } = res.data;
        setFormData((prev) => ({
          ...prev,
          videoId,
          url,
        }));
        // saving to the database
        const result = await axios.post(
          `/api/user/channel/video/upload-new-video`,
          {
            videoId,
            url,
            metadata: { duration, size: file.size },
          }
        );
        if (!result.data.success) {
          throw new Error(
            `MongoDB Error: Failed to save the data to the database`
          );
        }
      } else {
        throw new Error(`Failed to upload video, Internal server error`);
      }
    } catch (e) {
      console.error(e);
      // again show the modal
      handleClose((prev) => !prev);
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {}}
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
          className={
            "flex flex-col items-center shadow-none border-[1px] border-solid border-zinc-400 rounded-md bg-zinc-900 w-full p-2"
          }
          encType="multipart/form-data"
          onSubmit={handleUpload}
        >
          <input
            type="file"
            name="videoFile"
            id="userFileUploadInput"
            ref={fileUploadInputRef}
            onChange={handleFileChange}
            required
            multiple={false}
            accept="video/*"
            className="hidden"
          />
          <Button
            type="button"
            disableFocusRipple={true}
            disableTouchRipple={true}
            disableRipple={true}
            disableElevation={true}
            className="w-full flex flex-col items-center hover:bg-transparent"
            onClick={showAllFiles}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <CloudCircleIcon className="text-white font-black text-9xl mx-1" />
              <Typography
                variant="caption"
                component={"span"}
                className="flex flex-col text-white text-lg sm:text-5xl leading-snug tracking-tight font-mono"
              >
                <span className="text-xs text-zinc-500">{`(Click me to choose a video)`}</span>
                Upload your videos or shorts
              </Typography>
            </Box>
          </Button>
          {file !== null && (
            <Button
              type="submit"
              disabled={uploading}
              className="flex flex-row items-center gap-3 bg-black p-2 m-1 border-2 border-solid border-black rounded-md disabled:bg-[#00000084] disabled:cursor-wait"
            >
              <UploadIcon className="text-white text-5xl" />
              <Typography className="text-white font-sans">
                {uploading ? <>Uploading...</> : <>Upload</>}
              </Typography>
            </Button>
          )}
        </Paper>
      </Dialog>
    </>
  );
};

const UploadVideo = () => {
  const userState = useSelector((state) => state.user);
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isVideoUploadModalOpen, setIsVideoUploadModalOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    videoId: "",
    title: "",
    desc: "",
    data: "",
    url: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // thumbnail
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const uploadToFirebase = async () => {
    try {
      const userID = userState._id;
      if (!userID) throw new Error(`User id not provided`);

      const res = await uploadUserImagesToFirebaseStorage(
        userID,
        "channel/video/thumbnail",
        thumbnailFile
      );

      return res[1];
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  // visibility
  const [visibility, setVisibility] = useState("private");

  // video tags input
  const [videoTags, setVideoTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const handleTagAdd = () => {
    if (tagInput.length > 0) {
      setVideoTags((prev) => [
        ...prev,
        { key: Math.random() * Math.random(), label: tagInput },
      ]);
      setTagInput("");
    }
  };
  const handleTagDelete = (tagToDelete) => () => {
    setVideoTags((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
  };

  // publish the video
  const [publishing, setPublishing] = useState(false);
  const handlePublish = async () => {
    if (publishing) return;

    setPublishing(true);

    const thumbnail = await uploadToFirebase();

    const tags = videoTags.map((tag) => tag.label);

    // checking if video id is present
    if (!formData.videoId) return;

    if (
      !formData.title ||
      !formData.desc ||
      !formData.data ||
      !tags ||
      tags.length === 0 ||
      !visibility
    )
      return;

    try {
      const res = await axios.post(
        `/api/user/channel/video/update-video?videoId=${formData.videoId}`,
        {
          title: formData.title,
          desc: formData.desc,
          data: formData.data,
          thumbnail,
          tags,
          visibility,
        }
      );
      if (res.data.success) {
        router.replace(`/you/studio`);
      } else {
        throw new Error(`Error publishing video, try again.`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      <VideoUploadWindow
        isOpen={isVideoUploadModalOpen}
        handleClose={setIsVideoUploadModalOpen}
        file={file}
        setFile={setFile}
        uploading={uploading}
        setUploading={setUploading}
        setFormData={setFormData}
      />

      {!isVideoUploadModalOpen && (
        <Container className="min-h-screen mt-[130px]" maxWidth={false}>
          {status === "loading" ? (
            <>
              <div className="w-full flex items-center justify-center">
                <Wait />
              </div>
            </>
          ) : status === "authenticated" ? (
            <>
              <Typography
                variant="h4"
                component={"h1"}
                className="text-white my-3 p-1 flex flex-row items-center gap-2 w-full justify-center border-2 border-solid border-white border-l-0 border-r-0 border-t-0"
              >
                Video Upload
                <CloudUploadIcon className="text-yellow-500 font-black text-4xl hover:scale-110 animate-bounce transition-all" />
              </Typography>

              <div className="flex flex-col md:flex-row items-start justify-start w-full">
                <div className="flex flex-col px-[5px] items-start justify-normal w-full md:w-[60%] md:md:border-2 md:border-solid md:border-white md:border-y-0 md:border-l-0">
                  <Typography
                    variant="subtitle1"
                    component={"h3"}
                    className="text-blue-600 p-1 my-1"
                  >
                    Video ID
                  </Typography>
                  <div className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 p-3 font-mono text-base text-white hover:ring-2 ring-yellow-500 w-full transition-all ease-in">
                    Video-ID:{" "}
                    {formData.videoId ? (
                      <>{formData.videoId}</>
                    ) : (
                      <>xxxxxxxxx</>
                    )}
                  </div>

                  <Typography
                    variant="subtitle1"
                    component={"h3"}
                    className="text-blue-600 p-1 my-1"
                  >
                    Title{" "}
                    <Typography
                      variant="overline"
                      component={"span"}
                      className="text-red-600"
                    >{`( * )`}</Typography>
                  </Typography>
                  <input
                    type="text"
                    name="title"
                    id="video-title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter the video title"
                    className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 p-3 font-mono text-base text-white focus:ring-2 hover:ring-2 ring-yellow-500 w-full transition-all ease-in"
                  />

                  <Typography
                    variant="subtitle1"
                    component={"h3"}
                    className="text-blue-600 p-1 my-1"
                  >
                    Description{" "}
                    <Typography
                      variant="overline"
                      component={"span"}
                      className="text-red-600"
                    >{`( * )`}</Typography>
                  </Typography>
                  <input
                    type="text"
                    name="desc"
                    id="description"
                    value={formData.desc}
                    onChange={handleInputChange}
                    placeholder="Enter short && crisp description here..."
                    className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 p-3 font-mono text-base text-white focus:ring-2 hover:ring-2 ring-yellow-500 w-full transition-all ease-in"
                  />

                  <Typography
                    variant="subtitle1"
                    component={"h3"}
                    className="text-blue-600 p-1 my-1"
                  >
                    Data{" "}
                    <Typography
                      variant="overline"
                      component={"span"}
                      className="text-red-600"
                    >{`( * )`}</Typography>
                  </Typography>
                  <textarea
                    name="data"
                    id="data"
                    rows={10}
                    cols={20}
                    color="white"
                    value={formData.data}
                    onChange={handleInputChange}
                    placeholder="Enter the long description here..."
                    className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 p-3 font-mono text-base text-white focus:ring-2 hover:ring-2 ring-yellow-500 w-full resize-y min-h-56 transition-all ease-in"
                  ></textarea>

                  <Typography
                    variant="subtitle1"
                    component={"h3"}
                    className="text-blue-600 p-1 my-1"
                  >
                    Thumbnail{" "}
                    <Typography
                      variant="overline"
                      component={"span"}
                      className="text-red-600"
                    >{`( * )`}</Typography>
                  </Typography>
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    multiple={false}
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files[0])}
                    placeholder="Choose thumbnail"
                    className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 p-3 font-mono text-base text-white focus:ring-2 hover:ring-2 ring-yellow-500 transition-all ease-in"
                  />
                  <img
                    src={
                      thumbnailFile
                        ? URL.createObjectURL(thumbnailFile)
                        : formData.thumbnailURL
                    }
                    alt=""
                    width={100}
                    height={100}
                    className="aspect-video rounded-sm my-3 animate-pulse bg-zinc-900 w-64 h-40"
                  />

                  <Typography
                    variant="subtitle1"
                    component={"h3"}
                    className="text-blue-600 p-1 my-1"
                  >
                    Tags{" "}
                    <Typography
                      variant="overline"
                      component={"span"}
                      className="text-red-600"
                    >{`( * )`}</Typography>
                  </Typography>
                  <div className="flex flex-row items-center bg-zinc-900 w-full p-2 my-3 flex-wrap">
                    {videoTags.map((data, idx) => (
                      <ListItem key={data.key} className="p-1 m-1 w-fit">
                        <Chip
                          label={data.label}
                          onDelete={handleTagDelete(data)}
                          className="text-white bg-zinc-950"
                        />
                      </ListItem>
                    ))}
                    <input
                      type="text"
                      name="tag"
                      id="video-tags"
                      value={tagInput}
                      onChange={(e) => {
                        setTagInput(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          handleTagAdd();
                        }
                      }}
                      placeholder="tag..."
                      className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 py-2 px-3 font-mono text-base text-white focus:ring-2 hover:ring-2 ring-yellow-500 transition-all ease-in"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start text-white md:w-[40%] w-full px-[10px]">
                  <Typography
                    variant="subtitle1"
                    component={"h3"}
                    className="text-white p-1 my-1"
                  >
                    {uploading ? (
                      <>
                        <span className="text-xl text-white animate-pulse font-bold">
                          Processing ...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="flex flex-col w-full text-white">
                          <span className="font-black text-white font-serif text-3xl">
                            Uploaded
                          </span>
                          <span className="text-blue-600 font-light font-mono text-base p-3 text-nowrap truncate max-w-xs">
                            Visit:
                            <Link
                              href={`/player/${formData.videoId}`}
                              className="ml-1"
                            >
                              {formData.url}
                            </Link>
                          </span>
                        </span>
                      </>
                    )}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    component={"h3"}
                    className="text-blue-600 p-1 my-1"
                  >
                    Set Visibility
                  </Typography>
                  <Select
                    id="video-visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="w-full text-white border-2 border-solid border-blue-400 bg-black outline-none focus:ring-2 ring-blue-400"
                  >
                    <MenuItem
                      value={"public"}
                      className="bg-white text-zinc-900 hover:bg-zinc-400"
                    >
                      public
                    </MenuItem>
                    <MenuItem
                      value={"private"}
                      className="bg-white text-zinc-900 hover:bg-zinc-400"
                    >
                      private
                    </MenuItem>
                  </Select>

                  <Button
                    startIcon={<PublishIcon />}
                    variant="contained"
                    onClick={handlePublish}
                    disabled={uploading || publishing}
                    className="bg-yellow-900 disabled:bg-yellow-300 text-white my-2 w-full disabled:cursor-wait"
                  >
                    {publishing ? <>Publishing ...</> : <>Publish</>}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex items-center justify-center">
                <NotAuthenticated />
              </div>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default UploadVideo;
