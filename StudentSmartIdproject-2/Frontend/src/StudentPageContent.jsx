import React, { useEffect } from 'react'
import Navbar from './Navbar'
import './StudentPageContent.css'
import InputComponent from './InputComponent'
import StudentRecordTable from './StudentRecordTable'
import { useState } from 'react'
import api from "../src/api/axios.js"
import { toast } from 'react-toastify'

const StudentPageContent = () => {
const [students, setStudents] = useState([]);
const [schoolName, setSchoolName] = useState("School's Name");

useEffect(() => {
  const getData = async () => {
    try {
      const response = await api.get("/student");
      const response2 = await api.get("/schoolSetting");
      setSchoolName(response2.data.data[0].schoolName);
      const formattedStudents = response.data.data.map((student) => ({
        id:student._id,
        name: student.name,
        class: student.classId?.className,
        section:student.classId?.section,
        status: student.status,
        roll: student.rollNumber,
      }));

      setStudents(formattedStudents);
    } catch (error) {
      toast.error("Failed to load students' data, Kindly refresh");
    }
  };

  getData();
}, []);

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
        <Navbar SchoolName={schoolName}/>
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