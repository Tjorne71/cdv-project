"use client";
import React, { useState, useEffect } from "react";
import CustomSwitch from "@/components/customSwitch";


export default function CustomSwitchGroup({ state, onChange, textLeft, textRight }) {
  const [checked, setChecked] = useState(state);

  useEffect(() => {
    setChecked(state);
  }, [state]);
  return (
    <div className="flex justify-center items-center w-full">
      <p
        onClick={() => {
          if (checked) {
            onChange();
          }
        }}
        className={`font-Montserrat text-base w-full text-right ${checked ? "text-white opacity-70 hover:font-bold cursor-pointer" : "text-secondary cursor-not-allowed"}`}
      >
        {textLeft}
      </p>
      <CustomSwitch
        state={state}
        onChange={() => {
          onChange();
        }}
      />
      <p
        onClick={() => {
          if (!checked) {
            onChange();
          }
        }}
        className={`font-Montserrat text-base w-full text-left ${!checked ? "text-white opacity-70 hover:font-bold cursor-pointer" : "text-secondary cursor-not-allowed"}`}
      >
        {textRight}
      </p>
    </div>
  );
}
