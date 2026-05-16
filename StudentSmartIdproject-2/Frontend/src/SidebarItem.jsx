import React from 'react'
import './SidebarItem.css'


const SidebarItem = ({icon,label,status}) => {
    let Icon = icon;
    function selectItem(){
      status = true;
      console.log(status);
    }
  return (
    <div className='SidebarItem' onClick={selectItem} >
        <div className='items' >
            <Icon className='item-icon item'/>
            <h3 className='item' >{label}</h3>
        </div>
        <div className='status' ></div>
    </div>
  )
}

export default SidebarItem