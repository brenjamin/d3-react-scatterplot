import { useEffect, useRef } from "react"
import { select, axisLeft, timeFormat } from "d3"

export const AxisLeft = ({ yScale, innerWidth }) => {
  const yRef = useRef()
  useEffect(() => {
    const yAxisG = select(yRef.current)
    const yAxis = axisLeft(yScale).tickFormat(timeFormat("%M:%S"))
    yAxisG.call(yAxis)
  }, [])

  return <g id="y-axis" ref={yRef} />
}
