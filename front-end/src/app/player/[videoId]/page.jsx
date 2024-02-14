import { Player } from "@/ui/ComponentExporter";

const page = ({ params }) => {
  return (
    <>
      <Player videoId={params.videoId} />
    </>
  );
};

export default page;
