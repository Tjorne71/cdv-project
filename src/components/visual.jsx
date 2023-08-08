"use client";
import React, { useState, useEffect } from "react";
import CustomSlider from "@/components/customSlider";
import CustomMap from "@/components/customMap";
import LineChart from "@/components/lineChart";
import YearLineChart from "@/components/yearLineChart";
import CustomSwithGroup from "@/components/customSwithGroup";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { generateCompleteFireSentence } from "@/util/fireSize.js";
import { monthToTextLong } from "@/util/monthFormat";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ImageTip from "./imageTip";

export default function Visual() {
  const [focusMonth, setFocusMonth] = useState(7);
  const [focusYear, setFocusYear] = useState(2010);
  const [isPlayingMonth, setIsPlayingMonth] = useState(false);
  const [focusCounty, setFocusCounty] = useState(null);
  const [fireSentence, setFireSentence] = useState(null);
  const [fireTotal, setFireTotal] = useState(0);
  const [isSentenceVisible, setIsSentenceVisible] = useState(false);
  const [showYearlyGraph, setIsShowYearlyGraph] = useState(false);
  const yearlyComparrisionInfoText = "Each line represents a year, that indicates how many acres were burned per month in the entirety of the US.";
  const evolutionInfoText = "This graph indicates how many acres were burned each year in the entirety of the US.";

  async function incrementFocusMonth(value) {
    if (value == 13) {
      setIsPlayingMonth(false);
      return;
    }
    setFocusMonth(value);
    await timeout(1500);
    const nextMonth = value + 1;
    incrementFocusMonth(nextMonth);
  }

  function onMonthChange(value) {
    setIsSentenceVisible(false);
    setFocusMonth(value);
  }

  function onYearChange(value) {
    setIsSentenceVisible(false);
    setFocusYear(value);
  }

  function onChangeGraph() {
    setIsShowYearlyGraph(!showYearlyGraph);
  }

  return (
    <div className="max-w-[1400px] font-Montserrat text-white flex flex-row mx-auto relative">
      <div className="flex flex-col justify-between w-4/7 mr-2">
        <div className="text-2xl bg-[#3D5E70] h-3/5 w-full flex items-center justify-center min-w-[830px]">
          <CustomMap focusMonth={focusMonth} focusYear={focusYear} focusCounty={focusCounty} setFocusCounty={setFocusCounty} setFireSentence={setFireSentence} setFireTotal={setFireTotal} setIsSentenceVisible={setIsSentenceVisible} height={500} width={850} />
        </div>
        <div className="text-2xl p-4 bg-[#3D5E70] h-2/5 w-full flex-col flex items-center justify-center mt-2">
          <div className="flex justify-between w-full">
            <div className="flex-1">
              <CustomSwithGroup state={showYearlyGraph} onChange={onChangeGraph} textLeft={"Yearly Comparison"} textRight={"Evolution Through The Years"} />
            </div>
            <div>
              <Tooltip title={<span className="text-base">{showYearlyGraph ? evolutionInfoText : yearlyComparrisionInfoText}</span>}>
                <IconButton>
                  <InfoIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          {showYearlyGraph ? (
            <>
              <YearLineChart height={250} width={800} focusYear={focusYear} focusMonth={focusMonth} onYearClicked={onYearChange} onMonthClick={onMonthChange} />
              <CustomSlider label={null} width={800 - 80} value={focusYear} onChangeCommitted={onYearChange} min={1992} max={2015} setIsSentenceVisible={setIsSentenceVisible} />
            </>
          ) : (
            <>
              <LineChart height={250} width={800} focusYear={focusYear} focusMonth={focusMonth} onYearClicked={onYearChange} onMonthClick={onMonthChange} />
              <div className="relative">
                <CustomSlider label={null} width={720} value={focusMonth} onChangeCommitted={onMonthChange} min={1} max={12} setIsSentenceVisible={setIsSentenceVisible} />
                {isPlayingMonth ? (
                  <>
                    <AiOutlinePauseCircle className="text-secondary text-xl cursor-not-allowed absolute right-[-40px] top-1" />
                  </>
                ) : (
                  <>
                    <AiOutlinePlayCircle
                      className="text-white text-xl cursor-pointer hover:text-secondary absolute right-[-40px] top-1"
                      onClick={() => {
                        setIsSentenceVisible(false);
                        setIsPlayingMonth(true);
                        incrementFocusMonth(focusMonth);
                      }}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="text-2xl p-8 bg-[#3D5E70] flex flex-col h-auto w-3/7">
        <div className="text-2xlbg-[#3D5E70] p-1 pb-3">
          <h1 className="text-4xl font-bold">Inferno Across America:</h1>
          <h1 className="text-3xl text-[#F9F871]">A Visual Chronicle of Wildfires</h1>
        </div>
        <hr className="mb-4 h-[2px] bg-white"></hr>
        <p className="pr-4 mb-4">
          Discover the evolving history of US wildfires and the pressing question: <br />
          <br />
          <b>
            How has <span className="text-[#F9F871]">climate</span> change impacted these infernos?
          </b>{" "}
          <br />
          <br />
          <span className="text-xl">Uncover the connections between rising temperatures, droughts, and increased wildfire incidents. Join us on a quest for understanding and action to protect our landscapes from this growing threat.</span>
        </p>
        <hr className="h-[2px] bg-white"></hr>
        <div className="mt-auto">
          <h2 className="mb-4 bg-[#3b5665] p-3 text-lg">
            {isSentenceVisible ? generateCompleteFireSentence(focusMonth, focusYear, focusCounty.properties.name, fireTotal, fireSentence.sentence) : "Click on a county too see county specific fires."} {fireSentence != null && fireSentence?.image != "" && <ImageTip imageUrl={fireSentence.image} sentence={fireSentence.sentence} />}
          </h2>
          {showYearlyGraph ? (
            <>
              <CustomSlider label1={`Selected Month:`} label2={`${monthToTextLong(focusMonth)}`} value={focusMonth} onChangeCommitted={onMonthChange} min={1} max={12} setIsSentenceVisible={setIsSentenceVisible} showLabel={true} />
            </>
          ) : (
            <>
              <CustomSlider label1={`Selected Year:`} label2={focusYear} value={focusYear} onChangeCommitted={onYearChange} min={1992} max={2015} setIsSentenceVisible={setIsSentenceVisible} showLabel={true} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
