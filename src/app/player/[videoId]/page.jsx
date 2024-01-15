const page = ({ params }) => {
  return (
    <>
      <div className="text-white mt-[130px]">
        Playing Video: {params.videoId}
      </div>
    </>
  );
};

export default page;
