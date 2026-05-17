import React from 'react'
import './Navbar.css'
import { Headset } from 'lucide-react';
const Navbar = () => {
  return (
    <div className='navbar'>
        <p className='school-name' >School's name</p>
        <Headset className='support-icon' />
    </div>
  )
}

export default Navbar