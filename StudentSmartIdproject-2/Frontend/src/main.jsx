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
import SchoolRegister from './Authorization pages/SchoolRegister'
import Login from './Authorization pages/Login'
import VerifyEmail from './Authorization pages/VerifyEmail'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path:"/verify-email",
    element:<VerifyEmail/>
  },
{
path:'',
element:<Login/>
},
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:'/register',
    element:<SchoolRegister/>
  },
  {
    path:'/',
    element:(
      <ProtectedRoute>
        <App/>
      </ProtectedRoute>
      ),
    children:[
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
  <>
    <RouterProvider router={router} />
        <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="light"
      />
  </>
)
