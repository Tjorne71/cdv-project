"use client";
import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            "& .MuiSwitch-thumb": {
              color: "#F9F871",
            },
            "& .MuiSwitch-track": {
              backgroundColor: "unset", // Remove the background color for checked state
              opacity: 1, // Set opacity to 1 to remove any overlay color
            },
          },
        },
        thumb: {
          color: "#F9F871",
        },
        track: {
          backgroundColor: "#F9F871",
        },
      },
    },
  },
});

export default function CustomSwitch({state, onChange}) {
  return (
    <ThemeProvider theme={customTheme}>
        <Switch
          defaultValue={state}
          checked={state}
          onChange={() => {
            onChange();
          }}
        />
    </ThemeProvider>
  )
}
