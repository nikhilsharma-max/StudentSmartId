import React, { useState } from 'react'
import './AttendancePageContent.css'
import Navbar from './Navbar'
import InputComponentAttendancePage from './InputComponentAttendancePage'
import { User } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { UserRoundX } from 'lucide-react';
import { ClockAlert } from 'lucide-react';
import { CardSmall } from './CardSmall'
import { useEffect } from 'react';
import AttendanceRecordTable from './AttendanceRecordTable';
import { toast } from 'react-toastify';
import api from './api/axios';

const AttendancePageContent = () => {
const[students,setStudentAttendanceData] = useState([]);
const [schoolName, setSchoolName] = useState("School's Name");
const [totalStudent,setTotalStudent] = useState(0);
const [totalPresentToday,setTotalPresentToday] = useState(0);
const [totalAbsentToday,setTotalAbsentToday] = useState(0);
const [totalLateToday,setTotalLateToday] = useState(0);
let [attendanceData, setAttendanceData] = useState(students);//real data
let [draftAttendanceData, setDraftAttendanceData] = useState(students);//temporary edit data
let [selectedDate,setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    useEffect(() => {
        const getSchoolName = async () => {
            try {
                const response = await api.get("/schoolSetting");
                const dashboardData = await api.get("/dashboard/stats");
                setSchoolName(response.data.data[0].schoolName);
                setTotalPresentToday(dashboardData.data.data.totalPresentToday);
                setTotalAbsentToday(dashboardData.data.data.totalAbsentToday)
                setTotalStudent(dashboardData.data.data.totalStudents);
                setTotalLateToday(dashboardData.data.data.totalLateToday);
            } catch (error) {
                toast.error("Failed to load School data");
            }
        };
            getSchoolName();
        }, []);
        useEffect(()=>{

            const dateData = async()=>{
                try {
                const response2 = await api.get(
                    `/attendance/date/${selectedDate}`
                );
                const formattedData = response2.data.data.map(
                    (record) => ({
                        attendanceId: record._id,
                        id: record?.studentId?._id,
                        name: record?.studentId?.name,
                        roll: record?.studentId?.rollNumber,
                        class: record?.studentId?.classId?.className,
                        section: record?.studentId?.classId?.section,
                        status: record?.status
                    })
                );
                setStudentAttendanceData(formattedData);
                setDraftAttendanceData(formattedData);
                setAttendanceData(formattedData);

                // console.log(response2.data.data);  
                } catch (error) {
                    toast.error("Failed to load data");
                }
            }
            dateData();
        },[selectedDate]);

    let updateStatus = (studentId, newStatus) => {
        setDraftAttendanceData(
            draftAttendanceData?.map(student =>
                student.id === studentId
                    ? { ...student, status: newStatus }
                    : student
            )
        );
    };
    
    let [fullName,setFullName] = useState("");
    let [selectedClass,setSelectedClass] = useState("");
    let [selectedStatus,setSelectedStatus] = useState("");
    let [selectedSection,setSelectedSection] = useState("");
    let handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    }
    let handleNameChange = (event) =>{
        setFullName(event.target.value);
    }
    let selectClass = (event) =>{
        setSelectedClass(event.target.value);
    }
    let selectStatus = (event) =>{
        setSelectedStatus(event.target.value);
    }
    let selectSection = (event)=>{
        setSelectedSection(event.target.value);
    }
   let saveAttendance = async () => {

  try { toast.success("Attendance saved successfully");
    await api.put(
        
      "/attendance/update-attendance",
      {
        attendance:
          draftAttendanceData
      }
    );
   
    setAttendanceData(
      draftAttendanceData
    );



  } catch(error){
    toast.error(
      "Failed to save attendance"
    );

  }

};

    //Add other filter of date and status after completing backend
    const filteredStudents = draftAttendanceData?.filter((student) => {
      const matchesSearch = student?.name?.toLowerCase().includes(fullName.toLowerCase());
      const matchesClass = selectedClass === "" || student.class === selectedClass;
      const matchesStatus = selectedStatus==="" || student.status === selectedStatus;
      const matchesSection = selectedSection==="" || student.section === selectedSection;
      return matchesSearch && matchesClass && matchesStatus && matchesSection;
    });
    //for markAllPresent button
let markAllPresent = () => {

    const filteredIds = filteredStudents?.map(
        student => student.id
    );

    setDraftAttendanceData(prevData =>
        prevData?.map(student =>
            filteredIds.includes(student.id)
                ? { ...student, status: "Present" }
                : student
        )
    );
}

  return (
    <div className='Attendance-page-content'>
        <Navbar SchoolName={schoolName}/>
        {/* Section 1 - Attendance page header */}
        <div className='Attendance-header'>
            <div className='Attendance-header-left'>
              <p>Attendance Management</p>
              <h1>Track and manage student's attendance</h1>
            </div>
            <div className='Attendance-header-right'>
                <button className='attendance-button'>Export CSV  </button>
                <button className='attendance-button'>Add manual Entry</button>
            </div>
        </div>
        <div className='Attendance-filter-section'>
            <div className='Attendance-filter'>
                <div><p>Filter Results</p></div>
                <InputComponentAttendancePage fullName={fullName} selectedSection ={selectedSection} selectedClass={selectedClass} selectedStatus={selectedStatus} selectedDate={selectedDate} markAllPresent={markAllPresent} handleNameChange={handleNameChange} selectClass={selectClass} selectStatus={selectStatus} handleDateChange={handleDateChange} selectSection={selectSection}/>
            </div>
        </div>
        <div className='attendance-card'>
          <CardSmall heading="Total Students" data={totalStudent} detail="Number of registered students" icon={User} />
          <CardSmall heading="Total Present today" data={totalPresentToday} detail="Students present today" icon={ UserCheck} />
          <CardSmall heading="Total Absent today" data={totalAbsentToday} detail="Students absent today" icon={UserRoundX} />
          <CardSmall heading="Total Late enteirs today" data={totalLateToday} detail="Students late today" icon={ClockAlert} />
        </div>
        {/*Section 2 - Student record table */}
        <div className='student-record-table'>
            <AttendanceRecordTable students={filteredStudents} updateStatus={updateStatus}/>
        </div>
        <div>
            <button onClick={saveAttendance} className='save-attendance-button'>Save Attendance</button>
        </div>
    </div>
  )
}

export default AttendancePageContent