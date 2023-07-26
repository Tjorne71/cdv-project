"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { mesh, feature } from "topojson-client";
import countiesUs from "@/data/counties-10m.json";
import wildfire2016 from "@/data/FiresPerCountyMonthly.json";
import County from "@/components/county";
import LineChart from "@/components/lineChart";

export default function CustomMap({focusYear, focusMonth}) {
    const usData = countiesUs;
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
          const fires = wildfireData.filter((fire) => fire.Year == yearString && fire.Month == monthString);
          map = map.set(
            key,
            counties.features.map((county) => {
              const fire = fires.find((fire) => fire.County_Id == county.id);
              return { ...county, fireSize: fire ? fire.Fire_Size : 0 };
            })
          );
        }
      }
      setSountiesWithWildfireMap(map);
    }, [usData]);
    if (countiesWithWildfireMap.length == 0) {
      return <>Loading..</>;
    }
    const projection = d3.geoAlbersUsa().scale(800);
    const geoPath = d3.geoPath().projection(projection);
    const currentWildFireData = countiesWithWildfireMap.get(focusYear + focusMonth);
    const usStatesPath = geoPath(mesh(usData, usData.objects.states, (a, b) => a !== b));
    const reds = d3.scaleSequential()
    .domain([1, 8])
    .interpolator(d3.interpolateReds);
  
    function countyClicked(county) {
      setFocusCounty(county.properties.name);
      setFireSentence(getFireSentence(county.fireSize))
      setFireTotal(Math.round(county.fireSize*100)/100);
      console.log(county);
    }
  
  
    return (
      <main className="p-40 w-screen">
        <div>
          <h1>State: {focusCounty ? focusCounty : ""}</h1>
          <h2>In {numericMonthToMonthName(month)}, {year}, {focusCounty} county had a fire that spread {fireTotal} acres, 
              which is equivilant to {fireSentence}</h2>
        </div>
        <svg height={500} width={1000}>
          <g fill="none" stroke="none" strokeLinejoin="round" strokeLinecap="round">
            {currentWildFireData.map((county) => {
              const color = county.fireSize == 0 ? "#fff5f0" : reds(getFireValue(parseInt(county.fireSize)));
              return (
                <County key={county.id} color={color} d={geoPath(county)} county={county} countyClicked={countyClicked} />
              );
            })}
            <path stroke="black" strokeWidth="0.6" d={usStatesPath}></path>
          </g>
        </svg>
        <LineChart height={300} width={1000} focusYear={parseInt(year)}/>
      </main>
    );
  }
  
  function numericMonthToMonthName(numericMonth) {
    const dateObj = new Date(`2023-${numericMonth}-01`);
    const monthName = dateObj.toLocaleString('en-US', { month: 'long' });
    return monthName;
  }
  
  function getFireSentence(fire_total) {
    let sentence;
    switch (true) {
      case fire_total > 0 && fire_total <= 0.25:
        sentence = "a basketball court."
        break;
      case fire_total >= 0.26 && fire_total <= 0.50:
        sentence = "two basketball courts.";
        break;
      case fire_total >= 0.5 && fire_total <= 1:
        sentence = "a soccer field."
        break;
      case fire_total >= 1 && fire_total <= 2:
        sentence = "a football field."
        break;
      case fire_total >= 2 && fire_total <= 4:
        sentence = "two football fields."
        break;
      case fire_total >= 4 && fire_total <= 8:
        sentence = "a Wallmart Supercenter."
        break;
      case fire_total >= 8 && fire_total <= 16:
        sentence = "two 18 hole golf courses."
        break;
      case fire_total >= 16 && fire_total <= 32:
        sentence = "Ellis Island."
        break;
      case fire_total >= 32 && fire_total <= 64:
        sentence = "The White House."
        break;
      case fire_total >= 64 && fire_total <= 128:
        sentence = "five 18 hole golf courses."
        break;
      case fire_total >= 128 && fire_total <= 256:
        sentence = "Venice Beach."
        break;
      case fire_total >= 256 && fire_total <= 512:
        sentence = "Disney World."
        break;
      case fire_total >= 512 && fire_total <= 1024:
        sentence = "Central Park."
        break;
      case fire_total >= 1024 && fire_total <= 2048:
        sentence = "Tesla Gigefactory, Texas."
        break;
      case fire_total >= 2048 && fire_total <= 4096:
        sentence = "Two Tesla Gigefactories."
        break;
      case fire_total >= 2048 && fire_total <= 4096:
        sentence = "the hot springs in Arkansas."
        break;
      case fire_total >= 4096 && fire_total <= 8192:
        sentence = "The Bronx."
        break;
      case fire_total >= 8192 && fire_total <= 16384:
        sentence = "Virgin Islands."
        break;
      case fire_total >= 16384 && fire_total <= 32768:
        sentence = "Haleakala, Hawaii."
        break;
      case fire_total >= 32768 && fire_total <= 65536:
        sentence = "Bryce Canyon, Utah."
        break;
      case fire_total >= 65536 && fire_total <= 131072:
        sentence = "Great Sand Dunes, Colorado."
        break;
      case fire_total >= 131072 && fire_total <= 262144:
        sentence = "New York City."
        break;
      case fire_total >= 262144 && fire_total <= 524288:
        sentence = "Rocky Mountain, Colorado."
        break;
      case fire_total >= 524288 && fire_total <= 1048576:
        sentence = "Rhodes Island."
        break;
      case fire_total >= 1048576:
        sentence = "Grand Canyon."
        break;
      default:
        sentence = "";
    }
  
    return sentence;
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
  
  
