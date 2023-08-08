import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { getStateFromCountyId } from "@/util/stateFipsToName";

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
  const listOfCounties = values.filter((val) => getStateFromCountyId(val.id) != undefined);

  function handleValueSelect(_, newValue) {
    if (newValue) {
      onChange(newValue.value);
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Autocomplete
        autoHighlight
        id="free-solo-2-demo"
        disableClearable
        selectOnFocus
        clearOnBlur
        options={listOfCounties
          .sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          })
          .map((option) => ({
            label: `${option.properties.name} ${option.id}, ${getStateFromCountyId(option.id)}`,
            value: option,
            group: getStateFromCountyId(option.id),
          }))}
        groupBy={(option) => option.group}
        onChange={handleValueSelect}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option.label}
          </Box>
        )}
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
