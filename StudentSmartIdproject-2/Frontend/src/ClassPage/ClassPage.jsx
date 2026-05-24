import React from 'react'
import './ClassPage.css'
import Sidebar from '@/Sidebar'
import ClassPageContent from './ClassPageContent'

const ClassPage = () => {
  return (
    <div className='admin-page'>
        <Sidebar/>
        <ClassPageContent />
    </div>
  )
}

export default ClassPage