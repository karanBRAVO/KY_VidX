import { Container, Box, Avatar, Typography } from "@mui/material";

const Subscriptions = () => {
  const subscribedTo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <>
      <Container className="min-h-screen mt-[130px]" maxWidth={false}>
        <Typography
          variant="h2"
          component={"h1"}
          className="font-black text-white capitalize m-1 tracking-tight leading-none"
        >
          Subscriptions
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          color={"white"}
          width={"100%"}
        >
          <div className="flex flex-row items-center overflow-auto w-full px-3 py-5 my-2 border-2 border-solid border-black border-b-white">
            {subscribedTo.map((item, index) => (
              <div className="bg-[#ffffff30] mx-3 rounded-full p-2 cursor-pointer">
                <Avatar
                  key={index}
                  src="/defaultThumbnail.jpg"
                  className="border-4 border-solid border-black w-20 h-20 md:w-32 md:h-32"
                />
              </div>
            ))}
          </div>
          <Box marginY={"5px"} padding={"6px"}>
            <Typography
              variant="h4"
              component={"h2"}
              className="text-slate-300 hover:underline cursor-pointer"
            >
              Karan Yadav
            </Typography>
            <Box margin={"3px"}>Videos</Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Subscriptions;
