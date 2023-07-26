"use client";
import React, { useState, useEffect } from "react";
import CustomSlider from "@/components/slider";
import CustomMap from "@/components/customMap";

export default function Visual() {
  const [focusMonth, setFocusMonth] = useState("07");
  const [focusYear, setFocusYear] = useState("2010");

  function onMonthSliderCommit(value) {
    if (value < 10) {
      setFocusMonth("0" + value);
    } else {
      setFocusMonth(value);
    }
  }

  function onYearSlideCommit(value) {
    setFocusYear(value + "");
  }
  return (
    <div className="h-[500px] w-4/5 font-Montserrat text-white flex flex-row">
      <div className="h-full flex flex-col justify-between w-2/3 mr-2">
        <div className="text-2xl p-4 bg-[#3D5E70] h-20 w-full mb-2">
          <h1>Fire In The Us</h1>
        </div>
        <div className="text-2xl p-4 bg-[#3D5E70] h-full w-full">
          <CustomMap focusMonth={focusMonth} focusYear={focusYear}/>
        </div>
      </div>
      <div className="text-2xl p-4 bg-[#3D5E70] h-full w-1/3">
        <CustomSlider label={"Year"} defaultValue={2010} onChangeCommitted={onYearSlideCommit} min={1992} max={2010} />
        <CustomSlider label={"Month"} defaultValue={1} onChangeCommitted={onMonthSliderCommit} min={1} max={12} />
      </div>
    </div>
  );
}
