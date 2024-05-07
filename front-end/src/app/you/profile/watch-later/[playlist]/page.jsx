import React from "react";
import { WatchLaterVideos } from "@/ui/ComponentExporter";

const page = ({ params }) => {
  const { playlist } = params;

  return (
    <>
      <WatchLaterVideos playlist={playlist} />
    </>
  );
};

export default page;
