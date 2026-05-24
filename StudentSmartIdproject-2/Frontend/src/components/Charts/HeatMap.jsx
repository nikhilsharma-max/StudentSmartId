import React from 'react'
import './HeatMap.css'
const HeatMap = ({attendanceData}) => {
  return (
<div className="heatmap">
  {attendanceData.map((record) => (
    <div
      key={record.day}
      className={`day-box ${record.status.toLowerCase()}`}
    >
      {record.day}
    </div>
  ))}
</div>
  )
}

export default HeatMap