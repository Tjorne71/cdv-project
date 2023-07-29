import React from "react";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function ColorLegend({ colorFunction }) {
  const levels = ["A", "B", "C", "D", "E", "F", "G"];
  const sizeRanges = [
    [0, 0.25],
    [0.26, 9.9],
    [10.0, 99.9],
    [100.0, 299.9],
    [300.0, 999.9],
    [1000, 4999.9],
    [5000, Infinity],
  ];

  return (
    <div className="flex flex-row m-auto items-center h-2">
      {levels.map((level, index) => {
        const from = colorFunction(index + 2);
        const to = colorFunction(index + 3);
        const style = {
          background: `linear-gradient(to right, ${from}, ${to})`,
        };

        return <div key={level} style={style} className={`h-2 flex items-center justify-center w-6 text-base font-extrabold font-Montserrat text-center text-primary ${index == 0 ? "rounded-l-full" : ""} ${index == levels.length - 1 ? "rounded-r-full" : ""}`}></div>;
      })}
      <Tooltip
        title={
          <div className="flex flex-col items-center">
            <p>Fires are categorised based on their size in acres</p>
            <div className="flex flex-col m-auto items-center mx-auto">
              {levels.map((level, index) => {
                const sizeRange = sizeRanges[index]
                return (
                  <div key={level} className="flex flex-row w-full justify-start items-center">
                    <div style={{ backgroundColor: colorFunction(index + 2) }} className={`h-6 flex items-center justify-center w-6 mr-1 text-base font-extrabold font-Montserrat text-center text-primary`}>
                      {level}
                    </div>
                    <div className="font-Montserrat text-base ">
                      {sizeRange[0] + " < " + sizeRange[1]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      >
        <IconButton>
          <InfoIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
