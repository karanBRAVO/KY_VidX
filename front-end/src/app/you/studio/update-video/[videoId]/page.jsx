import React from "react";
import { VideoUpdates } from "@/ui/ComponentExporter";

const UpdateVideo = ({ params }) => {
  return <VideoUpdates videoId={params.videoId} />;
};

export default UpdateVideo;
