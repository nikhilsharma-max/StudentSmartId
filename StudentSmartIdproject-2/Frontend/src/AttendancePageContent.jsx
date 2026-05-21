import React from 'react'
import './AttendancePageContent.css'
import Navbar from './Navbar'
import InputComponentAttendancePage from './InputComponentAttendancePage'

const AttendancePageContent = () => {
  return (
    <div className='Attendance-page-content'>
        <Navbar/>
        {/* Section 1 - Attendance page header */}
        <div className='Attendance-header'>
            <div className='Attendance-header-left'>
              <p>Attendance Management</p>
              <h1>Track and manage student's attendance</h1>
            </div>
            <div className='Attendance-header-right'>
                <button className='attendance-button'>Export CSV  </button>
                <button className='attendance-button'>Add manual Entry</button>
            </div>
        </div>
        <div className='Attendance-filter-section'>
            <div className='Attendance-filter'>
                <div><p>Filter Results</p></div>
                <InputComponentAttendancePage/>
            </div>
        </div>
    </div>
  )
}

export default AttendancePageContent