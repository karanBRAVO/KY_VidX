"use client";

import { Paper, Dialog, Box, Typography, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

const providers = [
  { name: "github", iconname: GitHubIcon },
  { name: "google", iconname: GoogleIcon },
];

const OAuth = ({ isOpen, handleClose }) => {
  const handleClick = async (name = "") => {
    if (
      confirm(
        "Make sure you have trust in us and read the terms and conditions."
      )
    ) {
      await signIn(name.toLowerCase(), { redirect: true, callbackUrl: "/" });
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={false}
        className="flex items-center justify-center"
        sx={{
          ".MuiDialog-paper": {
            bgcolor: "#0000",
            width: "100%",
          },
        }}
      >
        <Paper
          component="section"
          className={
            "flex flex-col items-start text-white border-[1px] border-solid border-zinc-400 rounded-md bg-zinc-900 w-fit p-2"
          }
        >
          <Typography
            variant="h6"
            component={"h1"}
            className="flex flex-row items-center gap-1 text-blue-600"
          >
            Sign In to{" "}
            <Typography
              variant="caption"
              component={"span"}
              className="text-xl flex flex-row items-center text-white"
            >
              Vid{" "}
              <Typography
                variant="caption"
                component={"span"}
                className="text-4xl leading-tight tracking-tight text-white font-black"
              >
                X
              </Typography>
            </Typography>
          </Typography>
          <Box
            padding={"5px"}
            margin={"2px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            {providers.map((provider, index) => (
              <Button
                key={index}
                className="flex flex-row m-1 items-center justify-evenly gap-2 bg-black"
                onClick={() => {
                  handleClick(provider.name);
                }}
              >
                <provider.iconname className="text-white font-black text-5xl" />
                <Typography
                  variant="button"
                  component={"span"}
                  className="text-white text-xl"
                >
                  Continue with {`${provider.name}`}
                </Typography>
              </Button>
            ))}
          </Box>
        </Paper>
      </Dialog>
    </>
  );
};

export default OAuth;
