import React, { useState } from 'react'
import './SidebarItem.css'


const SidebarItem = ({icon,label,isActive,collapse,onClick}) => {
    let Icon = icon;
    // let [isActive,setIsActive] = useState(status);
    // let setActive = ()=>{
    //   setIsActive(true);
    // }
  return (
    <div className={isActive ? "activeSidebarItem" : "SidebarItem"} onClick={onClick}>
        <div className='items' >
            <Icon className='item-icon item'/>
            {!collapse && <h3 className='item' >{label}</h3>}
           
        </div>
    </div>
  )
}

export default SidebarItem