import React from 'react'
import './SidebarItem.css'

const Sidebarlogo = () => {
  return (
    <div>
        <div className='admin-section'>
            <div className='image-item'>
                <img className='admin-image' src="/user-image.png" alt="logo"/>
            </div>
            <div className='admin-name'>
               Hi,  Nikhil
            </div>
        </div>
        <hr className='admin-line' />
    </div>
  )
}

export default Sidebarlogo