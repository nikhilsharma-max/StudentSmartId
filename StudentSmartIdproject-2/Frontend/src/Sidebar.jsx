import React,{useEffect, useState} from 'react'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
import Sidebarlogo from './Sidebarlogo';
import {Link,NavLink} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import api from './api/axios';
import { toast } from 'react-toastify';
import { LogOut,PanelRight,Settings,FileText,Bell,Users,ClipboardList,GraduationCap,LayoutDashboard } from 'lucide-react';


const Sidebar = () => {
    let [userName,setUserName] = useState("User");
    let [activeItem,setActiveItem] = useState("Dashboard");
    let [collapse,setCollapse] = useState(false);
    const location = useLocation();
    let setCollapseState = ()=>{
        setCollapse(!collapse);
        
    }
    useEffect(()=>{
        try {
            const getUserData = async()=>{
                const response = await api.get("/auth/me");
                setUserName(response?.data?.decoded?.username.split(" ")[0]);
            }
             getUserData();
        } catch (error) {
            toast.error("Failed to load user data");
        }
       
    },[]);
  return (
    <div className={collapse?'main-div-collapse' :'main-div'}>
        {/* Admin logo and name */}
       
        <div className={collapse? 'sidebar-userpanel-collapse':'sidebar-userpanel'}>
            
            <Sidebarlogo userName={userName} collapse={collapse} />
             <PanelRight onClick={setCollapseState} className={collapse? 'collapse-icon-collapse':'collapse-icon'} />
            
        </div>
        
        <hr />
        <div className='main-option' >
            <NavLink to="/dashboard">
                <SidebarItem icon = {LayoutDashboard} label="Dashboard" isActive={location.pathname === "/dashboard"} collapse={collapse}></SidebarItem>
            </NavLink>

            <NavLink to="/student">
                <SidebarItem icon = {GraduationCap} label="Student" isActive={location.pathname === "/student"} collapse={collapse}  ></SidebarItem>
            </NavLink>

            <NavLink to="/attendance">
                <SidebarItem icon = {ClipboardList} label="Attendance" isActive={location.pathname === "/attendance"} collapse={collapse}></SidebarItem>
            </NavLink>

            <NavLink to="/classes">
                <SidebarItem icon = {Users} label="Classes" isActive={location.pathname === "/classes"} collapse={collapse}></SidebarItem>
            </NavLink>
            <NavLink to="/notification">
                <SidebarItem icon = {Bell} label="Notification" isActive={location.pathname === "/notification"} collapse={collapse} ></SidebarItem>
            </NavLink>
            <NavLink to="/report">
                <SidebarItem icon = {FileText} label="Report" isActive={location.pathname === "/report"} collapse={collapse}></SidebarItem>
            </NavLink>
    
            
            
            
            
            
        </div>
        <div className='bottom-section'>
            <NavLink to="/settings">
                <SidebarItem icon = {Settings} label="Setting" isActive={location.pathname === "/settings"} collapse={collapse}></SidebarItem>
            </NavLink>
            <NavLink to="/logout">
                <SidebarItem icon = {LogOut} label="Logout" isActive={location.pathname === "/logout"} collapse={collapse} ></SidebarItem>
            </NavLink>  
            
            
        </div>

    </div>
  )
}

export default Sidebar