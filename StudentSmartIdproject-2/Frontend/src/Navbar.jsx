import React from 'react'
import './Navbar.css'
import { Headset } from 'lucide-react';
const Navbar = ({SchoolName}) => {
  return (
    <div className='navbar'>
        <p className='school-name' >{SchoolName}</p>
        <Headset className='support-icon' />
    </div>
  )
}

export default Navbar