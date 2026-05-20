import React from 'react'
import './Dashboard.css'
import Sidebar from './Sidebar'
import StudentPageContent from './StudentPageContent'


const StudentPage = () => {
  return (
    <div className='admin-page'>
      {/* sidebar */}
      <Sidebar></Sidebar>
      <StudentPageContent/>
    </div>
  )
}

export default StudentPage