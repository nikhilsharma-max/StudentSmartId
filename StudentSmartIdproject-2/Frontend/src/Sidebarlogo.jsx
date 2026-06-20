import React from 'react'
import './SidebarItem.css'

const Sidebarlogo = ({userName,collapse}) => {
  return (
    <div>
        <div className='admin-section'>
          
            <div className='image-item'>
                <img className='admin-image' src="/user-image.png" alt="logo"/>
            </div>
            {!collapse && 
            <div className='admin-name'>
               Welcome {userName}
            </div>
            }
        </div>
           
    </div>
  )
}

export default Sidebarlogo