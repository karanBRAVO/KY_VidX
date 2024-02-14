import VpnKeyIcon from "@mui/icons-material/VpnKey";

const NotAuthenticated = () => {
  return (
    <>
      <div className="bg-black text-white w-fit flex items-center flex-col">
        <h1 className="font-black text-5xl text-white">
          <VpnKeyIcon className="text-5xl text-green-600 mx-2" />
          <span className="text-white font-black">
            You are not authenticated
          </span>
        </h1>
        <p className="m-1 p-1 font-light text-sm text-zinc-400">
          Try logging in.
        </p>
      </div>
    </>
  );
};

export default NotAuthenticated;
