"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const OtherHomeTab = ({ userId }) => {
  const [fetching, setFetching] = useState(false);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    getUserHomePage();
  }, []);

  const getUserHomePage = async () => {
    if (!userId) return;
    setFetching(true);

    try {
      const res = await axios.get(
        `/api/user/channel/tabs/home/get-content?userId=${userId}`
      );
      if (res.data.success) {
        setMarkdown((prev) => res.data.pageContent);
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
      <div className="w-full">
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          className="py-5 px-3 border-2 border-solid border-white rounded-sm w-full bg-gray-800"
        >
          {fetching
            ? "# ⏳ Wait !"
            : !markdown
            ? "# No Home page found"
            : markdown}
        </Markdown>
      </div>
    </>
  );
};

export default OtherHomeTab;
