"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter";
import { useSession } from "next-auth/react";
import axios from "axios";

// icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";

const VideoUpdates = ({ videoId }) => {
  const { data: session, status } = useSession();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // states
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [details, setDetails] = useState({
    videoId: "",
    url: "",
    title: "",
    data: "", // long description
    desc: "", // short description
    thumbnail: "", // video thumbnail
    tags: [],
    visibility: "", // private or public
  });
  const [formData, setFormData] = useState({
    // key: [value, isEdited]
    title: ["", false],
    data: ["", false],
    desc: ["", false],
    thumbnail: [null, false],
    tags: [[], false],
    visibility: ["", false],
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "thumbnail" || name === "tags") return;
    let isEdited = details[name] === value ? false : true;
    setFormData((prev) => {
      return { ...prev, [name]: [value, isEdited] };
    });
  };

  // video tags input
  const [tagInput, setTagInput] = useState("");
  const handleTagAdd = () => {
    if (tagInput.length > 0) {
      for (let i = 0; i < formData.tags[0].length; i++) {
        // checking if tag is already present
        if (formData.tags[0][i].label.toLowerCase() === tagInput.toLowerCase())
          return;
      }
      let isEdited = true;
      for (let i = 0; i < details.tags.length; i++) {
        if (details.tags[i].label.toLowerCase() === tagInput.toLowerCase()) {
          isEdited = false;
          break;
        }
      }
      setFormData((prev) => ({
        ...prev,
        tags: [
          [
            ...prev.tags[0],
            {
              key: Math.random() * Math.random(),
              label: tagInput.toLowerCase(),
            },
          ],
          isEdited,
        ],
      }));
      setTagInput("");
    }
  };
  const handleTagDelete = (tagToDelete) => () => {
    let isEdited = false;
    for (let i = 0; i < details.tags.length; i++) {
      if (
        details.tags[i].label.toLowerCase() === tagToDelete.label.toLowerCase()
      ) {
        isEdited = true;
        break;
      }
    }
    setFormData((prev) => {
      return {
        ...prev,
        tags: [
          prev.tags[0].filter((tag) => tag.key !== tagToDelete.key),
          isEdited,
        ],
      };
    });
  };

  // handle cancel changes
  const handleCancelChanges = () => {
    setFormData((prev) => ({
      ...prev,
      title: [details.title, false],
      desc: [details.desc, false],
      data: [details.data, false],
      visibility: [details.visibility, false],
      tags: [details.tags, false],
    }));
    setThumbnailFile(null);
  };

  useEffect(() => {
    getVideoDetails();
  }, []);

  // get the video details
  const getVideoDetails = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `/api/user/studio/get-video/?videoId=${videoId}`
      );
      if (res.data.success) {
        const video_data = res.data.videoData;
        const videoTags = video_data.tags.map((tag) => ({
          key: Math.random() * Math.random(),
          label: tag,
        }));
        setDetails((prev) => ({
          videoId: video_data.videoId,
          url: video_data.url,
          title: video_data.title,
          desc: video_data.desc,
          data: video_data.data,
          thumbnail: video_data.thumbnail,
          tags: videoTags,
          visibility: video_data.visibility,
        }));
        setFormData((prev) => ({
          title: [video_data.title, false],
          desc: [video_data.desc, false],
          data: [video_data.data, false],
          visibility: [video_data.visibility, false],
          thumbnail: [video_data.thumbnail, false],
          tags: [videoTags, false],
        }));
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // upload to firebase
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

  // update video details
  const updateVideoDetails = async () => {
    setUpdating(true);

    let updatedData = {};

    let thumbnail = undefined;
    if (thumbnailFile) {
      thumbnail = await uploadToFirebase();
      updatedData["thumbnail"] = thumbnail;
    }

    const keys = Object.keys(formData);
    for (let i = 0; i < keys.length; i++) {
      if (formData[keys[i]][1]) {
        if (keys[i] === "tags") {
          updatedData[keys[i]] = formData[keys[i]][0].map(
            (value) => value.label
          );
        } else {
          updatedData[keys[i]] = formData[keys[i]][0];
        }
      }
    }

    try {
      const res = await axios.post(
        `/api/user/channel/video/update-video?videoId=${details.videoId}`,
        updatedData
      );
      if (res.data.success) {
        dispatch(_showNotifier({ msg: "Video updated successfully." }));
        await getVideoDetails();
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
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
          loading ? (
            <div className="w-full flex items-center justify-center min-h-screen">
              <CircularProgress className="text-white" />
            </div>
          ) : !details ? (
            <div className="w-full my-4 flex items-center justify-center">
              <Typography
                variant="body2"
                className="text-white font-black"
                component={"h5"}
              >
                No details found for such video.
              </Typography>
            </div>
          ) : (
            <div className="w-full">
              <Typography
                variant="h5"
                component={"h1"}
                className="text-white my-3 flex items-center flex-row gap-1"
              >
                Studio <ChevronRightIcon className="text-white font-black" />
                Update Video
              </Typography>
              <Divider className="w-full bg-gray-400 my-2" />
              <div className="w-full flex items-center justify-between md:justify-end my-3 gap-2">
                <Button
                  variant="contained"
                  className="bg-white rounded-full text-black border-none"
                  onClick={handleCancelChanges}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={
                    updating ||
                    !Object.values(formData).reduce(
                      (acc, item) => acc || item[1],
                      false
                    )
                  }
                  className="bg-blue-600 rounded-full border-none text-black disabled:text-[#00000096] disabled:bg-blue-300 disabled:cursor-wait"
                  onClick={updateVideoDetails}
                >
                  Save
                </Button>
              </div>
              <div className="w-full my-1 flex flex-col">
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className="text-blue-600 p-1 my-1"
                >
                  Stream URL
                </Typography>
                <div
                  className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 p-3 font-mono text-base text-white hover:ring-2 ring-yellow-500 w-full transition-all ease-in overflow-y-auto text-nowrap"
                  title="Uneditable"
                >
                  URL: {details.url ? <>{details.url}</> : <>xxxxxxxxx</>}
                </div>

                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className="text-blue-600 p-1 my-1"
                >
                  Video ID
                </Typography>
                <div
                  className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 p-3 font-mono text-base text-white hover:ring-2 ring-yellow-500 w-full transition-all ease-in overflow-y-auto text-nowrap"
                  title="uneditable"
                >
                  Video-ID:{" "}
                  {details.videoId ? <>{details.videoId}</> : <>xxxxxxxxx</>}
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
                  value={formData.title[0]}
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
                  value={formData.desc[0]}
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
                  value={formData.data[0]}
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
                      : formData.thumbnail[0]
                  }
                  alt="/"
                  width={100}
                  height={100}
                  className="aspect-video rounded-md my-3 bg-zinc-900 w-64 h-40 border-2 border-solid boder-white"
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
                  {formData.tags[0].map((data, idx) => (
                    <ListItem key={idx} className="p-1 m-1 w-fit">
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
                    placeholder="tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        handleTagAdd();
                      }
                    }}
                    className="bg-black border-2 border-solid border-yellow-400 rounded-md outline-none placeholder:text-yellow-100 py-2 px-3 font-mono text-base text-white focus:ring-2 hover:ring-2 ring-yellow-500 transition-all ease-in"
                  />
                </div>

                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className="text-blue-600 p-1 my-1"
                >
                  Set Visibility
                </Typography>
                <Select
                  id="video-visibility"
                  value={formData.visibility[0]}
                  onChange={(e) => {
                    let value = e.target.value;
                    let isEdited = value === details.visibility ? false : true;
                    setFormData((prev) => ({
                      ...prev,
                      visibility: [value, isEdited],
                    }));
                  }}
                  className="w-full my-4 text-white border-2 border-solid border-yellow-400 bg-black outline-none focus:ring-2 ring-yellow-400"
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
              </div>
            </div>
          )
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

export default VideoUpdates;
