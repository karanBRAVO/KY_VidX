"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Alert,
  Backdrop,
  Autocomplete,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter";
import { uploadUserImagesToFirebaseStorage } from "@/lib/_firebase/firebase.storage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { countries } from "./Locations";
import { useDispatch, useSelector } from "react-redux";

// icons
import ColorizeIcon from "@mui/icons-material/Colorize";
import { _setChannel } from "@/lib/_store/features/user/user";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";

const TextFieldStyles = {
  "& .MuiInput-input": {
    color: "white",
    borderRadius: "5px",
    padding: "10px",
  },
  "& .MuiInputBase-root": {
    color: "white",
    boxShadow: "0 0 6px yellow",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "yellow",
  },
};

const NewChannel = () => {
  const { data: session, status } = useSession();
  const userStateData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    channelName: "",
    tagLine: "",
    location: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [alertBoxState, setAlertBoxState] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    severity: "error",
    text: "This is a default alert message.",
  });

  // show the alert back drop
  const showAlertBox = () => {
    setAlertBoxState(true);
  };

  // hide the alert box
  const hideAlertBox = () => {
    setAlertBoxState(false);
  };

  // input tag reference
  const bannerInputRef = useRef(null);

  // create new channel
  const handleCreateNewChannel = async () => {
    if (loading) return;

    setLoading(true);

    // uploading the banner
    const bgImgUrl = await handleBannerUpload();

    try {
      const res = await axios.post(`/api/user/channel/create-channel`, {
        ...formData,
        bgImgUrl,
      });
      if (res.data.success) {
        setAlertMessage((prev) => ({
          ...prev,
          severity: "success",
          text: "Channel Created successfully",
        }));
        dispatch(_setChannel({ hasChannel: true }));
        dispatch(
          _showNotifier({
            msg: "Channel Created successfully.",
          })
        );
        router.replace(`/you/profile/your-channel`);
      } else {
        setAlertMessage((prev) => ({
          ...prev,
          severity: "error",
          text: res.data.error,
        }));
      }
      showAlertBox();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // location change
  const handleLocationInputChange = (e, value) => {
    if (value) {
      setFormData((prev) => ({ ...prev, location: value.label }));
    } else {
      setFormData((prev) => ({ ...prev, location: "" }));
    }
  };

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // choose the new banner
  const handleBannerImageChange = (e) => {
    setUserImage(e.target.files[0]);
  };

  // upload the banner to the firebase
  const handleBannerUpload = async () => {
    if (formData.bgImgUrl || !userImage || !userStateData._id) return;

    try {
      const userID = userStateData._id;
      const res = await uploadUserImagesToFirebaseStorage(
        userID,
        "channel",
        userImage
      );
      return res[1];
    } catch (e) {
      console.error(e);
      return "";
    }
  };

  // show the images in the local system (EXPLORER)
  const handleChooseAvatar = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click();
    }
  };

  // return user to channel page
  useEffect(() => {
    if (userStateData.hasChannel) {
      router.replace("/you/profile/your-channel");
    }
  }, [userStateData.hasChannel, router]);

  // check if has channel
  if (userStateData.hasChannel) {
    return null;
  }

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
            <Backdrop
              sx={{ color: "#000" }}
              open={alertBoxState}
              onClick={hideAlertBox}
            >
              <Alert
                sx={{ color: "#000", background: "#8a8301" }}
                severity={alertMessage.severity}
              >
                {alertMessage.text}
              </Alert>
            </Backdrop>
            <Typography
              variant="h4"
              component={"h1"}
              className="text-white my-3 p-1"
            >
              Create New Channel
            </Typography>

            <Divider className="bg-white" />

            <div className="flex flex-col items-start gap-3">
              <Typography
                variant="subtitle1"
                component={"h3"}
                className="text-blue-600 p-1 my-1"
              >
                Enter Channel Name
              </Typography>
              <TextField
                name="channelName"
                id="channel-name"
                variant="outlined"
                type="text"
                placeholder="🤩__KY__🤩"
                value={formData.channelName}
                onChange={handleInputChange}
                sx={TextFieldStyles}
              />
              <Typography
                variant="subtitle1"
                component={"h3"}
                className="text-blue-600 p-1 my-1"
              >
                Enter Tag-Line
              </Typography>
              <TextField
                name="tagLine"
                id="tag-line"
                variant="outlined"
                type="text"
                placeholder="KY_the-learner🪢"
                sx={TextFieldStyles}
                value={formData.tagLine}
                onChange={handleInputChange}
              />
              <Typography
                variant="subtitle1"
                component={"h3"}
                className="text-blue-600 p-1 my-1"
              >
                Enter Date of Birth
              </Typography>
              <TextField
                name="dob"
                id="user-dob"
                type="date"
                variant="outlined"
                sx={TextFieldStyles}
                value={formData.dob}
                onChange={handleInputChange}
              />
              <Typography
                variant="subtitle1"
                component={"h3"}
                className="text-blue-600 p-1 my-1"
              >
                Enter your Location
              </Typography>
              <Autocomplete
                id="country-select"
                sx={{ width: 300, backgroundColor: "black", color: "white" }}
                options={countries}
                autoHighlight
                onChange={handleLocationInputChange}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{
                      "& > img": { mr: 2, flexShrink: 0 },
                      color: "blue",
                      backgroundColor: "black",
                    }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="location"
                    id="user-location"
                    type="text"
                    variant="outlined"
                    sx={TextFieldStyles}
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Country"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
              <Typography
                variant="subtitle1"
                component={"h3"}
                className="text-blue-600 p-1 my-1"
              >
                Choose your Banner
              </Typography>
              <div className="flex flex-row items-center gap-2 flex-wrap">
                <Button
                  onClick={handleChooseAvatar}
                  className="text-black capitalize bg-white mx-1"
                  variant="contained"
                  endIcon={<ColorizeIcon className="text-2xl text-black" />}
                >
                  Choose
                </Button>
                {userImage !== null && (
                  <img
                    src={userImage && URL.createObjectURL(userImage)}
                    alt="KY"
                    draggable={false}
                    className="mx-2 cursor-pointer w-72 h-44 aspect-video border-2 border-solid border-white rounded-md shadow-md shadow-white"
                  />
                )}
                {!loading && (
                  <input
                    className="hidden"
                    ref={bannerInputRef}
                    type="file"
                    id="user-image"
                    multiple={false}
                    accept="image/*"
                    onChange={handleBannerImageChange}
                  />
                )}
              </div>
              <Button
                className="bg-yellow-600 my-2 mx-3"
                variant="contained"
                onClick={handleCreateNewChannel}
                disabled={loading}
              >
                {loading ? <>Creating...</> : <>Create</>}
              </Button>
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
    </>
  );
};

export default NewChannel;
