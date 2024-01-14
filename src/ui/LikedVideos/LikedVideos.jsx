import { Container, Button, Typography } from "@mui/material";

const LikedVideos = () => {
  return (
    <>
      <Container
        className="min-h-screen mt-[130px] rounded-md"
        maxWidth={false}
      >
        <div className="flex flex-col md:flex-row w-full h-screen">
          <Typography
            variant="h3"
            component={"h1"}
            className="text-white tracking-tight leading-none font-black md:hidden my-2"
          >
            Liked Videos
          </Typography>
          <div className="md:w-[30%] hidden md:flex flex-col rounded-lg bg-gradient-to-b from-slate-800 via-slate-600 to-slate-200">
            <div className="w-full p-3">
              <img
                src="/defaultThumbnail.jpg"
                alt="image"
                className="w-full rounded-lg  shadow-md shadow-slate-400"
              />
            </div>
            <Typography
              variant="h3"
              component={"h1"}
              className="font-bold text-white text-center m-2"
            >
              Liked Videos
            </Typography>
            <Button
              variant={"contained"}
              className="rounded-full bg-white text-black m-3"
            >
              Play All
            </Button>
          </div>
          <div className={"md:w-[70%] text-white p-2"}>
            <div>Videos</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LikedVideos;
