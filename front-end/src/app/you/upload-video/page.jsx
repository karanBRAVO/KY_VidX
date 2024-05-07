import React from "react";
import { VideoUploader } from "@/ui/ComponentExporter";

const UploadVideo = ({ params }) => {
  return (
    <>
      <VideoUploader videoId={params.videoId} />
    </>
  );
};

export default UploadVideo;
