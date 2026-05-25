import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import DashboardContent from './DashboardContent'
import StudentPageContent from './StudentPageContent' 
import StudentPage from './StudentPage'
import AttendancePage from './AttendancePage'
import StudentDetail from './StudentDetail'
import ClassPage from './ClassPage/ClassPage'
import AttendancePageContent from './AttendancePageContent'
import ClassPageContent from './ClassPage/ClassPageContent'
import StudentDetailContentPage from './StudentDetailContentPage'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<DashboardContent/>
      },
      {
        path:'/dashboard',
        element:<DashboardContent/>
      },
      {
        path:'/student',
        element:<StudentPageContent/>,
      },
      {
          path:'/student/:id',  
          element:<StudentDetailContentPage/>
        },

      {
        path:'/attendance',
        element:<AttendancePageContent/>
      },
      {
        path:'/classes',
        element:<ClassPageContent/>
      },
      {
        path:'/notification',
        element:<DashboardContent/>
      },
      {
        path:'/report',
        element:<DashboardContent/>
      },
      {
        path:'/settings',
        element:<DashboardContent/>
      },
      {
        path:'/logout',
       element:<DashboardContent/>
      },
      {
        path:'*',
        element:<h1>Kyu suar pana kr rha h</h1>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
