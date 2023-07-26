"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function YearLine({ d, year, color, inFocus }) {
  const [hover, setHover] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ 
          pathLength: 1,
        }}
        transition={{ duration: 1.5, type: "spring" }}
        d={d}
        fill="none"
        stroke={"white"}
        strokeWidth={`${inFocus ? "8" : "0.0"}`}
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, stroke: currentColor, }}
        transition={{ duration: 1.5, type: "spring" }}
        d={d}
        fill="none"
        stroke={currentColor}
        strokeWidth={`${hover || inFocus ? "4" : "0.5"}`}
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
      />

    </>
  );
}
