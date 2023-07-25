"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { mesh, feature } from "topojson-client";
import countiesUs from "@/data/counties-10m.json";
import wildfire2016 from "@/data/FiresPerCountyMonthly.json";
import County from "@/components/county";

export default function Page() {
  const usData = countiesUs;
  const [focusCounty, setFocusCounty] = useState(null);
  const [month, setMonth] = useState("07");
  const [year, setYear] = useState("2010");
  const [countiesWithWildfireMap, setSountiesWithWildfireMap] = useState([]);
  useEffect(() => {
    const counties = feature(usData, usData.objects.counties);
    const wildfireData = wildfire2016;
    var map = new Map();
    for (let i = 1992; i <= 2015; i++) {
      for (let c = 1; c <= 12; c++) {
        const yearString = i.toString();
        const monthString = c < 10 ? "0" + c : "" + c;
        const key = yearString + monthString;
        const fires = wildfireData.filter((fire) => fire.Year == yearString && fire.Month == monthString)
        map = map.set(
          key,
          counties.features.map((county) => {
            const fire = fires.find((fire) => fire.County_Id == county.id)
            return{...county, fireSize: fire ? fire.Fire_Size : 0}
          })
        );
      }
    }
    setSountiesWithWildfireMap(map);
  }, [usData]);
  if(countiesWithWildfireMap.length == 0) {
    return (<>Loading..</>)
  }
  const projection = d3.geoAlbersUsa().scale(900);
  const geoPath = d3.geoPath().projection(projection);
  const currentWildFireData = countiesWithWildfireMap.get(year+month)
  const usStatesPath = geoPath(mesh(usData, usData.objects.states, (a, b) => a !== b));
  const reds = d3.scaleOrdinal(d3.schemeReds[8]);

  function countyClicked(county) {
    setFocusCounty(`${county.id} ${county.properties.name}`);
  }



  return (
    <>
      <button onClick={() => console.log("hello")}>Play</button>
      <div>
        <h1>Month: {month}</h1>
        <input
          type="range"
          min="1"
          max="12"
          onChange={(event) => {
            if (event.target.value < 10) {
              setMonth("0" + event.target.value);
            } else {
              setMonth("" + event.target.value);
            }
          }}
        />
      </div>
      <div>
        <h1>Year: {year}</h1>
        <input type="range" min="1992" max="2015" onChange={(event) => setYear(event.target.value)} />
      </div>
      <div>
        <h1>State: {focusCounty ? focusCounty : ""}</h1>
      </div>
      <svg viewBox="0 0 975 610">
        <g fill="none" stroke="none" strokeLinejoin="round" strokeLinecap="round">
          {currentWildFireData.map((county) => {
            const color = county.fireSize == 0 ? "#fff5f0" : reds(getFireValue(parseInt(county.fireSize)));
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
