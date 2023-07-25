"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"

export default function County({ d, county, color, countyClicked}) {
  const [hover, setHover] = useState(false);
  return (
    <>
      <motion.path
        stroke="black"
        strokeWidth={`${hover ? "1" : "0.1"}`}
        fill={color}
        d={d}
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onClick={() => {
          countyClicked(county);
        }}
      />
    </>
  );
}
