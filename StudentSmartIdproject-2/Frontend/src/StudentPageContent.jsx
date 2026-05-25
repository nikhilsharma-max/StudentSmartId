import React from 'react'
import Navbar from './Navbar'
import './StudentPageContent.css'
import InputComponent from './InputComponent'
import StudentRecordTable from './StudentRecordTable'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const students = [
  {
    id: 1,
    name: "Nikhil",
    roll: 13,
    class: "X",
    status: "On time"
  },

  {
    id: 2,
    name: "Rahul",
    roll: 25,
    class: "IX",
    status: "Late"
  },

  {
    id: 3,
    name: "Riya",
    roll: 18,
    class: "LKG",
    status: "Absent"
  }
];


const StudentPageContent = () => {

    let [fullName,setFullName] = useState("");
    let [selectedClass, setSelectedClass] = useState("")
    let handleNameChange = (event) =>{
        setFullName(event.target.value);
    }
    let selectClass = (event)=>{
        setSelectedClass(event.target.value);
    }
    const filteredStudents = students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(fullName.toLowerCase());
      const matchesClass = selectedClass === "" || student.class === selectedClass;
      return matchesSearch && matchesClass;
    }
  )
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
                <InputComponent fullName={fullName} selectedClass={selectedClass} handleNameChange={handleNameChange} selectClass={selectClass}/>
            </div>
        </div>
        
        {/*Section 2 - Student record table */}
        <div className='student-record-table'>
            <StudentRecordTable students={filteredStudents}/>
        </div>
    </div>
  )
}

export default StudentPageContent