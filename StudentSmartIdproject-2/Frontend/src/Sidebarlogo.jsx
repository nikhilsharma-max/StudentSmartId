import React from 'react'
import './SidebarItem.css'
import {PanelRight} from 'lucide-react';
const Sidebarlogo = ({collapse}) => {
  return (
    <div>
        <div className='admin-section'>
          
            <div className='image-item'>
                <img className='admin-image' src="/user-image.png" alt="logo"/>
            </div>
            {!collapse && 
            <div className='admin-name'>
               SmartWalk ID
            </div>
            }
        </div>
      
        
    </div>
  )
}

export default Sidebarlogo