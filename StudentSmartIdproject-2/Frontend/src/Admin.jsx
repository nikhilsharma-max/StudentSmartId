import React from 'react'
import Sidebar from './Sidebar'
import './AdminPage.css'
import DashboardContent from './DashboardContent'
import Navbar from './Navbar'

const Admin = () => {
  return (
    
    <div className='admin-page'>
      {/* sidebar */}
      <Sidebar></Sidebar>
      <DashboardContent/>
    </div>
  )
}

export default Admin

