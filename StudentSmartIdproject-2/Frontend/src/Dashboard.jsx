import React from 'react'
import Sidebar from './Sidebar'
import DashboardContent from './DashboardContent'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='admin-page'>
      {/* sidebar */}
      <Sidebar></Sidebar>
      <DashboardContent/>
    </div>
  )
}

export default Dashboard