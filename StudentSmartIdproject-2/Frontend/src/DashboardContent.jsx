import React, { useEffect,useState } from 'react'
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
import api from "../src/api/axios.js"
import { toast } from 'react-toastify'

const DashboardContent = () => {

const [schoolName, setSchoolName] = useState("School's Name");
const [totalStudent,setTotalStudent] = useState(0);
const [totalPresentToday,setTotalPresentToday] = useState(0);
const [totalAbsentToday,setTotalAbsentToday] = useState(0);
const [totalLateToday,setTotalLateToday] = useState(0);
const [weeklyData,setWeeklyData] = useState([0,0,0,0,0,0,0]);
const [liveTableData,setLiveTableData] = useState([]);
useEffect(() => {

    const getSchoolName = async () => {
        try {
            const response = await api.get("/schoolSetting");
            const dashboardData = await api.get("/dashboard/stats");
            const weeklyData = await api.get("/dashboard/weeklystats");
            const liveTableData = await api.get("dashboard/live-activity-table");
            setLiveTableData(liveTableData.data.data);
            setSchoolName(response.data.data[0].schoolName);
            setTotalPresentToday(dashboardData.data.data.totalPresentToday);
            setTotalAbsentToday(dashboardData.data.data.totalAbsentToday)
            setTotalStudent(dashboardData.data.data.totalStudents);
            setTotalLateToday(dashboardData.data.data.totalLateToday);
            setWeeklyData(weeklyData.data.data);
        } catch (error) {
    
            toast.error("Failed to load School data");
        }
    };

    getSchoolName();

}, []);
  return (
    <div className='Dashboard'>
        <Navbar SchoolName={schoolName}/>
        <div className='top-section-card'>
          <CardSmall heading="Total Students" data={totalStudent} detail="Number of registered students 1200" icon={User} />
          <CardSmall heading="Total Present today" data={totalPresentToday} detail="Number of registered students 1200" icon={ UserCheck} />
          <CardSmall heading="Total Absent today" data={totalAbsentToday} detail="Number of registered students 1200" icon={UserRoundX} />
          <CardSmall heading="Total Late enteirs today" data={totalLateToday} detail="Number of registered students 1200" icon={ClockAlert} />
        </div>
        <div className="section-two-chart">
          <AttendancePieChart present={totalPresentToday} absent={totalAbsentToday} late={totalLateToday}></AttendancePieChart>
          <WeeklyBarChart weeklyData={weeklyData} className='WeeklyBarChart'/>
        </div>
        <div className='RecentActivity'>
          <RecentActivity liveTableData={liveTableData}/>
        </div>
    </div>
  )
}

export default DashboardContent