"use client";

import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";

const Recommendationbar = ({
  items = [{ name: "Hello World!" }],
  setCurrentRecommendationState,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentRecommendationState(String(event.target.innerText).toLowerCase());
  };

  return (
    <>
      <Box
        component={"div"}
        sx={{
          backgroundColor: "transparent",
          color: "white",
          marginTop: "3px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            border: "1px solid gray",
            borderRadius: "5px",
          }}
        >
          {items.map((item, index) => (
            <Tab
              key={index}
              label={item.name}
              sx={{
                color: "white",
                ":hover": {
                  backgroundColor: "#bdbdbd40",
                },
                textTransform: "capitalize",
              }}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default Recommendationbar;
