import React, { useState } from 'react'
import './InputComponent.css'
import { useNavigate } from 'react-router-dom';

const InputComponent = ({fullName,selectedClass,handleNameChange,selectClass,selectedSection,selectSection}) => {
const navigate = useNavigate();
  return (
    <form action="">
        <div className='form-items'>
            <div className='student-search-items'>
          <div className='input-div'>
            <input required className='student-name-input' type="text" placeholder="Search Student" value={fullName} onChange={handleNameChange}/>
        </div>
       <div className='drop-down-div'>
            {/* Dropdown */}
        <select value={selectedClass} onChange={selectClass} name='Class'  id='Class'>
            <option value="">Class</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
            <option value="V">V</option>
            <option value="VI">VI</option>
            <option value="VII">VII</option>
            <option value="VIII">VIII</option>
            <option value="IX">IX</option>
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
        </select>
       </div>

       <div className='drop-down-div'>
            {/* Dropdown */}
        <select value={selectedSection} onChange={selectSection} name='section'  id='section'>
            <option value="">Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
        </select>
       </div>


        </div>
        <button type='button' className='header-button'  onClick={() => navigate('/student/add')} >+ Add Student</button> 
        </div>
         
    </form>
  )
}

export default InputComponent