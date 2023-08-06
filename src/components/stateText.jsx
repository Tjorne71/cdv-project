import React from "react";

export default function StateText({x, y, stateText}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="black"
      fontSize="11px"
      stroke="white"
      strokeWidth={2}
      strokeOpacity={1}
      className="font-Montserrat"
      paintOrder="stroke"
      style={{ pointerEvents: "none" }}
    >
      {stateText}
    </text>
  );
}
