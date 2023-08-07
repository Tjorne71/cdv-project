"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"

export default function County({ d, county, color, countyClicked, fireSize}) {
  const [hover, setHover] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);


  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <>
      <motion.path
        stroke="black"
        strokeWidth={`${hover ? "1" : "0.1"}`}
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
