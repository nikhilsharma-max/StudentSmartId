import React from 'react'
import './PersonalInfoCard.css'

const PersonalInfoCard = ({studentData}) => {
  return (
    <div>
        <div className='personalinfo-card-main-div'>
            <p className='profile-name'>Personal Info</p>
            <p><b>DOB</b>    {new Date(studentData?.dateOfBirth).toLocaleDateString()}</p>
            <p><b>Gender {studentData?.gender}</b></p>
            <p><b>Blood group</b> {studentData?.bloodGroup}</p>
            <p><b>Aadhar number</b></p>
            <p>{studentData?.aadhaarNumber}</p>
            <p><b>Email</b></p>
            <p>{studentData?.email} </p>
            <p><b>Nationality</b> {studentData?.nationality}</p>
            <p><b>City</b> {studentData?.address.city}</p>
            <p><b>Locality</b> {studentData?.address.locality}</p>
        </div>
    </div>
  )
}

export default PersonalInfoCard