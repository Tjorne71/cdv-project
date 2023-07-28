"use client";
import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";

export default function CustomSlider({ label1, label2, onChangeCommitted, min, max, width, setIsSentenceVisible, value, showLabel }) {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  function onSliderChange(event) {
    const value = event.target.value;
    setSliderValue(value);
    setIsSentenceVisible(false);
  }

  return (
    <div style={{ width: width + "px" }} className={`flex flex-col`}>
      <div className="font-Montserrat text-base flex flex-row">
        <h1 className="">{label1}</h1>
        <h1 className="font-bold ml-2">{label2}</h1>
      </div>

      <Slider
        size="small"
        getAriaLabel={() => "Slider"}
        onChange={onSliderChange}
        onChangeCommitted={() => {
          onChangeCommitted(sliderValue);
        }}
        defaultValue={sliderValue}
        value={sliderValue}
        min={min}
        max={max}
        valueLabelDisplay={showLabel ? "auto" : "off"}
        marks={true}
        sx={{
          color: "#F9F871",
        }}
      />
    </div>
  );
}
