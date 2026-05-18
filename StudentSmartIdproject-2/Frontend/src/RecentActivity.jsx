import React from 'react'
import './RecentActivity.css'

const RecentActivity = () => {
  return (
    <div className='RecentActivity-main-div'>
        <table>
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Status</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nikhil</td>
                    <td>10-A</td>
                    <td>On time</td>
                    <td>8:19</td>
                </tr>
                <tr>
                    <td>Rahul</td>
                    <td>10-B</td>
                    <td>On time</td>
                    <td>8:14</td>
                </tr>
                <tr>
                    <td>Riya</td>
                    <td>9-C</td>
                    <td>Late</td>
                    <td>8:32</td>
                </tr>
                <tr>
                    <td>Amit</td>
                    <td>11-D</td>
                    <td>On time</td>
                    <td>7:59</td>
                </tr>
                <tr>
                    <td>Meena</td>
                    <td>12-PCM</td>
                    <td>Late</td>
                    <td>8:39</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default RecentActivity