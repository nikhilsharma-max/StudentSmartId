import React from 'react'
import './StudentRecordTable.css'
import { Eye } from 'lucide-react';
const students = [
  {
    id: 1,
    name: "Nikhil",
    roll: 13,
    class: "10-A",
    status: "On time"
  },

  {
    id: 2,
    name: "Rahul",
    roll: 25,
    class: "9-B",
    status: "Late"
  },

  {
    id: 3,
    name: "Riya",
    roll: 18,
    class: "11-C",
    status: "Absent"
  }
];
const StudentRecordTable = () => {
  return (
    <div className='Search-student-main-div'>
        <div className='Search-student-heading'>
            
            <p> Search student</p> 
        </div>
      <div className='Search-student-main-table'>

        <table className='Search-student-table'>
            <thead >
                <tr>
                    <th>Name</th>
                    <th>Roll no.</th>
                    <th>Class</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                students.map((student) => (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.roll}</td>
                    <td>{student.class}</td>
                    <td>{student.status}</td>
                    <td>
                            <button className='action-button'>View <Eye className='eye-icon'/></button>
                            
                  
                        
                    </td>
                </tr>                   
                ))
            }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentRecordTable