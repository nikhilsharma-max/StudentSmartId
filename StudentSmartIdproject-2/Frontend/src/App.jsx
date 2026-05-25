import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='admin-page'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default App