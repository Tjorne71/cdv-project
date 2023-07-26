"use client";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";

export default function CustomSlider({ label, defaultValue, onChangeCommitted, min, max, width, setIsSentenceVisible}) {
  const [sliderValue, setSliderValue] = useState(defaultValue)

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
        onChangeCommitted={() => onChangeCommitted(sliderValue)} 
        defaultValue={defaultValue} 
        min={min} 
        max={max}
        marks={true}
        sx={{
          color: '#F9F871',
        }}
      />
    </div>
  );
}
