import React from "react";
import * as d3 from "d3";
import wildfireData from "@/data/FiresPerMonthUS.json";
import YearLine from "@/components/yearLine";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
} from "date-fns";

export default function LineChart({ height, width, focusYear }) {
  const years = [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
  const margin = { top: 10, right: 10, bottom: 20, left: 10 };
  const data = wildfireData.map((fire) => {
    const Fire_Size = fire.Fire_Size;
    const year = parseInt(fire.Year);
    const month = parseInt(fire.Month);
    return { Fire_Size, year, month };
  });
  const xScale = d3
    .scaleLinear()
    .domain([1, 12])
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.Fire_Size)))
    .range([height - margin.bottom, margin.top]);
  const line = d3
    .line()
    .x((d) => xScale(d.month))
    .y((d) => yScale(d.Fire_Size));

  const colors = d3.scaleOrdinal(years, d3.schemeReds);

  return (
    <svg height={height} width={width}>
      {years.map((year) => {
        if (year != focusYear) {
          return <YearLine key={year} d={line(filterDataForYear(data, year))} color={"black"} inFocus={false} />;
        }
      })}
      {xScale.ticks(12).map((month) => (
        <g key={month} transform={`translate(${xScale(month)}, 0)`}>
          {/* <line y1={height - margin.bottom} y2={margin.top} stroke="currentColor" strokeDasharray="1,3" /> */}
          <text x={(xScale(month) - xScale(month)) / 2} y={height - 5} textAnchor="middle" fill="currentColor" className="text-[5px]" alignmentBaseline="middle">
            {format(new Date(2000, month - 1, 1), "MMMM")}
          </text>
        </g>
      ))}
      {/* {yScale.ticks(5).map((Fire_Size) => (
        <g key={Fire_Size} transform={`translate(0,${yScale(Fire_Size)})`}>
          <line x1={margin.left} x2={width - margin.right} stroke="currentColor" strokeDasharray="1,3" />
          <text alignmentBaseline="middle" className="text-[10px]" fill="currentColor">
            {Fire_Size}
          </text>
        </g>
      ))} */}
      <YearLine key={focusYear} d={line(filterDataForYear(data, focusYear))} color={yearColorMap[focusYear]} inFocus={true} />
    </svg>
  );
}

function filterDataForYear(data, year) {
  return data.filter((d) => d.year == year);
}

const yearColorMap = {
  1992: "#ff0000", // Red
  1993: "#00ff00", // Green
  1994: "#0000ff", // Blue
  1995: "#ffff00", // Yellow
  1996: "#ff00ff", // Magenta
  1997: "#00ffff", // Cyan
  1998: "#800000", // Maroon
  1999: "#008000", // Green
  2000: "#000080", // Navy
  2001: "#808000", // Olive
  2002: "#800080", // Purple
  2003: "#008080", // Teal
  2004: "#ff8000", // Orange
  2005: "#ff0080", // Fuchsia
  2006: "#80ff00", // Lime
  2007: "#0080ff", // Aqua
  2008: "#ff80ff", // Lavender
  2009: "#80ffff", // Sky Blue
  2010: "#804000", // Brown
  2011: "#400080", // Indigo
  2012: "#408000", // Forest Green
  2013: "#804080", // Plum
  2014: "#408080", // Steel Blue
  2015: "#ff6666", // Light Red
};
