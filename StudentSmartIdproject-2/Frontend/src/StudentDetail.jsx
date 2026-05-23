import React from 'react'
import './StudentDetail.css'
import Sidebar from './Sidebar'
import StudentDetailContentPage from './StudentDetailContentPage'

const StudentDetail = () => {
  return (
    <div className='admin-page'>
      {/* sidebar */}
      <Sidebar></Sidebar>
    <StudentDetailContentPage/>
    </div>
  )
}

export default StudentDetail