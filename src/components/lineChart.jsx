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
  const margin = { top: 20, right: 40, bottom: 20, left: 40 };
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
    .y((d) => yScale(d.Fire_Size))
    .curve(d3.curveBasis);

  const colors = d3.scaleOrdinal(years, d3.schemeReds);

  return (
    <svg height={height} width={width}>
      {years.map((year) => {
        if (year != focusYear) {
          return <YearLine key={year} year={year} d={line(filterDataForYear(data, year))} opacity={0.2  } inFocus={false} />;
        }
      })}
      {xScale.ticks(12).map((month) => (
        <g key={month} transform={`translate(${xScale(month)}, 0)`}>
          {/* <line y1={height - margin.bottom} y2={margin.top} stroke="currentColor" strokeDasharray="1,3" /> */}
          <text x={(xScale(month) - xScale(month)) / 2} y={height - 5} textAnchor="middle" fill="white" className="text-[10px] uppercase" alignmentBaseline="middle">
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
      <YearLine key={focusYear} d={line(filterDataForYear(data, focusYear))} year={focusYear} opacity={1} inFocus={true} />
    </svg>
  );
}

function filterDataForYear(data, year) {
  return data.filter((d) => d.year == year);
}