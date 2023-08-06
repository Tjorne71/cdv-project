import React from "react";
import * as d3 from "d3";
import wildfireData from "@/data/FiresPerMonthUS.json";
import YearLine from "@/components/yearLine";

export default function YearLineChart({ height, width, focusYear, focusMonth, onYearClicked, onMonthClick }) {
  const years = [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
  const margin = { top: 20, right: 40, bottom: 20, left: 40 };
  const data = wildfireData.map((fire) => {
    const Fire_Size = fire.Fire_Size;
    const year = parseInt(fire.Year);
    const month = parseInt(fire.Month);
    const date = new Date(year, month);
    return { Fire_Size, year, month, date };
  });
  const dataByYear = data.reduce((acc, fire) => {
    const year = fire.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(fire);
    return acc;
  }, {});

  const totalFireSizeByYear = Object.keys(dataByYear).map((year) => {
    const firesInYear = dataByYear[year];
    const totalFireSize = firesInYear.reduce((total, fire) => total + fire.Fire_Size, 0);
    return { year: parseInt(year), totalFireSize };
  });

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(totalFireSizeByYear.map((d) => d.year)))
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(totalFireSizeByYear.map((d) => d.totalFireSize)))
    .range([height - margin.bottom, margin.top]);
  const line = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.totalFireSize))
    .curve(d3.curveBasis);

  return (
    <svg height={height} width={width}>
      {years.map((year) => {
        const isFocusYear = year == parseInt(focusYear);
        return (
          <g key={year} transform={`translate(${xScale(year)}, 0)`}>
            <text
              x={(xScale(year) - xScale(year)) / 2}
              y={height - 5}
              textAnchor="middle"
              fill="white"
              className={`text-[8px] cursor-pointer hover:font-bold transition-all ease-in-out duration-100 uppercase ${isFocusYear ? "font-bold" : "font-thin"}`}
              alignmentBaseline="middle"
              onClick={() => {
                onYearClicked(year);
              }}
            >
              {year}
            </text>
          </g>
        );
      })}
      <YearLine d={line(totalFireSizeByYear)} year={focusYear} opacity={0.7} inFocus={false} onLineClick={() => {}} clickable={false} />
    </svg>
  );
}
