"use client";
import React, { useState, useEffect } from "react";
import CustomSlider from "@/components/customSlider";
import CustomMap from "@/components/customMap";
import LineChart from "@/components/lineChart";
import YearLineChart from "@/components/yearLineChart";
import CustomSwithGroup from "@/components/customSwithGroup";
import { eachMonthOfInterval, endOfMonth, format, isSameMonth, parseISO, startOfMonth } from "date-fns";
import InfoIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function Visual() {
  const [focusMonth, setFocusMonth] = useState(7);
  const [focusYear, setFocusYear] = useState(2010);
  const [focusCounty, setFocusCounty] = useState("Los Angeles");
  const [fireSentence, setFireSentence] = useState("Virgin Islands");
  const [fireTotal, setFireTotal] = useState(14705.8);
  const [isSentenceVisible, setIsSentenceVisible] = useState(false);
  const [showYearlyGraph, setIsShowYearlyGraph] = useState(false);
  const yearlyComparrisionInfoText = "Each line represents a year, that indicates how many acres were burned per month in the entirety of the US."
  const evolutionInfoText = "This graph indicates how many acres were burned each year in the entirety of the US."

  // // Function to update the focusMonth state by adding one and then wait for 1000ms before running again
  // const incrementFocusMonth = () => {
  //   setFocusMonth((prevFocusMonth) => {
  //     const newFocusMonth = (prevFocusMonth % 12) + 1;
  //     if (newFocusMonth === 12) {
  //       setFocusYear((prevFocusYear) => prevFocusYear + 1);
  //     }
  //     return newFocusMonth;
  //   });
  // };

  // // Run incrementFocusMonth once when the component mounts
  // useEffect(() => {
  //   const intervalId = setInterval(incrementFocusMonth, 1250);

  //   // Clean up the interval when the component unmounts to avoid memory leaks
  //   return () => clearInterval(intervalId);
  // }, []);

  function onMonthChange(value) {
    setFocusMonth(value);
  }

  function onYearChange(value) {
    setFocusYear(value);
  }

  function onChangeGraph() {
    setIsShowYearlyGraph(!showYearlyGraph);
  }
  return (
    <div className="max-w-[1400px] font-Montserrat text-white flex flex-row mx-auto">
      <div className="flex flex-col justify-between w-4/7 mr-2">
        <div className="text-2xl bg-[#3D5E70] h-3/5 w-full flex items-center justify-center min-w-[830px]">
          <CustomMap focusMonth={focusMonth} focusYear={focusYear} setFocusCounty={setFocusCounty} setFireSentence={setFireSentence} setFireTotal={setFireTotal} setIsSentenceVisible={setIsSentenceVisible} height={500} width={850} />
        </div>
        <div className="text-2xl p-4 bg-[#3D5E70] h-2/5 w-full flex-col flex items-center justify-center mt-2">
          <div className="flex justify-between w-full">
            <div className="flex-1">
              <CustomSwithGroup state={showYearlyGraph} onChange={onChangeGraph} textLeft={"Yearly Comparison"} textRight={"Evolution Through The Years"} />
            </div>
            <div>
              <Tooltip title={<span className="text-base">{showYearlyGraph ? evolutionInfoText : yearlyComparrisionInfoText}</span>}>
                <IconButton>
                  <InfoIcon sx={{ color: 'white' }}/>
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
              <CustomSlider label={null} width={720} value={focusMonth} onChangeCommitted={onMonthChange} min={1} max={12} setIsSentenceVisible={setIsSentenceVisible} />
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
          <h2 className="mb-4 bg-[#3b5665] p-3 text-lg">{isSentenceVisible ? generateSentence(focusMonth, focusYear, focusCounty, fireTotal, fireSentence) : "Click on a county too see county specific fires."}</h2>
          {showYearlyGraph ? (
            <>
              <CustomSlider label1={`Selected Month:`} label2={`${format(new Date(2000, focusMonth - 1, 1), "MMMM")}`} value={focusMonth} onChangeCommitted={onMonthChange} min={1} max={12} setIsSentenceVisible={setIsSentenceVisible} showLabel={true} />
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

function numericMonthToMonthName(numericMonth) {
  const dateObj = new Date(`2023-${numericMonth}-01`);
  const monthName = dateObj.toLocaleString("en-US", { month: "long" });
  return monthName;
}

function generateSentence(focusMonth, focusYear, focusCounty, fireTotal, fireSentence) {
  if (fireTotal < 0.05) return `${focusCounty} county hasn't had any wildfires during ${numericMonthToMonthName(focusMonth)} ${focusYear}.`;
  const sentences = [
    `In ${numericMonthToMonthName(focusMonth)} ${focusYear}, ${focusCounty} county had a fire that spread ${fireTotal} acres, which is equivalent to ${fireSentence}.`,
    `Back in ${numericMonthToMonthName(focusMonth)} ${focusYear}, ${focusCounty} county experienced a fire that extended over ${fireTotal} acres, equivalent to the size of ${fireSentence}.`,
    `During ${numericMonthToMonthName(focusMonth)} ${focusYear}, a fire erupted in ${focusCounty} county, consuming an area of ${fireTotal} acres, matching the size of ${fireSentence}.`,
    `In ${numericMonthToMonthName(focusMonth)} of ${focusYear}, there was a fire outbreak in ${focusCounty} county, which covered an expanse of ${fireTotal} acres, mirroring the area of ${fireSentence}.`,
    `${focusCounty} county encountered a fire in ${numericMonthToMonthName(focusMonth)} ${focusYear}, spreading across ${fireTotal} acres, an area comparable to that of ${fireSentence}.`,
    `The fire that occurred in ${numericMonthToMonthName(focusMonth)} ${focusYear} ravaged an area of ${fireTotal} acres in ${focusCounty} county, which coincidentally equates to the size of ${fireSentence}.`,
    `${focusCounty} county experienced a fire incident in ${numericMonthToMonthName(focusMonth)} ${focusYear}, which spread across ${fireTotal} acres, equivalent to the area of ${fireSentence}.`,
    `During the month of ${numericMonthToMonthName(focusMonth)} in ${focusYear}, ${focusCounty} county was hit by a fire, covering a total of ${fireTotal} acres, mirroring the size of ${fireSentence}.`,
    `${numericMonthToMonthName(focusMonth)} ${focusYear} saw a fire outbreak in ${focusCounty} county, extending over an expanse of ${fireTotal} acres, matching the area of ${fireSentence}.`,
    `A fire blazed through ${focusCounty} county in ${numericMonthToMonthName(focusMonth)} ${focusYear}, consuming precisely ${fireTotal} acres, the same as ${fireSentence}'s size.`,
  ];

  const randomNumber = Math.floor(Math.random() * 10);
  return sentences[randomNumber];
}
