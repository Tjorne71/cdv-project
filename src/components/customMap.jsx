"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { mesh, feature } from "topojson-client";
import countiesUs from "@/data/counties-10m.json";
import wildfireJson from "@/data/FiresPerCountyMonthly.json";
import County from "@/components/county";
import { dataMapper } from "@/util/dataMapper";
import ColorLegend from "@/components/colorLegend";
import DataSourceModal from "@/components/dataSourceModal";
import CustomSwitch from "./customSwitch";
import { monthToTextLong } from "@/util/monthFormat";
import { fireSizeToValue, fireSizeToSentenceWithImages } from "@/util/fireSize.js";
import { stateNameToShorthand } from "@/util/stateNameShortHand";
import StateText from "./stateText";
import SearchField from "@/components/searchField";

export default function CustomMap({ focusYear, focusMonth, height, width, setFocusCounty, setFireSentence, setFireTotal, setIsSentenceVisible }) {
  const usData = countiesUs;
  const [showStatesLabels, setShowStatesLabels] = useState(false);
  
  const counties = feature(usData, usData.objects.counties);
  const wildfireData = dataMapper(wildfireJson, counties);
  const focusWildFireData = wildfireData.filter((fire) => fire.month == focusMonth && fire.year == focusYear);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const projection = d3
    .geoAlbersUsa()
    .scale(900)
    .translate([width / 2, height / 2]);
  const geoPath = d3.geoPath().projection(projection);
  const usStatesPath = geoPath(mesh(usData, usData.objects.states, (a, b) => a !== b));

  const reds = d3.scaleSequential().domain([1, 8]).interpolator(d3.interpolateReds);

  function countyClicked(county, fireSize) {
    setFocusCounty(county.properties.name);
    setFireSentence(fireSizeToSentenceWithImages(fireSize));
    setFireTotal(Math.round(fireSize * 100) / 100);
    setIsSentenceVisible(true);
  }

  function countySearched(county) {
    const dataToLookIn = wildfireData.filter((fire) => fire.month == focusMonth && fire.year == focusYear);
    const fire = dataToLookIn.find((fireData) => fireData.county && fireData.county.properties && fireData.county.properties.name === county.properties.name);
    let fireSize = 0;
    if (fire) {
      fireSize = fire.fireSize;
    }
    countyClicked(county, fireSize);
  }

  function onShowStatesLabelsChange() {
    setShowStatesLabels(!showStatesLabels);
  }

  return (
    <main className="w-full h-full flex flex-col justify-center relative">
      <div className="absolute top-4 right-4 w-96">
        <SearchField values={counties.features} onChange={countySearched} />
      </div>
      <div className="flex flex-row font-Montserrat text-xs items-center mt-1">
        <CustomSwitch onChange={onShowStatesLabelsChange} state={showStatesLabels} />
        <p
          onClick={() => {
            onShowStatesLabelsChange();
          }}
          className={` hover:font-bold cursor-pointer ${!showStatesLabels ? "text-white opacity-70" : "text-secondary"}`}
        >
          Show State Labels
        </p>
      </div>
      <svg height={height} width={width}>
        <g fill="none" stroke="none" strokeLinejoin="round" strokeLinecap="round">
          {counties.features.map((county) => {
            return <County key={county.id} color={"#fff5f0"} d={geoPath(county)} county={county} countyClicked={countyClicked} fireSize={0} />;
          })}
          <path stroke="black" strokeWidth="0.6" d={usStatesPath}></path>
        </g>
        <g fill="none" stroke="none" strokeLinejoin="round" strokeLinecap="round">
          {focusWildFireData.map((fire) => {
            const color = fire.fireSize == 0 ? "#fff5f0" : reds(fireSizeToValue(fire.fireSize));
            return <County key={"f" + fire.id} color={color} d={geoPath(fire.county)} county={fire.county} countyClicked={countyClicked} fireSize={fire.fireSize} />;
          })}
          <path stroke="black" strokeWidth="1" d={usStatesPath}></path>
          {showStatesLabels &&
            usData.objects.states.geometries.map((state) => {
              const stateFeature = feature(usData, state);
              const centroid = geoPath.centroid(stateFeature);
              if (!isNaN(centroid[0]) && !isNaN(centroid[1])) {
                return <StateText key={state.id} x={centroid[0]} y={centroid[1]} stateText={stateNameToShorthand[state.properties.name]} />;
              }
            })}
        </g>
      </svg>
      <div className="flex ml-6 mr-6 mb-4 justify-between items-end">
        <span className="text-sm font-bold font-Montserrat w-full">
          {monthToTextLong(focusMonth)}, {focusYear}
        </span>
        <div className="w-full">
          <ColorLegend colorFunction={reds} />
        </div>
        <a href="#" onClick={handleOpen} className="text-sm underline hover:text-gray-300 transition-all duration-500 ease-in-out w-full text-right">
          Data Source
        </a>
        <DataSourceModal open={open} onClose={handleClose} />
      </div>
    </main>
  );
}
