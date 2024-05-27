"use client";

import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { _showNotifier } from "@/lib/_store/features/notifier/notifierSlice";

const HomeTab = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // states
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [markdown, setMarkdown] = useState("# 👋 Welcome to VidX.");

  // refs
  const editableRef = useRef(null);

  // controll input
  const handleChange = (e) => {
    setMarkdown(e.target.innerText);
  };

  useEffect(() => {
    handleGetHome();
  }, []);

  // get the home page
  const handleGetHome = async () => {
    if (fetching) return;

    setFetching(true);

    try {
      const res = await axios.get(
        `/api/user/channel/tabs/home/get-content?userId=${userState._id}`
      );
      if (res.data.success) {
        setMarkdown((prev) => res.data.pageContent);
        editableRef.current.innerText = res.data.pageContent;
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  // save the home page
  const handleSave = async () => {
    if (!markdown || saving) return;

    setSaving(true);

    try {
      const res = await axios.post(`/api/user/channel/tabs/home/save-content`, {
        pageContent: markdown,
      });
      if (res.data.success) {
        dispatch(_showNotifier({ msg: "Home page saved." }));
        await handleGetHome();
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        className="w-full gap-3 flex flex-col lg:flex-row items-start my-5"
        id="channelHomeTabDiv"
      >
        <div className="w-full flex flex-col gap-4 items-center">
          <div
            ref={editableRef}
            contentEditable
            id="markdown-area"
            onInput={handleChange}
            autoFocus={true}
            spellCheck={false}
            title="Style your home page..."
            className="text-white outline-none bg-sky-900 focus:ring-2 focus:ring-sky-600 rounded-md px-4 py-5 font-mono text-base w-full min-h-60 h-fit my-3"
          ></div>
          <Button
            variant="outlined"
            disabled={saving || fetching}
            className="text-white border-2 border-solid border-white rounded-full disabled:cursor-wait disabled:text-gray-500"
            onClick={handleSave}
            type="button"
          >
            Save
          </Button>
        </div>
        <div className="w-full">
          <Markdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            className="py-5 px-3 border-2 border-solid border-white rounded-sm w-full bg-gray-800"
          >
            {fetching ? "# ⏳ Wait !" : markdown}
          </Markdown>
        </div>
      </div>
    </>
  );
};

export default HomeTab;
