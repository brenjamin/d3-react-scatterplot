import "./App.css"
import React from "react"
import { scaleTime, timeYear, max, min } from "d3"
import { useData } from "./utils/useData"
import { Marks } from "./components/Marks"
import { Legend } from "./components/Legend"
import { Tooltip } from "./components/Tooltip"
import { AxisBottom } from "./components/AxisBottom"
import { AxisLeft } from "./components/AxisLeft"

const width = 960
const height = 500
const margin = { top: 50, bottom: 20, left: 80, right: 20 }

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
const dateToMMSS = date => {
  return date.toISOString().substr(14, 5)
}

const App = () => {
  let data = useData()

  if (!data) {
    return <pre>Loading...</pre>
  }

  const xValue = d => d.Year
  const yValue = d => d.Seconds
  const circleRadius = 6

  const xScale = scaleTime()
    .domain([timeYear.offset(min(data, xValue), -1), timeYear.offset(max(data, xValue), 1)])
    .range([0, innerWidth])

  const yScale = scaleTime()
    .domain([max(data, yValue), min(data, yValue)])
    .range([innerHeight, 0])

  const handleMouseOver = e => {
    const index = e.target.dataset.index
    const dataPoint = data[index]
    const x = parseInt(e.target.getAttribute("cx")) + 100
    const y = parseInt(e.target.getAttribute("cy"))
    const tooltip = document.querySelector("#tooltip")
    tooltip.style.transform = `translate(${x}px, ${y}px)`
    tooltip.style.opacity = 1
    tooltip.style.visibility = "visible"
    tooltip.dataset.year = dataPoint.Year.getFullYear()
    tooltip.innerHTML = `${dataPoint.Name}: ${dataPoint.Nationality}<br/>Year: ${dataPoint.Year.getFullYear()}, Time: ${dateToMMSS(dataPoint.Seconds)}${dataPoint.Doping ? "<br/><br/>" + dataPoint.Doping : ""}`
  }

  const handleMouseOut = e => {
    e.target.setAttribute("opacity", "1")
    const tooltip = document.querySelector("#tooltip")
    tooltip.style.opacity = 0
    tooltip.style.visibility = "hidden"
  }

  return (
    <main>
      <div className="svg-wrapper">
        <Tooltip margin={margin} />
        <svg width={width} height={height}>
          <Legend innerWidth={innerWidth} innerHeight={innerHeight} />
          <text stroke="black" x={width / 2} y={margin.top - 25} id="title" textAnchor="middle">
            <tspan>Doping in Professional Bicylce Racing</tspan>
            <tspan className="title-small" x={width / 2} dy="1.2em">
              35 Fastest times up Alpe d'Huez
            </tspan>
          </text>
          <text transform={`translate(${margin.left - 60}, ${innerHeight / 2}) rotate(-90)`} textAnchor="middle">
            Time in Minutes
          </text>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom xScale={xScale} innerHeight={innerHeight} />
            <AxisLeft yScale={yScale} innerWidth={innerWidth} />
            <Marks data={data} xScale={xScale} xValue={xValue} yScale={yScale} yValue={yValue} innerWidth={innerWidth} innerHeight={innerHeight} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} circleRadius={circleRadius} />
          </g>
        </svg>
      </div>
    </main>
  )
}

export default App
