import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#F9F871",
            },
            "&:hover fieldset": {
              borderColor: "#F9F871",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#F9F871",
            },
          },
          "&.Mui-focused": {
            "& label": {
              color: "#F9F871",
            },
            "& .MuiOutlinedInput-input": {
              color: "#F9F871",
            },
          },
        },
      },
    },
  },
});

export default function SearchField({ values, onChange }) {
  const handleValueSelect = (event, newValue) => {
    if (newValue) {
      const lowercaseValues = values.map((value) => value.toLowerCase());
      const lowercaseNewValue = newValue.toLowerCase();

      if (lowercaseValues.includes(lowercaseNewValue)) {
        const searchresult = values.filter((value) => value.toLowerCase() == newValue.toLowerCase());
        onChange(searchresult[0]);
      } else {
        alert('No matching county found.');
      }
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        selectOnFocus
        clearOnBlur
        groupBy={(option) => option.charAt(0)}
        options={values.sort()}
        onChange={handleValueSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Select A County"
            InputProps={{
              ...params.InputProps,
              type: "search",
              style: {
                color: "white",
              },
            }}
            InputLabelProps={{
              ...params.InputLabelProps,
              style: {
                color: "white",
              },
            }}
          />
        )}
      />
    </ThemeProvider>
  );
}
