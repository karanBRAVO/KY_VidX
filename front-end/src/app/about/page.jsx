import React from "react";

const page = () => {
  return (
    <>
      <div className="mt-[140px] w-full flex flex-col items-center gap-3 text-white min-h-screen">
        <h1 className="text-white font-black font-sans capitalize w-full text-wrap flex items-center justify-center flex-wrap">
          👨‍💻 My Portfolio 👨‍💻
        </h1>
        <div className="w-full h-[1px] bg-[gray]"></div>
        <iframe
          src={`https://my-portfolio-my-blog.vercel.app/`}
          className="w-full min-h-screen"
          frameborder="0"
        ></iframe>
      </div>
    </>
  );
};

export default page;
