"use client";

import React, { useState } from "react";
import axios from "axios";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter";
import { useSession } from "next-auth/react";
import CommonVideoBox from "../CommonVideoBox";

import { _HISTORY_ } from "./fakeData";

const History = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`/api/user/`);
      console.log(res.data);
      if (res.data.success) {
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="mt-[130px] text-white min-h-screen bg-black">
        {status === "loading" ? (
          <>
            <div className="w-full flex items-center justify-center">
              <Wait />
            </div>
          </>
        ) : status === "authenticated" ? (
          <div>
            <h1 className="m-1 text-6xl capitalize leading-1 tracking-wide font-black text-white flex flex-col items-start justify-between">
              History
              <span className="text-xs sm:text-sm text-zinc-400 font-light p-[1px] tracking-tight leading-1 m-1 lowercase">
                I will use this for your recommendation/suggestions
              </span>
            </h1>
            <div className="w-full gap-3 flex flex-col items-start">
              {_HISTORY_.map((item, index) => (
                <CommonVideoBox
                  key={index}
                  uid={index + 1}
                  uploader={item.uploader}
                  thumbnail={`/${item.thumbnail}`}
                  name={item.name}
                  desc={item.desc}
                  duration={item.duration}
                  views={item.views}
                  lastWatchTime={item.lastWatchTime}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-center">
              <NotAuthenticated />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default History;
