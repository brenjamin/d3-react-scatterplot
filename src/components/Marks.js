export const Marks = ({ data, xScale, xValue, yScale, yValue, innerWidth, innerHeight, onMouseOver, onMouseOut, circleRadius }) => {
  return data.map((dataPoint, index) => {
    const fill = dataPoint.Doping ? "#137B80" : "#E6842A"
    return <circle onMouseOver={onMouseOver} onMouseOut={onMouseOut} key={index} r={circleRadius} cx={xScale(xValue(dataPoint))} cy={yScale(yValue(dataPoint))} stroke="black" strokeWidth="1" fillOpacity="0.8" fill={fill} data-index={index} className="dot" data-xvalue={dataPoint.Year.getFullYear()} data-yvalue={dataPoint.Seconds.toISOString()} />
  })
}
