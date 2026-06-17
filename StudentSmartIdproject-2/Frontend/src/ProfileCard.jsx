import React from 'react'
import './ProfileCard.css'

const ProfileCard = ({studentData}) => {
  return (
   
        <div className='profile-card-main-div'>
            <img className='profile-picture' src="/user-nikhil.png" alt="Profile" />
            <p className='profile-name'>{studentData?.name}</p>
            <p>Roll no.   {studentData?.rollNumber}</p>
            <p>Class  {studentData?.classId.className}</p>
            <p>Section  {studentData?.section}</p>
            <p>Admission no.  {studentData?.admissionNumber}</p>
            <p>Ph no.  {studentData?.phone}</p>
            <p>Session {studentData?.session}</p>
        </div>
  )
}

export default ProfileCard