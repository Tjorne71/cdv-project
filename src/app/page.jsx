"use client";
import React, { useState } from "react";
import * as d3 from "d3";
import { mesh, feature } from "topojson-client";
import countiesUs from "@/data/counties-10m.json";
import wildfire2016 from "@/data/FiresPerCountyMonthly.json";
import County from "@/components/county";

export default function Page() {
  const [focusCounty, setFocusCounty] = useState(null);
  const [month, setMonth] = useState("07");
  const [year, setYear] = useState("2010");
  const usData = countiesUs;
  const wildfireData = wildfire2016;
  const wildfireData2010 = wildfireData.filter((fire) => fire.Year == year && fire.Month == month);
  const projection = d3.geoAlbersUsa().scale(900);
  const geoPath = d3.geoPath().projection(projection);
  const usStatesPath = geoPath(mesh(usData, usData.objects.states, (a, b) => a !== b));
  const counties = feature(usData, usData.objects.counties);
  const colorRange = d3.interpolateRgb("#fff5f0", "#67000d");
  const valueRange = { min: 1, max: 8};
  const colorScale = d3.scaleSequential().domain([valueRange.min, valueRange.max]).interpolator(colorRange);
  const reds = d3.scaleOrdinal(d3.schemeReds[valueRange.max - valueRange.min])

  function countyClicked(county) {
    setFocusCounty(`${county.id} ${county.properties.name}`);
  }
  return (
    <>
      <button onClick={() => console.log("hello")}>Play</button>
      <div>
        <h1>Month: {month}</h1>
        <input type="range" min="1" max="12" onChange={(event) => {
          if(event.target.value < 10) {
            setMonth("0"+event.target.value)
          } else {
            setMonth(""+event.target.value)
          }
        }}/>
      </div>
      <div>
        <h1>Year: {year}</h1>
        <input type="range" min="1992" max="2015" onChange={(event) => setYear(event.target.value)}/>
      </div>
      <div>
        <h1>State: {focusCounty ? focusCounty : ""}</h1>
      </div>
      <svg viewBox="0 0 975 610">
        <g fill="none" stroke="none" strokeLinejoin="round" strokeLinecap="round">
          {counties.features.map((county) => {
            const fire = wildfireData2010.find((fire) => fire.County_Id == county.id);
            const color = fire?.Fire_Size ? reds(getFireValue(parseInt(fire.Fire_Size))) : "#fff5f0";
            return <County key={county.id} color={color} d={geoPath(county)} county={county} countyClicked={countyClicked} />;
          })}
          <path stroke="black" strokeWidth="0.6" d={usStatesPath}></path>
        </g>
      </svg>
    </>
  );
}

function getFireValue(fire_total) {
  let letter;

  switch (true) {
    case fire_total > 0 && fire_total <= 0.25:
      letter = 2;
      break;
    case fire_total >= 0.26 && fire_total <= 9.9:
      letter = 3;
      break;
    case fire_total >= 10.0 && fire_total <= 99.9:
      letter = 4;
      break;
    case fire_total >= 100 && fire_total <= 299:
      letter = 5;
      break;
    case fire_total >= 300 && fire_total <= 999:
      letter = 6;
      break;
    case fire_total >= 1000 && fire_total <= 4999:
      letter = 7;
      break;
    case fire_total >= 5000:
      letter = 8;
      break;
    default:
      letter = 1;
  }

  return letter;
}

