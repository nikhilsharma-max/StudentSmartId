import React from 'react'
import './DashboardContent.css'
import Navbar from './Navbar'
import { CardSmall } from './CardSmall'
import AttendancePieChart from './components/Charts/AttendancePieChart'
import WeeklyBarChart from './components/Charts/WeeklyBarChart'
import RecentActivity from './RecentActivity'
import { User } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { UserRoundX } from 'lucide-react';
import { ClockAlert } from 'lucide-react';

const DashboardContent = () => {
  return (

    
    <div className='Dashboard' >
        <Navbar/>
        <div className='top-section-card'>
          <CardSmall heading="Total Students" data={1200} detail="Number of registered students 1200" icon={User} />
          <CardSmall heading="Total Present today" data={987} detail="Number of registered students 1200" icon={ UserCheck} />
          <CardSmall heading="Total Absent today" data={1200-987} detail="Number of registered students 1200" icon={UserRoundX} />
          <CardSmall heading="Total Late enteirs today" data={19} detail="Number of registered students 1200" icon={ClockAlert} />
        </div>
        <div className="section-two-chart">
          <AttendancePieChart></AttendancePieChart>
          <WeeklyBarChart className='WeeklyBarChart'/>
        </div>
        <div className='RecentActivity'>
          <RecentActivity/>
        </div>

    </div>
  )
}

export default DashboardContent