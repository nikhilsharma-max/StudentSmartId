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
import { useNavigate } from 'react-router-dom';


const StudentDetailContentPage = () => {
const [schoolName, setSchoolName] = useState("School's Name");
const [attendanceSummary, setAttendanceSummary] = useState([]);
const [studentDetails, setStudentDetails] = useState(null);
const [attendanceData, setAttendanceData] = useState([]);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteConfirmation, setDeleteConfirmation] = useState("");
const handleDeleteClick = () => {
  setDeleteConfirmation("");
  setShowDeleteModal(true);
};
const confirmDelete = async () => {

  if (
  !studentDetails ||
  deleteConfirmation.trim().toLowerCase() !==
  studentDetails?.name?.trim().toLowerCase()
) {
  toast.error("Student name does not match");
  return;
}

  try {

    await api.delete(
      `/student/${id}`
    );

    toast.success(
      "Student deleted successfully"
    );
    setShowDeleteModal(false);
    navigate("/student");

  } catch (error) {

   

    toast.error(
      "Failed to delete student"
    );
  }
};
let { id } = useParams();
const navigate = useNavigate();
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
      setAttendanceData(response2?.data?.data);
      setSchoolName(
        response?.data?.data[0]?.schoolName
      );

      setAttendanceSummary(
        attendanceSummaryData?.data?.message
      );

      setStudentDetails(
        studentDetailsData?.data?.student
      );

    } catch (error) {
      toast.error(
        "Cannot fetch student's detail"
      );
    }
  };

  getDetails();
}, [id]);
          let present = attendanceSummary?.presentCount;
          let absent = attendanceSummary?.absentCount;
          let late = attendanceSummary?.lateCount;
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
          <button className='edit-student-button' onClick={()=>{navigate(`/student/edit/${id}`)}}>Edit  </button>
          <button
  className="attendance-button"
  onClick={handleDeleteClick}
>
  Remove
</button>
        </div>
      </div>

      {/* Row one  Profile card and attendance summary */}
      <div className='row-one-details'>
        <ProfileCard
          studentData={studentDetails}
          studentId={id}
          setStudentDetails={setStudentDetails}
        />
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
{
  showDeleteModal && (

    <div className="delete-modal-overlay">

      <div className="delete-modal">

        <h2>Delete Student</h2>

        <p>
          This action cannot be undone.
        </p>

        <p>
          Type the student's name to
          confirm deletion:
        </p>

        <div className="student-name-box">
          {studentDetails?.name}
        </div>

        <input
          type="text"
          value={deleteConfirmation}
          onChange={(e) =>
            setDeleteConfirmation(
              e.target.value
            )
          }
          placeholder="Enter student name"
        />

        <div className="modal-buttons">

          <button className='new-btn'
            onClick={() =>
              setShowDeleteModal(false)
            }
          >
            Cancel
          </button>

          <button className='new-btn'
            onClick={confirmDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  )
}
    </div>
  )
}

export default StudentDetailContentPage