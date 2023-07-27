"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { mesh, feature } from "topojson-client";
import countiesUs from "@/data/counties-10m.json";
import wildfireJson from "@/data/FiresPerCountyMonthly.json";
import County from "@/components/county";
import CircularProgress from "@mui/material/CircularProgress";
import { dataMapper } from "@/util/dataMapper";
import ColorLegend from "@/components/colorLegend";

export default function CustomMap({ focusYear, focusMonth, height, width, setFocusCounty, setFireSentence, setFireTotal, setIsSentenceVisible}) {
  const usData = countiesUs;
  const counties = feature(usData, usData.objects.counties);
  const wildfireData = dataMapper(wildfireJson, counties);
  const projection = d3
    .geoAlbersUsa()
    .scale(900)
    .translate([width / 2, height / 2]);
  const geoPath = d3
    .geoPath()
    .projection(projection);
  const focusWildFireData = wildfireData.filter((fire) => fire.month == focusMonth && fire.year == focusYear);
  const usStatesPath = geoPath(mesh(usData, usData.objects.states, (a, b) => a !== b));

  const reds = d3
  .scaleSequential()
  .domain([1, 8])
  .interpolator(d3.interpolateReds);
  
  function countyClicked(county, fireSize) {
    setFocusCounty(county.properties.name);
    setFireSentence(getFireSentence(fireSize));
    setFireTotal(Math.round(fireSize * 100) / 100);
    setIsSentenceVisible(true);
  }
  return (
    <main className="w-full h-full flex flex-col justify-center">
      <svg height={height} width={width}>
        <g fill="none" stroke="none" strokeLinejoin="round" strokeLinecap="round">
          {counties.features.map((county) => {
            return <County key={county.id} color={"#fff5f0"} d={geoPath(county)} county={county} countyClicked={countyClicked} fireSize={0}/>;
          })}
          <path stroke="black" strokeWidth="0.6" d={usStatesPath}></path>
        </g>
        <g fill="none" stroke="none" strokeLinejoin="round" strokeLinecap="round">
          {focusWildFireData.map((fire) => {
            const color = fire.fireSize == 0 ? "#fff5f0" : reds(getFireValue(fire.fireSize));
            return <County key={"f"+fire.id} color={color} d={geoPath(fire.county)} county={fire.county} countyClicked={countyClicked} fireSize={fire.fireSize}/>;
          })}
          <path stroke="black" strokeWidth="1" d={usStatesPath}></path>
        </g>
      </svg>
      <ColorLegend colorFunction={reds}/>
    </main>
  );
}

function getFireValue(fire_total) {
  let value;

  switch (true) {
    case fire_total > 0 && fire_total <= 0.25:
      value = 2;
      break;
    case fire_total >= 0.26 && fire_total <= 9.9:
      value = 3;
      break;
    case fire_total >= 10.0 && fire_total <= 99.9:
      value = 4;
      break;
    case fire_total >= 100 && fire_total <= 299:
      value = 5;
      break;
    case fire_total >= 300 && fire_total <= 999:
      value = 6;
      break;
    case fire_total >= 1000 && fire_total <= 4999:
      value = 7;
      break;
    case fire_total >= 5000:
      value = 8;
      break;
    default:
      value = 1;
  }

  return value;
}

function getFireSentence(fire_total) {
  let sentence;
  switch (true) {
    case fire_total > 0 && fire_total <= 0.25:
      sentence = "a basketball court";
      break;
    case fire_total >= 0.26 && fire_total <= 0.5:
      sentence = "two basketball courts";
      break;
    case fire_total >= 0.5 && fire_total <= 1:
      sentence = "a soccer field";
      break;
    case fire_total >= 1 && fire_total <= 2:
      sentence = "a football field";
      break;
    case fire_total >= 2 && fire_total <= 4:
      sentence = "two football fields";
      break;
    case fire_total >= 4 && fire_total <= 8:
      sentence = "a Wallmart Supercenter";
      break;
    case fire_total >= 8 && fire_total <= 16:
      sentence = "two 18 hole golf courses";
      break;
    case fire_total >= 16 && fire_total <= 32:
      sentence = "Ellis Island";
      break;
    case fire_total >= 32 && fire_total <= 64:
      sentence = "The White House";
      break;
    case fire_total >= 64 && fire_total <= 128:
      sentence = "five 18 hole golf courses";
      break;
    case fire_total >= 128 && fire_total <= 256:
      sentence = "Venice Beach";
      break;
    case fire_total >= 256 && fire_total <= 512:
      sentence = "Disney World";
      break;
    case fire_total >= 512 && fire_total <= 1024:
      sentence = "Central Park";
      break;
    case fire_total >= 1024 && fire_total <= 2048:
      sentence = "Tesla Gigefactory, Texas";
      break;
    case fire_total >= 2048 && fire_total <= 4096:
      sentence = "Two Tesla Gigefactories";
      break;
    case fire_total >= 2048 && fire_total <= 4096:
      sentence = "the hot springs in Arkansas";
      break;
    case fire_total >= 4096 && fire_total <= 8192:
      sentence = "The Bronx";
      break;
    case fire_total >= 8192 && fire_total <= 16384:
      sentence = "Virgin Islands";
      break;
    case fire_total >= 16384 && fire_total <= 32768:
      sentence = "Haleakala, Hawaii";
      break;
    case fire_total >= 32768 && fire_total <= 65536:
      sentence = "Bryce Canyon, Utah";
      break;
    case fire_total >= 65536 && fire_total <= 131072:
      sentence = "Great Sand Dunes, Colorado";
      break;
    case fire_total >= 131072 && fire_total <= 262144:
      sentence = "New York City";
      break;
    case fire_total >= 262144 && fire_total <= 524288:
      sentence = "Rocky Mountain, Colorado";
      break;
    case fire_total >= 524288 && fire_total <= 1048576:
      sentence = "Rhodes Island";
      break;
    case fire_total >= 1048576:
      sentence = "Grand Canyon";
      break;
    default:
      sentence = "";
  }
  return sentence;
}