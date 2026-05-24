import React from 'react'
import './PersonalInfoCard.css'

const parentInfo = ({student}) => {
  return (
    <div>
        <div className='personalinfo-card-main-div'>
          <p className='profile-name'>Parent Info</p>
            
            <div>
            <p><b>Mother's name</b></p>
            <p>Mamta Sharma</p>
            <p><b>Father's name</b></p>
            <p>Dayanand Sharma</p>
            
            
            </div>
            
            <div>
              <p><b>Mother's contact number</b></p>
            <p>7310895979</p>
            <p><b>Father's contact number</b></p>
            <p>9897653017</p>
            <p><b>Emergancy contact number</b></p>
            <p>9897653017</p>
            <p><b>Father's Email :</b> Dayanand123sharma@gmail.com</p>
            </div>
          </div>
    </div>
  )
}

export default parentInfo