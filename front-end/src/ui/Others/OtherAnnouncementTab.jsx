"use client";

import React, { useEffect, useState } from "react";
import { getLocaleTime } from "@/lib/utils/DateConvertor";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

const OtherAnnouncementTab = ({ userId }) => {
  const [fetching, setFetching] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements();
  }, []);

  // get all the announcements
  const getAnnouncements = async () => {
    if (!userId || fetching) return;

    setFetching(true);

    try {
      const res = await axios.get(
        `/api/user/others/get-announcements?userId=${userId}`
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

export default OtherAnnouncementTab;
