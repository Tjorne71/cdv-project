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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomSwitch from "./customSwitch";

export default function CustomMap({ focusYear, focusMonth, height, width, setFocusCounty, setFireSentence, setFireTotal, setIsSentenceVisible }) {
  const usData = countiesUs;
  const [showStatesLabels, setShowStatesLabels] = useState(false);
  const counties = feature(usData, usData.objects.counties);
  const wildfireData = dataMapper(wildfireJson, counties);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const projection = d3
    .geoAlbersUsa()
    .scale(900)
    .translate([width / 2, height / 2]);
  const geoPath = d3.geoPath().projection(projection);
  const focusWildFireData = wildfireData.filter((fire) => fire.month == focusMonth && fire.year == focusYear);
  const usStatesPath = geoPath(mesh(usData, usData.objects.states, (a, b) => a !== b));

  const reds = d3.scaleSequential().domain([1, 8]).interpolator(d3.interpolateReds);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function countyClicked(county, fireSize) {
    setFocusCounty(county.properties.name);
    setFireSentence(getFireSentence(fireSize));
    setFireTotal(Math.round(fireSize * 100) / 100);
    setIsSentenceVisible(true);
  }

  function onShowStatesLabelsChange() {
    setShowStatesLabels(!showStatesLabels);
  }

  return (
    <main className="w-full h-full flex flex-col justify-center">
      <div className="flex flex-row font-Montserrat text-xs items-center">
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
            const color = fire.fireSize == 0 ? "#fff5f0" : reds(getFireValue(fire.fireSize));
            return <County key={"f" + fire.id} color={color} d={geoPath(fire.county)} county={fire.county} countyClicked={countyClicked} fireSize={fire.fireSize} />;
          })}
          <path stroke="black" strokeWidth="1" d={usStatesPath}></path>
          {showStatesLabels &&
            usData.objects.states.geometries.map((state) => {
              const stateFeature = feature(usData, state);
              const centroid = geoPath.centroid(stateFeature);
              if (!isNaN(centroid[0]) && !isNaN(centroid[1])) {
                return (
                  <text
                    key={state.id}
                    x={centroid[0]}
                    y={centroid[1]}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="black"
                    fontSize="11px"
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.8}
                    className="font-Montserrat"
                    paintOrder="stroke"
                    style={{ pointerEvents: "none" }} // Add this style to make it invisible to the cursor
                  >
                    {stateNameToShorthand[state.properties.name]}
                  </text>
                );
              }
            })}
        </g>
      </svg>
      <div className="flex ml-6 mr-6 mb-4 justify-between items-end">
        <span className="text-sm font-bold">
          {numericMonthToMonthName(focusMonth)}, {focusYear}
        </span>
        <div>
          <ColorLegend colorFunction={reds} />
        </div>
        <a href="#" onClick={handleOpen} className="text-sm underline hover:text-gray-300 transition-all duration-500 ease-in-out">
          Data Source
        </a>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Data source
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p>All data in this project was sourced from the dataset &quot;1.88 Million US Wildfires&quot;.</p>
              <br />
              <p>We have extracted our own dataset using using SQL which is used to generate the visualizations.</p>
              <br />
              <p>The datasets can be downloaded here in JSON:</p>
              <a className="text-blue-500" target="_blank" href="https://drive.google.com/file/d/1A81bOo2kZDV1A9HY4_Xo9opsrM6gnGju/view?usp=sharing">
                1. Monthly Fires Per County{" "}
              </a>
              - The sum of all fires in every county every single month from 1992-2015.
              <br />
              <a className="text-blue-500" target="_blank" href="https://drive.google.com/file/d/1nG-w1_LU-WmriZ84J-3xZT0womRlOALH/view?usp=sharing">
                2. Monthly Fires in the entire US{" "}
              </a>
              - The sum of all fires in the United Stats every single month from 1992-2015.
              <br />
              <br />
              <p>
                The entire dataset can be downloaded from{" "}
                <a className="text-blue-500" target="_blank" href="https://www.kaggle.com/datasets/rtatman/188-million-us-wildfires">
                  Kaggle.
                </a>
              </p>
              <br />
              <h6 className="font-bold">Citation:</h6>
              <p>Short, Karen C. 2017. Spatial wildfire occurrence data for the United States, 1992-2015 [FPA_FOD_20170508]. 4th Edition. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2013-0009.4</p>
            </Typography>
          </Box>
        </Modal>
      </div>
    </main>
  );
}
export function numericMonthToMonthName(numericMonth) {
  const dateObj = new Date(`2023-${numericMonth}-01`);
  const monthName = dateObj.toLocaleString("en-US", { month: "long" });
  return monthName;
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

const stateNameToShorthand = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY',
};


