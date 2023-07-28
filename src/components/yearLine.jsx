"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function YearLine({ d, year, opacity, inFocus, onLineClick, clickable}) {
  const [hover, setHover] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };
  
  return (
    <svg onMouseMove={handleMouseMove}>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ 
          pathLength: 1,
        }}
        
        transition={{ duration: 1.5, type: "spring" }}
        d={d}
        fill="none"
        stroke={"white"}
        strokeWidth={`${inFocus ? 2 : 0.0}`}
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, stroke: "white", }}
        transition={{ duration: 1.5, type: "spring" }}
        d={d}
        fill="none"
        stroke="white"
        opacity={`${hover && clickable || inFocus ? 3 : opacity}`}
        strokeWidth={2}
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onClick={() => {onLineClick(year)}}
        className={`${clickable ? 'cursor-pointer' : ''}`}
      />
      {/* Tooltip */}
      {hover && clickable && (
        <g transform={`translate(${tooltipPosition.x},${tooltipPosition.y})`}>
          <rect x="5" y="-20" width="40" height="20" fill="black" opacity="0.7" rx="5" />
          <text x="10" y="-5" fill="white" fontSize="12px">
            {year}
          </text>
        </g>
      )}

    </svg>
  );
}
