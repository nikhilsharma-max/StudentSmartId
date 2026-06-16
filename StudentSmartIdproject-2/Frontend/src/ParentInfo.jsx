import React from 'react'
import './PersonalInfoCard.css'

const parentInfo = ({studentData}) => {
  return (
    <div>
        <div className='personalinfo-card-main-div'>
          <p className='profile-name'>Parent Info</p>
            
            <div>
            <p><b>Mother's name</b></p>
            <p>{studentData?.parentInfo.motherName}</p>
            <p><b>Father's name</b></p>
            <p>{studentData?.parentInfo.fatherName}</p>
            
            
            </div>
            
            <div>
              <p><b>Mother's contact number</b></p>
            <p>{studentData?.parentInfo.motherPhone}</p>
            <p><b>Father's contact number</b></p>
            <p>{studentData?.parentInfo.fatherPhone}</p>
            <p><b>Emergancy contact number</b></p>
            <p>{studentData?.parentInfo.emergencyContact}</p>
            <p><b>Father's Email :</b> {studentData?.parentInfo.fatherEmail}</p>
            </div>
          </div>
    </div>
  )
}

export default parentInfo