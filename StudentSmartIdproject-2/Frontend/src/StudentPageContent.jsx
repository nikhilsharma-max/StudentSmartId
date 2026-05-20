import React from 'react'
import Navbar from './Navbar'
import './StudentPageContent.css'
import InputComponent from './InputComponent'
import StudentRecordTable from './StudentRecordTable'

const StudentPageContent = () => {
  return (
    <div className='StudentPageContent'>
        <Navbar/>
        {/* Section 1 - Student record header */}
        <div className='students-header'>
            <div className='students-header-left'>
              <p>Student Records</p>
              <h1>Manage and monitor student records</h1>
            </div>
            <div className='students-header-right'>
                {/* search bar, filter bar -- class section(dropdown), add student button */}
                <InputComponent/>
            </div>
        </div>
        
        {/*Section 2 - Student record table */}
        <div className='student-record-table'>
            <StudentRecordTable/>
        </div>

    </div>
  )
}

export default StudentPageContent