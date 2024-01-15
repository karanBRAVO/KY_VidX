import { Container } from "@mui/material";

const Subscriptions = () => {
  const subscribedTo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <>
      <Container className="min-h-screen mt-[130px]" maxWidth={false}>
        <h1 className="font-black text-white capitalize m-1 tracking-tight leading-1">
          Subscriptions
        </h1>
        <div className="flex flex-col items-start text-white w-full">
          <div className="flex flex-row items-center overflow-auto w-full px-3 py-5 my-2 border-2 border-solid border-black border-b-white">
            {subscribedTo.map((item, index) => (
              <div
                key={index}
                className="bg-[#ffffff30] mx-3 rounded-full p-2 cursor-pointer flex items-center justify-center"
              >
                <img
                  src="/defaultThumbnail.jpg"
                  alt="pic"
                  className="border-4 rounded-full border-solid border-black w-20 h-20 md:w-32 md:h-32"
                />
              </div>
            ))}
          </div>
          <div className="my-3 p-3">
            <h2 className="text-slate-300 hover:underline cursor-pointer">
              Karan Yadav
            </h2>
            <div className="m-3">Videos</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Subscriptions;
