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



const COLORS = ['#22c55e', '#ef4444', '#f59e0b']

const AttendancePieChart = ({present,absent,late}) => {
const data = [
  { name: "Present", value: present },
  { name: "Absent", value: absent },
  { name: "Late", value: late}
]
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