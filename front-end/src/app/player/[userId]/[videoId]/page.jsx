import { Player } from "@/ui/ComponentExporter";

const page = ({ params }) => {
  const { userId, videoId } = params;

  return (
    <>
      <Player userId={userId} videoId={videoId} />
    </>
  );
};

export default page;
