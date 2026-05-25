import React from 'react'
import './StudentRecordTable.css'
import { Eye } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const StudentRecordTable = ({ students }) => {
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
                  <td>
                    <span
                      className={
                        student.status === "On time"
                          ? "status-green"

                          : student.status === "Late"
                            ? "status-yellow"

                            : "status-red"
                      }
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <NavLink to={`${student.id}`}>
                      <button className='action-button'>View <Eye className='eye-icon' /></button>
                    </NavLink>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <p className='number-of-students'>
        Showing {students.length} students
      </p>
    </div>
  )
}

export default StudentRecordTable