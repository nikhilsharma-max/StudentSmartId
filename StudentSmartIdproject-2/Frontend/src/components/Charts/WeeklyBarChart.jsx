import React from 'react'
import './WeeklyBarChart.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const data = [
  { name: 'Monday', Present: 1000 },
  { name: 'Tuesday', Present: 1000 },
  { name: 'Wed', Present: 900 },
  { name: 'Thursday', Present: 780 },
  { name: 'Friday', Present: 890 },
  { name: 'Saturday', Present: 390 },
  { name: 'Sunday', Present: 150 },
];

const WeeklyBarChart = () => {
  return (
    <div className='barchart-main-div'>
      
      <div className='barchart-title'>
        <p>Weekly Attendance Report</p>
      </div>

      <div className='barchart-chart'>

        <ResponsiveContainer width="100%" height={300}>
          
          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="Present"
              fill="#8884d8"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default WeeklyBarChart