import React,{useState} from 'react'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
import Sidebarlogo from './Sidebarlogo';

import { LogOut,PanelRight,Settings,FileText,Bell,Users,ClipboardList,GraduationCap,LayoutDashboard } from 'lucide-react';


const Sidebar = () => {
    let [activeItem,setActiveItem] = useState("Dashboard");
    let [collapse,setCollapse] = useState(false);
    let setCollapseState = ()=>{
        setCollapse(!collapse);
        console.log("Collapse state ",collapse);
    }
  return (
    <div className={collapse?'main-div-collapse' :'main-div'}>
        {/* Admin logo and name */}
       
        <div className={collapse? 'sidebar-userpanel-collapse':'sidebar-userpanel'}>
            
            <Sidebarlogo collapse={collapse} />
             <PanelRight onClick={setCollapseState} className={collapse? 'collapse-icon-collapse':'collapse-icon'} />
            
        </div>
        
        <hr />
        <div className='main-option' >
            <SidebarItem icon = {LayoutDashboard} label="Dashboard" isActive={activeItem === "Dashboard"} collapse={collapse} onClick={() => setActiveItem("Dashboard")  }  ></SidebarItem>
            <SidebarItem icon = {GraduationCap} label="Student" isActive={activeItem === "Student"} collapse={collapse} onClick={() => setActiveItem("Student")}  ></SidebarItem>
            <SidebarItem icon = {ClipboardList} label="Attendance" isActive={activeItem === "Attendance"} collapse={collapse} onClick={() => setActiveItem("Attendance")}  ></SidebarItem>
            <SidebarItem icon = {Users} label="Classes" isActive={activeItem === "Classes"} collapse={collapse} onClick={() => setActiveItem("Classes")}  ></SidebarItem>
            <SidebarItem icon = {Bell} label="Notification" isActive={activeItem === "Notification"} collapse={collapse} onClick={() => setActiveItem("Notification")}  ></SidebarItem>
            <SidebarItem icon = {FileText} label="Report" isActive={activeItem === "Report"} collapse={collapse} onClick={() => setActiveItem("Report")}  ></SidebarItem>
        </div>
        <div>

            <SidebarItem icon = {Settings} label="Setting" isActive={activeItem === "Setting"} collapse={collapse} onClick={() => setActiveItem("Setting")}  ></SidebarItem>
            <SidebarItem icon = {LogOut} label="Logout" isActive={activeItem === "Logout"} collapse={collapse} onClick={() => setActiveItem("Logout")}  ></SidebarItem>
        </div>

    </div>
  )
}

export default Sidebar