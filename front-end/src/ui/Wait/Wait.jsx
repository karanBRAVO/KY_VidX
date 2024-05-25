import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const Wait = () => {
  return (
    <>
      <div className="bg-black w-fit p-1 m-1 flex items-center justify-center flex-col">
        <h1 className="font-black text-6xl text-white">
          <HourglassBottomIcon className="text-red-600 animate-spin text-5xl mx-2" />
          <span className="text-white">Wait</span>
        </h1>
        <p className="p-1 m-1 text-sm text-zinc-400 font-light text-center w-full">
          Loading your login status
        </p>
      </div>
    </>
  );
};

export default Wait;
