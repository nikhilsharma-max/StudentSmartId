import React from 'react'

const AttendanceRecordTable = ({students,updateStatus}) => {
  return (
    <div className='Search-student-main-div'>
      <div className='Search-student-heading'>
        <p> Manage Attendance</p>
      </div>
      <div className='Search-student-main-table'>
        <table className='Search-student-table'>
          <thead >
            <tr>
              <th>Name</th>
              <th>Current Status</th>
              <th>Mark Attendance</th>
              <th>Roll no.</th>
              <th>Class</th>

            </tr>
          </thead>
          <tbody>
            {
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
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
                    <button className='status-green' onClick={()=>updateStatus(student.id,"On time")}>On time</button>
                    <button className='status-yellow' onClick={()=>updateStatus(student.id,"Late")}>Late</button>
                    <button className='status-red' onClick={()=>updateStatus(student.id,"Absent")}>Absent</button>
                  </td>
                  <td>{student.roll}</td>
                  <td>{student.class}</td>

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

export default AttendanceRecordTable