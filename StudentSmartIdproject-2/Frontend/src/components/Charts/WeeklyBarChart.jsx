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



const WeeklyBarChart = ({weeklyData}) => {
  const data = [
  { name: 'Monday', Present: weeklyData[6].present },
  { name: 'Tuesday', Present: weeklyData[0].present },
  { name: 'Wed', Present: weeklyData[1].present },
  { name: 'Thursday', Present: weeklyData[2].present },
  { name: 'Friday', Present: weeklyData[3].present },
  { name: 'Saturday', Present: weeklyData[4].present },
  { name: 'Sunday', Present: weeklyData[5].present },
];
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