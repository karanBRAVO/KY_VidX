"use client";

import React, { useState } from "react";
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
} from "@mui/material";
import { useSession } from "next-auth/react";

// icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PublishIcon from "@mui/icons-material/Publish";

const UploadVideo = () => {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    videoId: "",
    title: "",
    desc: "",
    data: "",
    url: "",
    thumbnailURL: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // thumbnail
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const uploadToFirebase = async () => {};

  // visibility
  const [visibility, setVisibility] = useState("");

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

  // save to database
  const [savingStatus, setSavingStatus] = useState(false);
  const saveToDB = async () => {
    setSavingStatus(true);
    try {
    } catch (e) {
      console.error(e);
    } finally {
      setSavingStatus(false);
    }
  };

  return (
    <>
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

            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"start"}
              justifyContent={"start"}
              width={"100%"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                justifyContent={"start"}
                width={"60%"}
                paddingX={"10px"}
                borderRight={"2px solid white"}
              >
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className="text-blue-600 p-1 my-1"
                >
                  Video ID
                </Typography>
                <div className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 p-3 font-mono text-base text-white hover:ring-2 ring-yellow-500 w-full transition-all ease-in">
                  Video-ID: xxxxxxxxx
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
                  id="thumnail"
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
                {thumbnailFile && (
                  <Button
                    className="bg-yellow-400 text-black border-yellow-400"
                    variant="contained"
                  >
                    Upload
                  </Button>
                )}

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
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                justifyContent={"start"}
                color={"white"}
                width={"40%"}
                paddingX={"10px"}
              >
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className="text-white p-1 my-1"
                >
                  Processing...
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
                  className="bg-yellow-900 text-white my-2 w-full"
                >
                  Publish
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-center">
              <NotAuthenticated />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default UploadVideo;
