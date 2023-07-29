import React from "react";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function ColorLegend({ colorFunction }) {
  const levels = ["A", "B", "C", "D", "E", "F", "G"];

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
      <Tooltip title={<span className="text-base">explain</span>}>
        <IconButton>
          <InfoIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
