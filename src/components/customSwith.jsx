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


export default function CustomSwitch({ state, onChange, textLeft, textRight }) {
  const [checked, setChecked] = useState(state);

  useEffect(() => {
    setChecked(state);
  }, [state]);
  return (
    <ThemeProvider theme={customTheme}>
      <div className="flex justify-center items-center w-full">
        <p className={`font-Montserrat text-base w-full text-right ${checked ? "text-white opacity-70" : 'text-secondary'}`}>{textLeft}</p>
        <Switch
          checked={state}
          onChange={() => {
            onChange();
          }}
        />
        <p className={`font-Montserrat text-base w-full text-left ${!checked ? "text-white opacity-70" : 'text-secondary'}`}>{textRight}</p>
      </div>
    </ThemeProvider>
  );
}
