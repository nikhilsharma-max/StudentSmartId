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
import HeatMap from './components/Charts/HeatMap';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api/axios';
import { toast } from 'react-toastify';


const StudentDetailContentPage = () => {
const [schoolName, setSchoolName] = useState("School's Name");
const [attendanceSummary, setAttendanceSummary] = useState([]);
const [studentDetails, setStudentDetails] = useState(null);
const [attendanceData, setAttendanceData] = useState([]);
let { id } = useParams();

useEffect(() => {
  const getDetails = async () => {
    try {
      const response = await api.get("/schoolSetting");
      const attendanceSummaryData = await api.get(
        `/attendance/summary/${id}`
      );
      const studentDetailsData = await api.get(
        `/student/${id}`
      );
      const response2 = await api.get(`/dashboard/heatmap/${id}`);
      setAttendanceData(response2.data.data);
      setSchoolName(
        response.data.data[0].schoolName
      );

      setAttendanceSummary(
        attendanceSummaryData.data.message
      );

      setStudentDetails(
        studentDetailsData.data.student
      );

    } catch (error) {
      console.log(error);
      toast.error(
        "Cannot fetch student's detail"
      );
    }
  };

  getDetails();
}, [id]);
          let present = attendanceSummary.presentCount;
          let absent = attendanceSummary.lateCount;
          let late = attendanceSummary.lateCount;
  return (
    <div className='Dashboard'>
      <Navbar SchoolName={schoolName}/>
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
        <ProfileCard studentData={studentDetails}/>
        <div className='AttendanceSummary'>
          <CardSmall heading="Attendance %" data={((present)/(present+absent)*(100)).toFixed(2)} detail="Total attendance %" icon={ShieldCheck} />
          <CardSmall heading="Present Days" data={present} detail="Days present in school" icon={UserCheck} />
        </div>
        <div className='AttendanceSummary'>
          <CardSmall heading="Absent Days" data={absent} detail="Days absent from school" icon={UserRoundX} />
          <CardSmall heading="Late entries" data={late} detail="Days come late to school" icon={ClockAlert} />
        </div>
        <div className='personal-info-div'>
          <PersonalInfoCard studentData={studentDetails}/>
        </div>
      </div>
      <div className='parent-info-and-chart'>
        <div className='parent-info-div'>
          <ParentInfo studentData={studentDetails}/>
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