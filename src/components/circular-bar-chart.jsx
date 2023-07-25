import * as d3 from "d3";
import dataset from "@/data/data.json"

export default function CircularBarChart() {
  const width = 900
  const height = 900
  const data = dataset
  const months = [ 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March' ]
  const innerRadius = 0.35 * width/2
  const outerRadius = 0.9 * width/2
  const extent = d3.extent( data, d => d.avg ), interpolated = d3.interpolate( ...extent )
  const colorDomain = d3.quantize( interpolated, 7 )
  const color = d3.scaleLinear(
    colorDomain,
    d3.quantize(d3.interpolateSpectral, 7).reverse()
  )
  const xScale = d3.scaleBand(
    data.map(d => d.date),
    [ 0, 2 * Math.PI ]
  )
  const yDomain = [d3.min(data, d => d.min), d3.max(data, d => d.max)]
  const yScale = d3.scaleLinear()
    .domain( yDomain )
    .range([ innerRadius, outerRadius ])
  const arc = d3.arc()
    .innerRadius(d => yScale(d.min))
    .outerRadius(d => yScale(d.max))
    .startAngle(d => xScale(d.date))
    .endAngle(d => xScale(d.date) + xScale.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius)
  return (
    <svg height={height} width={width}>
      <g transform={`translate(${height / 2}, ${width / 2})`}>
        <text fill="#1a1a1a" textAnchor="end" x="-0.5em" y={-yScale(yScale.ticks(5).pop()) - 10} dy="-1em">Temperature (°C)</text>
        {data.map((weather, index) => (
          <g key={index}>
            <path d={arc(weather)} fill={color(weather.avg)} stroke={color(weather.avg)}/>
          </g>
        ))}
        {months.map((month, index) => (
          <g key={index} transform={`rotate(${ index * 360/months.length }), translate(${innerRadius},0)`}>
            <text fontSize={13} textAnchor="middle" transform={`${(index * 360/months.length) % 360 > 180 ? 'rotate(90) translate(0,20)' : 'rotate(-90) translate(0,-9)'}`}>{month}</text>
            <line x1={-5} x2={outerRadius - innerRadius + 10} stroke="#aaa"/>
          </g>
        ))}
        {yScale.ticks(5).map((tick) => (
          <g key={tick} >
            <text y={-yScale(tick)} fill="#1a1a1a" dy="0.35em" textAnchor="middle" stroke="#fff" strokeWidth={5}>{tick}</text>
            <text y={-yScale(tick)} fill="#1a1a1a" dy="0.35em" textAnchor="middle">{tick}</text>
            <circle r={yScale(tick)} stroke="#aaa" fill="none" strokeOpacity={0.5}/>
          </g>
        ))}
      </g>
    </svg>
  );
}
