import React, { useState } from 'react'
import './InputComponent.css'
const InputComponent = () => {
    let [fullName,setFullName] = useState("");
    let handleNameChange = (event) =>{
        setFullName(event.target.value);
    }
  return (
    <form action="">
        <div className='form-items'>
            <div className='student-search-items'>
          <div className='input-div'>
            <input required className='student-name-input' type="text" placeholder="Search Student" value={fullName} onChange={handleNameChange}/>
        </div>
       <div className='drop-down-div'>
            {/* Dropdown */}
        <select required name='Class'  id='Class'>
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
        <div className='search-button header-button'>
            <button >Search</button>
            
        </div>
        </div>
        <button type='button' className='header-button'>+ Add Student</button> 
        </div>
         
    </form>
  )
}

export default InputComponent