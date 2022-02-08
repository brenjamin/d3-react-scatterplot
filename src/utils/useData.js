import { useEffect, useState } from "react"
import { json } from "d3"

export const useData = () => {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  const [data, setData] = useState()
  useEffect(() => {
    json(url).then(data => {
      data = data.map(dataPoint => {
        dataPoint.Year = new Date(dataPoint.Year, 0)
        var seconds = new Date(Date.UTC(1970, 0, 1))
        seconds.setUTCSeconds(dataPoint.Seconds)
        dataPoint.Seconds = seconds
        return dataPoint
      })
      setData(data)
    })
  }, [])
  return data
}
