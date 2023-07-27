"use client";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";

export default function CustomSlider({ label, onChangeCommitted, min, max, width, setIsSentenceVisible, value, showLabel}) {
  const [sliderValue, setSliderValue] = useState(value)

  function onSliderChange(event) {
    const value = event.target.value;
    setSliderValue(value)
    setIsSentenceVisible(false)
  }
  return (
    <div style={{width:width+'px'}} className={`flex flex-col`}>
      <h1 className="font-Montserrat text-base">{label}</h1>
      <Slider 
        size="small" 
        getAriaLabel={() => "Slider"} 
        onChange={onSliderChange} 
        onChangeCommitted={() => {onChangeCommitted(sliderValue)}} 
        defaultValue={value} 
        value={value}
        min={min} 
        max={max}
        valueLabelDisplay={showLabel ? "auto" : "off"}
        marks={true}
        sx={{
          color: '#F9F871',
        }}
      />
    </div>
  );
}
