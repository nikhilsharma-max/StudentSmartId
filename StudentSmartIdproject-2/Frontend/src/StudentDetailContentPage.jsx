import React from 'react'
import './StudentDetailContentPage.css'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'
import { ShieldCheck } from 'lucide-react';
import { CardSmall } from './CardSmall'
import { UserCheck } from 'lucide-react';
import { UserRoundX } from 'lucide-react';
import { ClockAlert } from 'lucide-react';
import PersonalInfoCard from './PersonalInfoCard';
import ParentInfo from './ParentInfo';
import WeeklyBarChart from './components/Charts/WeeklyBarChart';
import HeatMap from './components/Charts/HeatMap';
const attendanceData = [
  { day: 1, status: "Present" },
  { day: 2, status: "Present" },
  { day: 3, status: "Late" },
  { day: 4, status: "Present" },
  { day: 5, status: "Present" },
  { day: 6, status: "Present" },
  { day: 7, status: "Absent" },

  { day: 8, status: "Present" },
  { day: 9, status: "Late" },
  { day: 10, status: "Present" },
  { day: 11, status: "Present" },
  { day: 12, status: "Present" },
  { day: 13, status: "Absent" },
  { day: 14, status: "Absent" },

  { day: 15, status: "Present" },
  { day: 16, status: "Present" },
  { day: 17, status: "Late" },
  { day: 18, status: "Present" },
  { day: 19, status: "Present" },
  { day: 20, status: "Present" },
  { day: 21, status: "Absent" },

  { day: 22, status: "Present" },
  { day: 23, status: "Present" },
  { day: 24, status: "Present" },
  { day: 25, status: "Late" },
  { day: 26, status: "Present" },
  { day: 27, status: "Present" },
  { day: 28, status: "Absent" },

  { day: 29, status: "Absent" },
  { day: 30, status: "Present" },
  { day: 31, status: "Absent" },
];

const StudentDetailContentPage = () => {
          let present = 198;
          let absent = 26;
          let late = 13
  return (
    <div className='Dashboard'>
      <Navbar />
      {/* Section 1 - Attendance page header */}
      <div className='Attendance-header'>
        <div className='Attendance-header-left'>
          <p>Student Detail</p>
          <h1>Check and Edit student details</h1>
        </div>
        <div className='Attendance-header-right'>
          <button className='edit-student-button'>Edit  </button>
          <button className='attendance-button'>Remove</button>
        </div>
      </div>

      {/* Row one  Profile card and attendance summary */}
      <div className='row-one-details'>
        <ProfileCard/>
        <div className='AttendanceSummary'>
          <CardSmall heading="Attendance %" data={((present)/(present+absent)*(100)).toFixed(2)} detail="Total attendance %" icon={ShieldCheck} />
          <CardSmall heading="Present Days" data={present} detail="Days present in school" icon={UserCheck} />
        </div>
        <div className='AttendanceSummary'>
          <CardSmall heading="Absent Days" data={absent} detail="Days absent from school" icon={UserRoundX} />
          <CardSmall heading="Late entries" data={late} detail="Days come late to school" icon={ClockAlert} />
        </div>
        <div className='personal-info-div'>
          <PersonalInfoCard/>
        </div>
      </div>
      <div className='parent-info-and-chart'>
        <div className='parent-info-div'>
          <ParentInfo/>
        </div>
        <div className='parent-info-div'>
          <p>Attendace heatmap</p>
          <HeatMap attendanceData={attendanceData}/>
        </div>
      </div>
    </div>
  )
}

export default StudentDetailContentPage