import React from 'react'
import './PersonalInfoCard.css'

const PersonalInfoCard = ({student}) => {
  return (
    <div>
        <div className='personalinfo-card-main-div'>
            <p className='profile-name'>Personal Info</p>
            <p><b>DOB</b>   21/03/2006</p>
            <p><b>Gender male</b></p>
            <p><b>Blood group</b> AB+</p>
            <p><b>Aadhar number</b></p>
            <p>1234 5678 9876</p>
            <p><b>Email</b></p>
            <p>nikhilsharma74540@gmail.com </p>
            <p><b>Nationality</b> India</p>
            <p><b>City</b> Agra</p>
            <p><b>Locality</b> Barauli Ahir</p>
        </div>
    </div>
  )
}

export default PersonalInfoCard