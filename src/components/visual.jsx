"use client";
import React, { useState, useEffect } from "react";
import CustomSlider from "@/components/slider";
import CustomMap from "@/components/customMap";
import LineChart from "@/components/lineChart";

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
    <div className="h-[900px] w-[90%] font-Montserrat text-white flex flex-row mx-auto">
      <div className="h-full flex flex-col justify-between w-2/3 mr-2">
        <div className="text-2xl p-4 bg-[#3D5E70] h-3/5 w-full flex items-center justify-center min-w-[830px]">
          <CustomMap focusMonth={focusMonth} focusYear={focusYear} height={500} width={850} />
        </div>
        <div className="text-2xl p-4 bg-[#3D5E70] h-2/5 w-full flex-col flex items-center justify-center mt-2">
          <LineChart height={250} width={800} focusYear={focusYear} focusMonth={focusMonth}/>
          <CustomSlider label={null} width={740} defaultValue={6} onChangeCommitted={onMonthSliderCommit} min={1} max={12} />
        </div>
      </div>
      <div className="text-2xl p-4 bg-[#3D5E70] h-auto w-1/3">
        <div className="text-2xlbg-[#3D5E70]">
          <h1>Fire In The Us</h1>
        </div>
        <CustomSlider label={"Year"} defaultValue={2010} onChangeCommitted={onYearSlideCommit} min={1992} max={2015} />
      </div>
    </div>
  );
}
