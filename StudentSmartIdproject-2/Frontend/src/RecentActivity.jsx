import React from 'react'
import './RecentActivity.css'

const RecentActivity = ({liveTableData}) => {
  return (
    <div className='RecentActivity-main-div'>
        <div className='RecentActivity-heading'>
            
            <p> 🟢  Live Updates</p> 
        </div>
      <div className='RecentActivity-main-table'>

        <table className='RecentActivity-table'>
            <thead >
                <tr>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Status</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {liveTableData?.length > 0 ? (
                    liveTableData.map((item) => (
                    <tr key={item._id}>
                        <td>{item.studentId?.name}</td>

                        <td>
                        {item.studentId?.classId?.className}-
                        {item.studentId?.classId?.section}
                        </td>

                        <td>{item.status}</td>

                        <td>
                        {new Date(item.entryTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        </td>
                    </tr>
                    ))
                    ) : (
                    <tr>
                    <td colSpan="4">No recent attendance records found</td>
                    </tr>
                    )}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentActivity