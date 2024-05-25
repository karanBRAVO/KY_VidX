"use clinet";

import {
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";
import { getLocaleTime } from "@/lib/utils/DateConvertor";

const AnnouncementTab = () => {
  const dispatch = useDispatch();

  // states
  const [formData, setFormData] = useState({
    title: "",
    announcement: "",
  });
  const [loading, setLoading] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  // toggle form visibility
  const handleFormVisibility = () => {
    setFormVisibility((prev) => !prev);
  };

  // contolled inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // create new announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.announcement) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `/api/user/channel/tabs/announcements/create`,
        { title: formData.title, announcement: formData.announcement }
      );
      if (res.data.success) {
        dispatch(_showNotifier({ msg: "Announcement Posted." }));
        getAnnouncements();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  // get all the announcements
  const getAnnouncements = async () => {
    if (fetching) return;

    setFetching(true);

    try {
      const res = await axios.get(
        `/api/user/channel/tabs/announcements/get-all`
      );
      if (res.data.success) {
        setAnnouncements((prev) => [...res.data.details]);
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        className="text-black bg-white rounded-full my-3"
        type="button"
        onClick={handleFormVisibility}
      >
        Toggle Announcement Form
      </Button>
      <form
        onSubmit={handleSubmit}
        className={`${
          formVisibility ? "" : "hidden"
        } my-4 flex flex-col gap-5 w-full pl-6 md:pl-10`}
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          minLength={5}
          maxLength={50}
          required
          value={formData.title}
          onChange={handleInputChange}
          spellCheck
          autoFocus
          autoComplete="off"
          className="w-full outline-none focus:ring-2 focus:ring-green-500 rounded-lg px-5 py-2 text-white bg-green-950 font-sans text-base"
        />
        <textarea
          name="announcement"
          id="announcement"
          placeholder="Enter your announcement here..."
          required
          spellCheck
          autoComplete="off"
          value={formData.announcement}
          onChange={handleInputChange}
          className="w-full outline-none focus:ring-2 focus:ring-green-500 rounded-lg px-5 py-2 text-white bg-green-950 font-sans text-base resize-y min-h-80"
        ></textarea>
        <Button
          variant="outlined"
          type="submit"
          disabled={loading}
          className="text-green-500 disabled:cursor-wait border-2 border-solid border-green-500 rounded-full max-w-md mx-auto w-full"
        >
          {loading ? <>Pushing...</> : <>Push</>}
        </Button>
      </form>
      <div className="my-3 py-2 min-h-52">
        {fetching ? (
          <div className="w-full my-2 flex items-center justify-center">
            <CircularProgress variant="indeterminate" />
          </div>
        ) : announcements.length === 0 ? (
          <div className="w-full my-2 flex items-center justify-center">
            <Typography
              variant="subtitle1"
              component={"span"}
              className="capitalize text-green-500"
            >
              👨‍💻 No announcements yet.
            </Typography>
          </div>
        ) : (
          announcements.map((item, i) => (
            <Accordion
              key={i}
              className="bg-slate-800 text-white"
              defaultExpanded
            >
              <AccordionSummary
                expandIcon={
                  <ArrowDropDownIcon className="text-white font-black text-xl" />
                }
              >
                <Typography
                  variant="h5"
                  component={"h1"}
                  className="text-white flex flex-col"
                >
                  {item.title}
                  <Typography
                    variant="caption"
                    component={"span"}
                    className="text-gray-400"
                  >
                    {getLocaleTime(item.date)}
                  </Typography>
                </Typography>
              </AccordionSummary>
              <Divider className="bg-black" />
              <AccordionDetails>
                {item.announcement.split("\n").map((line, idx) => (
                  <>
                    <Typography key={idx} component={"p"}>
                      {line}
                    </Typography>
                    {line === "" && <br />}
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </div>
    </>
  );
};

export default AnnouncementTab;
