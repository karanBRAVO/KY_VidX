"use client";

import CommonVideoBox from "../CommonVideoBox";
import { _HISTORY_ } from "./fakeData";

const History = () => {
  return (
    <>
      <section className="mt-[130px] text-white min-h-screen bg-black">
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
      </section>
    </>
  );
};

export default History;
