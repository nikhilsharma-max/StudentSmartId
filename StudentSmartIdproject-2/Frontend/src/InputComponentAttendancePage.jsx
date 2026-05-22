import React, { useState } from 'react'
import './InputComponentAttendancePage.css'

const InputComponentAttendancePage = ({fullName,selectedClass,selectedStatus,selectedDate,markAllPresent,handleNameChange,selectClass,selectStatus,handleDateChange}) => {

  return (
    <div>
    <form action="">
        <div className='form-items'>
            <div className='student-search-items'>
          <div className='input-div'>
            <input required className='student-name-input' type="text" placeholder="Search Student" value={fullName} onChange={handleNameChange}/>
        </div>
       <div className='drop-down-div'>
            {/* Dropdown */}
        <select value={selectedClass} onChange={selectClass} name='Class'  id='Class'>
            <option value="">Class</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
            <option value="V">V</option>
            <option value="VI">VI</option>
            <option value="VII">VII</option>
            <option value="VIII">VIII</option>
            <option value="IX">IX</option>
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
        </select>
       </div>
       <div className='drop-down-div'>
            {/* Dropdown */}
        <select value={selectedStatus} onChange={selectStatus} name='Status'  id='Status'>
            <option value="">All</option>
            <option value="on-time">On time</option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
        </select>
       </div>
       <div className='input-div'>
        <input value={selectedDate} onChange={handleDateChange} className='student-name-input' type="date"/>
       </div>
        </div>
        <button type='button' className='header-button' onClick={markAllPresent}>Mark All Present</button>
        <button type='button' className='header-button'>Add Student</button>
        {/* redirect to report page */}
        <button type='button' className='header-button'>Check Report</button> 
        <button type='button' className='date-button'>Student Records of {selectedDate}</button>
        </div>
        
         
    </form>
   
    </div>
  )
}

export default InputComponentAttendancePage