"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"

export default function County({ d, county, color, countyClicked, fireSize, isFocus}) {
  const [hover, setHover] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);


  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <>
      <motion.path
        stroke={`${isFocus ? "#F9F871" : "black"}`}
        strokeWidth={`${isFocus ? '2' : `${hover ? "1" : "0.1"}`}`}
        fill={currentColor}
        d={d}
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onClick={() => {
          countyClicked(county, fireSize);
        }}
        animate={{ 
          fill: currentColor,
        }}
        transition={{
          duration: 0.2,
        }}
      />
    </>
  );
}
