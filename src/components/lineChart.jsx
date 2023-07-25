import dataset from "@/data/data.json";
import * as d3 from "d3";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  isSameMonth,
  parseISO,
  parse,
  startOfMonth,
} from "date-fns";
import { motion } from "framer-motion";

export default function LineChart({width, height }) {
  const data = dataset
  const sortedData = data.sort((a, b) => a.date - b.date);
  let margin = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 24,
  };
  console.log(parse(sortedData.at(0).date, "d.M.yyyy HH.mm.ss", new Date()))
  let startDay = startOfMonth(parse(sortedData.at(0).date, "d.M.yyyy HH.mm.ss", new Date()));
  console.log(startDay);
  let endDay = endOfMonth(parse(sortedData.at(-1).date, "d.M.yyyy HH.mm.ss", new Date()));
  console.log(endDay);
  let months = eachMonthOfInterval({ start: startDay, end: endDay });

  let xScale = d3
    .scaleTime()
    .domain([startDay, endDay])
    .range([margin.left, width - margin.right]);

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.avg)))
    .range([height - margin.bottom, margin.top]);

  let line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.avg));
  let d = line(data);

  return (
    <>
      <svg className="" height={height} width={width} >
        {/* X axis */}
        {months.map((month, i) => (
          <g
            key={month}
            className="text-gray-400"
            transform={`translate(${xScale(month)},0)`}
          >
            {i % 2 === 1 && (
              <rect
                width={xScale(endOfMonth(month)) - xScale(month)}
                height={height - margin.bottom}
                fill="currentColor"
                className="text-gray-100"
              />
            )}
            <text
              x={(xScale(endOfMonth(month)) - xScale(month)) / 2}
              y={height - 5}
              textAnchor="middle"
              fill="currentColor"
              className="text-[10px]"
            >
              {format(month, "MMM")}
            </text>
          </g>
        ))}

        {/* Y axis */}
        {yScale.ticks(5).map((max) => (
          <g
            transform={`translate(0,${yScale(max)})`}
            className="text-gray-400"
            key={max}
          >
            <line
              x1={margin.left}
              x2={width - margin.right}
              stroke="currentColor"
              strokeDasharray="1,3"
            />
            <text
              alignmentBaseline="middle"
              className="text-[10px]"
              fill="currentColor"
            >
              {max}
            </text>
          </g>
        ))}

        {/* Line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Circles */}
        {data.map((d, i) => (
          <motion.circle
            key={d.date}
            r="5"
            cx={xScale(d.date)}
            cy={yScale(d.estimatedMax)}
            fill="currentColor"
            strokeWidth={2}
            stroke={
              months.findIndex((m) => isSameMonth(m, d.date)) % 2 === 1
                ? "#f5f5f4"
                : "white"
            }
          />
        ))}
      </svg>
    </>
  );
}