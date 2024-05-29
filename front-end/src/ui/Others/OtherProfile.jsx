"use client";

import React from "react";
import { Container, Typography } from "@mui/material";

const OtherProfile = ({ userId }) => {
  return (
    <>
      <Container className="min-h-screen mt-[130px]" maxWidth={false}>
        <Typography
          variant="caption"
          component={"h4"}
          className="text-gray-400"
        >
          User ID: {userId}
        </Typography>
      </Container>
    </>
  );
};

export default OtherProfile;
