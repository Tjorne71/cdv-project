"use client";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";

export default function CustomSlider({ label, defaultValue, onChangeCommitted, min, max}) {
  const [sliderValue, setSliderValue] = useState(defaultValue)

  function onSliderChange(event) {
    const value = event.target.value;
    setSliderValue(value)
  }
  return (
    <div className="w-72 p-8 flex flex-row space-y-4">
      <h1 className="text-white">{label}</h1>
      <Slider size="small" getAriaLabel={() => "Slider"} onChange={onSliderChange} onChangeCommitted={() => onChangeCommitted(sliderValue)} valueLabelDisplay="auto" defaultValue={defaultValue} min={min} max={max} />
    </div>
  );
}
