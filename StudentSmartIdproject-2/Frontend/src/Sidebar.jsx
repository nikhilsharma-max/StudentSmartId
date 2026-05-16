import React from 'react'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
import Sidebarlogo from './Sidebarlogo';
import { LayoutDashboard } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { ClipboardList } from 'lucide-react';
import { Users } from 'lucide-react';
import { Bell } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className='main-div'>
        {/* Admin logo and name */}
        <div>
            <Sidebarlogo/>
        </div>
        <div className='main-option' >
            <SidebarItem icon = {LayoutDashboard} label="Dashboard" status={false} ></SidebarItem>
            <SidebarItem icon = {GraduationCap} label="Student" status={false} ></SidebarItem>
            <SidebarItem icon = {ClipboardList} label="Attendance" status={false} ></SidebarItem>
            <SidebarItem icon = {Users} label="Classes" status={false} ></SidebarItem>
            <SidebarItem icon = {Bell} label="Notification" status={false} ></SidebarItem>
            <SidebarItem icon = {FileText} label="Report" status={false} ></SidebarItem>
        </div>
        <div>

            <SidebarItem icon = {Settings} label="Setting" status={false} ></SidebarItem>
            <SidebarItem icon = {LogOut} label="Logout" status={false} ></SidebarItem>
        </div>

    </div>
  )
}

export default Sidebar