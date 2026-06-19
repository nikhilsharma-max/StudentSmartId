import React, {
  useEffect,
  useState
} from "react";

import "./SchoolSettingsPageContent.css";
import Navbar from "../Navbar";
import api from "../api/axios";
import { toast } from "react-toastify";

import {
  School,
  Users,
  GraduationCap,
  Layers3
} from "lucide-react";

const SchoolSettingsPageContent = () => {

  const [loading,setLoading] =
    useState(false);

  const [classes,setClasses] =
    useState([]);

  const [teachers,setTeachers] =
    useState([]);

  const [stats,setStats] =
    useState({});

  const [schoolData,setSchoolData] =
    useState({
      schoolName:"",
      schoolEmail:"",
      schoolPhone:"",
      schoolAddress:"",
      principalName:"",
      currentSession:"2026-27"
    });

  const [classForm,setClassForm] =
    useState({
      className:"",
      section:"",
      session:"2026-27"
    });

  const [teacherForm,setTeacherForm] =
    useState({
      name:"",
      employeeId:"",
      email:"",
      phone:"",
      gender:"Male",
      designation:"",
      password:"",
      confirmPassword:""
    });

  useEffect(() => {

    const loadData = async() => {

      try{

        const schoolRes =
          await api.get(
            "/schoolSetting"
          );

        const classRes =
          await api.get(
            "/classes"
          );
        const teacherRes =
          await api.get(
            "/teacher"
          );

        const statsRes =
          await api.get(
            "/dashboard/stats"
          );

        setClasses(
          classRes.data.classes || []
        );

        setTeachers(
          teacherRes.data.teacherData || []
        );

        setStats(
          statsRes.data.data || {}
        );

        if(
          schoolRes.data.data &&
          schoolRes.data.data.length > 0
        ){

          const school =
            schoolRes.data.data[0];

          setSchoolData({

            schoolName:
              school.schoolName || "",

            schoolEmail:
              school.schoolEmail || "",

            schoolPhone:
              school.schoolPhone || "",

            schoolAddress:
              school.schoolAddress || "",

            principalName:
              school.principalName || "",

            currentSession:
              school.currentSession ||
              "2026-27"
          });

        }

      }
      catch(error){

        console.log(error);

        toast.error(
          "Failed to load settings"
        );

      }

    };

    loadData();

  },[]);

  const handleSchoolChange =
    (e) => {

      setSchoolData(prev => ({
        ...prev,
        [e.target.name]:
          e.target.value
      }));

  };

  const handleClassChange =
    (e) => {

      setClassForm(prev => ({
        ...prev,
        [e.target.name]:
          e.target.value
      }));

  };

  const handleTeacherChange =
    (e) => {

      setTeacherForm(prev => ({
        ...prev,
        [e.target.name]:
          e.target.value
      }));

  };

  const saveSchoolSettings =
    async() => {

      try{

        setLoading(true);
        if(
          !schoolData?.schoolName?.trim()
        ){
          toast.error(
            "School name is required"
          );
          return;
        }

        if(
          !schoolData?.currentSession?.trim()
        ){
          toast.error(
            "Session is required"
          );
          return;
        }
        await api.patch(
          "/schoolsetting",
          schoolData
        );

        toast.success(
          "Settings updated"
        );

      }
      catch(error){

        toast.error(
          "Failed to update settings"
        );

      }
      finally{

        setLoading(false);

      }

  };

  return (

    <div className="settings-page">

      <Navbar
  SchoolName={
    schoolData?.schoolName ||
    "School's Name"
  }
/>

      <div className="settings-container">

        <div className="settings-header">

          <h1>
            School Settings
          </h1>

          <p>
            Manage school information,
            classes and teachers.
          </p>

        </div>

        {/* STATS */}

        <div className="settings-stats">

          <div className="stat-card">

            <School size={22}/>

            <h3>
              {stats.totalStudents || 0}
            </h3>

            <p>
              Total Students
            </p>

          </div>

          <div className="stat-card">

            <Users size={22}/>

            <h3>
              {teachers?.length ||0}
            </h3>

            <p>
              Total Teachers
            </p>

          </div>

          <div className="stat-card">

            <GraduationCap size={22}/>

            <h3>
              {classes?.length || 0}
            </h3>

            <p>
              Total Classes
            </p>

          </div>

          <div className="stat-card">

            <Layers3 size={22}/>

            <h3>
              {
                [
                  ...new Set(
                    (classes || [])
                      .map(
                        c => c?.className
                      )
                      .filter(Boolean)
                  )
                ].length
              }
            </h3>

            <p>
              Unique Classes
            </p>

          </div>

        </div>

        {/* SCHOOL INFO */}

        <div className="settings-card">

          <h2>
            School Information
          </h2>

          <div className="settings-grid">

            <input
              type="text"
              name="schoolName"
              placeholder="School Name"
              value={
                schoolData?.schoolName || ""
              }
              onChange={
                handleSchoolChange
              }
            />

            <input
              type="email"
              name="schoolEmail"
              placeholder="School Email"
              value={
                schoolData?.schoolEmail || ""
              }
              onChange={
                handleSchoolChange
              }
            />

            <input
              type="text"
              name="schoolPhone"
              placeholder="School Phone"
              value={
                schoolData?.schoolPhone || ""
              }
              onChange={
                handleSchoolChange
              }
            />

            <input
              type="text"
              name="principalName"
              placeholder="Principal Name"
              value={
                schoolData?.principalName || ""
              }
              onChange={
                handleSchoolChange
              }
            />

          </div>

          <textarea
            name="schoolAddress"
            placeholder="School Address"
            value={
              schoolData?.schoolAddress || ""
            }
            onChange={
              handleSchoolChange
            }
          />

          <button
            className="save-btn"
            onClick={
              saveSchoolSettings
            }
          >
            {
              loading
              ? "Saving..."
              : "Save Settings"
            }
          </button>

        </div>

        {/* SESSION */}

        <div className="settings-card">

          <h2>
            Academic Session
          </h2>

          <input
            type="text"
            name="currentSession"
            value={
              schoolData?.currentSession || ""
            }
            onChange={
              handleSchoolChange
            }
          />

        </div>
                {/* CLASS MANAGEMENT */}

        <div className="settings-card">

          <h2>
            Class Management
          </h2>

          <div className="settings-grid">

            <select
              name="className"
              value={classForm?.className}
              onChange={handleClassChange}
            >
              <option value="">
                Select Class
              </option>

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

            <input
              type="text"
              name="section"
              placeholder="Section"
              value={classForm?.section}
              onChange={handleClassChange}
            />

          </div>

          <button
            className="save-btn"
            onClick={async () => {
              console.log(classForm);
              try {
                console.log("Step1");
                await api.post(
                  "/classes",
                  classForm
                );
                console.log("Step2");
                const response =
                  await api.get(
                    "/classes"
                  );
                  console.log(response.data);
                setClasses(
                  response.data.data
                );

                toast.success(
                  "Class created successfully"
                );

                setClassForm({
                  className:"",
                  section:"",
                  session:
                    schoolData?.currentSession
                });

              }
              catch(error){

                toast.error(
                  "Failed to create class"
                );

              }

            }}
          >
            Create Class
          </button>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Class
                  </th>

                  <th>
                    Section
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  (classes || []).map(
                    (cls)=>(
                      <tr
                        key={cls._id}
                      >

                        <td>
                          {cls.className}
                        </td>

                        <td>
                          {cls.section}
                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            onClick={
                              async()=>{

                                if(
                                  !window.confirm(
                                    "Delete this class?"
                                  )
                                ){
                                  return;
                                }

                                try{

                                  await api.delete(
                                    `/classes/${cls._id}`
                                  );

                                  setClasses(
                                    prev =>
                                      prev.filter(
                                        c =>
                                          c._id !==
                                          cls._id
                                      )
                                  );

                                  toast.success(
                                    "Class deleted"
                                  );

                                }
                                catch(error){

                                  toast.error(
                                    "Failed to delete class"
                                  );

                                }

                              }
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    )
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

        {/* TEACHER MANAGEMENT */}

        <div className="settings-card">

          <h2>
            Teacher Management
          </h2>

          <div className="settings-grid">

            <input
              type="text"
              name="name"
              placeholder="Teacher Name"
              value={teacherForm.name}
              onChange={handleTeacherChange}
            />

            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={
                teacherForm.employeeId
              }
              onChange={handleTeacherChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                teacherForm.email
              }
              onChange={handleTeacherChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={
                teacherForm.phone
              }
              onChange={handleTeacherChange}
            />

            <select
              name="gender"
              value={
                teacherForm.gender
              }
              onChange={handleTeacherChange}
            >
              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={
                teacherForm.designation
              }
              onChange={handleTeacherChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                teacherForm.password
              }
              onChange={handleTeacherChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                teacherForm.confirmPassword
              }
              onChange={handleTeacherChange}
            />

          </div>

          <button
            className="save-btn"
            onClick={async()=>{

              if(
                teacherForm.password !==
                teacherForm.confirmPassword
              ){
                toast.error(
                  "Passwords do not match"
                );
                return;
              }

              try{

                await api.post(
                  "/teacher",
                  teacherForm
                );

                const response =
                  await api.get(
                    "/teacher"
                  );

                setTeachers(
                  response.data
                    .teacherData || []
                );

                toast.success(
                  "Teacher added successfully"
                );

                setTeacherForm({
                  name:"",
                  employeeId:"",
                  email:"",
                  phone:"",
                  gender:"Male",
                  designation:"",
                  password:"",
                  confirmPassword:""
                });

              }
              catch(error){

                toast.error(
                  error?.response?.data?.message ||
                  "Failed to add teacher"
                );

              }

            }}
          >
            Add Teacher
          </button>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>Name</th>
                  <th>Employee ID</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {
                  teachers.map(
                    (teacher)=>(
                      <tr
                        key={teacher._id}
                      >

                        <td>
                          {teacher.name}
                        </td>

                        <td>
                          {teacher.employeeId}
                        </td>

                        <td>
                          {teacher.email}
                        </td>

                        <td>
                          {teacher.designation}
                        </td>

                        <td>
                          {teacher.status}
                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            onClick={
                              async()=>{

                                if(
                                  !window.confirm(
                                    "Delete teacher?"
                                  )
                                ){
                                  return;
                                }

                                try{

                                  await api.delete(
                                    `/teacher/${teacher._id}`
                                  );

                                  setTeachers(
                                    prev =>
                                      prev.filter(
                                        t =>
                                          t._id !==
                                          teacher._id
                                      )
                                  );

                                  toast.success(
                                    "Teacher deleted"
                                  );

                                }
                                catch(error){

                                  toast.error(
                                    "Failed to delete teacher"
                                  );

                                }

                              }
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    )
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

};

export default SchoolSettingsPageContent;