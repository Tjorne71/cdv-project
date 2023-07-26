"use client";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";

export default function CustomSlider({ label, defaultValue, onChangeCommitted, min, max, width}) {
  const [sliderValue, setSliderValue] = useState(defaultValue)

  function onSliderChange(event) {
    const value = event.target.value;
    setSliderValue(value)
  }
  return (
    <div style={{width:width+'px'}} className={`p-2 flex flex-col`}>
      <h1 className="font-Montserrat">{label}</h1>
      <Slider 
        size="small" 
        getAriaLabel={() => "Slider"} 
        onChange={onSliderChange} 
        onChangeCommitted={() => onChangeCommitted(sliderValue)} 
        valueLabelDisplay="auto" 
        defaultValue={defaultValue} 
        min={min} 
        max={max}
        sx={{
          color: '#F9F871',
        }}
      />
    </div>
  );
}
