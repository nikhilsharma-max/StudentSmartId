import React from 'react'
import './AttendancePieChart.css'

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts'

const data = [
  { name: "Present", value: 987 },
  { name: "Absent", value: 213 },
  { name: "Late", value: 19 }
]

const COLORS = ['#22c55e', '#ef4444', '#f59e0b']

const AttendancePieChart = () => {

  return (

    <div className='AttendancePieChart-main'>

      <div className='AttendancePieChart-heading'>
        <p>Attendance Overview</p>
      </div>

      <div className='AttendancePieChart-chart'>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              isAnimationActive={true}
            >

              {
                data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))
              }

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default AttendancePieChart