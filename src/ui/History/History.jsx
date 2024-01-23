"use client";

import CommonVideoBox from "../CommonVideoBox";
import { _HISTORY_ } from "./fakeData";
import { useSession } from "next-auth/react";
import { NotAuthenticated, Wait } from "../ComponentExporter.js";

const History = () => {
  const { data: session, status } = useSession();

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
                We will use this for your recommendation/suggestions
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
