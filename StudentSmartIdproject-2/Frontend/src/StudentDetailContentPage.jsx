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
        <div>
          <WeeklyBarChart className='weeklyreport-viewpage'/>
        </div>
      </div>
    </div>
  )
}

export default StudentDetailContentPage