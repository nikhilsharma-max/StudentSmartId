import React from 'react'
import Sidebar from './Sidebar'
import AttendancePageContent from './AttendancePageContent'

const AttendancePage = () => {
  return (
    <div className='admin-page'>
        <Sidebar></Sidebar>
        <AttendancePageContent/>
    </div>
  )
}

export default AttendancePage