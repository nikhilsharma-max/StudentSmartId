import React from 'react'
import './ProfileCard.css'

const ProfileCard = ({id}) => {
  return (
   
        <div className='profile-card-main-div'>
            <img className='profile-picture' src="./user-image.png" alt="Profile" />
            <p className='profile-name'>Nikhil Sharma</p>
            <p>Roll no.  {id}</p>
            <p>Class  XII</p>
            <p>Section  A</p>
            <p>Admission no.  9786</p>
            <p>Ph no.  7454088807</p>
            <p>Session 2026-27</p>
        </div>
  )
}

export default ProfileCard