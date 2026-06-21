import React, {
  useEffect,
  useState
} from "react";

import "./AttendanceCreatePage.css";
import Navbar from "@/Navbar";
import api from "@/api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AttendanceCreatePage = () => {
    const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const [schoolName,setSchoolName] =
    useState("School's Name");

  const [classes,setClasses] =
    useState([]);

  const [students,setStudents] =
    useState([]);

  const [loading,setLoading] =
    useState(false);

  const [attendanceExists,
    setAttendanceExists] =
    useState(false);

  const [selectedClass,
    setSelectedClass] =
    useState("");

  const [selectedSection,
    setSelectedSection] =
    useState("");

  const currentDate =
    new Date().toLocaleDateString(
      "en-GB"
    );

  useEffect(()=>{

    const loadInitialData =
      async()=>{

        try{

          const schoolRes =
            await api.get(
              "/schoolsetting"
            );

          const classRes =
            await api.get(
              "/classes"
            );
          setSchoolName(
            schoolRes?.data?.data?.[0]
              ?.schoolName ||
            "School's Name"
          );

          setClasses(
            classRes?.data?.classes ||
            []
          );

        }
        catch(error){

          toast.error(
            "Failed to load data"
          );

        }

      };

    loadInitialData();

  },[]);
    const loadStudents =
    async()=>{
        setSearched(true);
      if(
        !selectedClass ||
        !selectedSection
      ){
        toast.error(
          "Select class and section"
        );
        return;
      }

      try{

        setLoading(true);

        const attendanceCheck =
          await api.get(
            `/attendance/check-today?className=${selectedClass}&section=${selectedSection}`
          );
        if(
          attendanceCheck.data.exists
        ){

          setAttendanceExists(
            true
          );

          setStudents([]);

          toast.warning(
            "Attendance already submitted today"
          );

          return;
        }

        setAttendanceExists(
          false
        );

        const response =
          await api.get(
            `/student/attendance-list?className=${selectedClass}&section=${selectedSection}`
          );

        const formattedStudents =
          response.data.students.map(
            (student)=>({
              studentId:
                student._id,

              name:
                student.name,

              rollNumber:
                student.rollNumber,

              status:
                "Present"
            })
          );

        setStudents(
          formattedStudents
        );
        setStudents(formattedStudents);

        if(formattedStudents.length === 0){
        toast.info(
            "No students found in selected class"
        );
        }
      }
      catch(error){

        toast.error(
          "Failed to load students"
        );

      }
      finally{
        setSearched(false);
        setLoading(false);

      }

  };

  const updateStatus =
    (
      studentId,
      status
    ) => {

      setStudents(prev =>
        prev.map(student =>
          student.studentId ===
          studentId
            ? {
                ...student,
                status
              }
            : student
        )
      );

  };

  const markAllPresent =
    ()=>{

      setStudents(prev =>
        prev.map(student => ({
          ...student,
          status:"Present"
        }))
      );

  };

  const saveAttendance =
    async()=>{

      if(
        students.length === 0
      ){
        toast.error(
          "No students found"
        );
        return;
      }

      try{

        setLoading(true);

        await api.post(
          "/attendance/manual-entry",
          {
            attendance:
              students.map(
                student => ({
                  studentId:
                    student.studentId,

                  status:
                    student.status
                })
              )
          }
        );

        toast.success(
          "Attendance saved successfully"
        );

        navigate(
          "/attendance"
        );

      }
      catch(error){

        toast.error(
          error?.response?.data?.message ||
          "Failed to save attendance"
        );

      }
      finally{

        setLoading(false);

      }

  };
    return (
    <div className="attendance-create-page">

      <Navbar SchoolName={schoolName}/>

      <div className="attendance-create-container">

        <div className="attendance-create-header">

          <div>

            <p>
              Attendance Management
            </p>

            <h1>
              Add Manual Attendance
            </h1>

          </div>

          <div className="attendance-date-box">

            Date : {currentDate}

          </div>

        </div>

        <div className="attendance-create-card">

          <h2>
            Select Class
          </h2>

          <div className="attendance-filter-grid">

            <select
              value={selectedClass}
              onChange={(e)=>
                setSelectedClass(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Class
              </option>

              {
                [...new Set(
                  classes.map(
                    cls =>
                      cls.className
                  )
                )]
                .map(className => (

                  <option
                    key={className}
                    value={className}
                  >
                    {className}
                  </option>

                ))
              }

            </select>

            <select
              value={selectedSection}
              onChange={(e)=>
                setSelectedSection(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Section
              </option>

              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>

            </select>

            <button
            className="load-btn"
            onClick={loadStudents}
            disabled={loading}
            >
            {
                loading
                ? "Loading..."
                : "Load Students"
            }
            </button>

          </div>

          {
            attendanceExists &&

            <div className="attendance-warning">

              Attendance already submitted
              today for this class.

              Please use Edit Attendance.

            </div>
          }

        </div>

        {
          students.length > 0 &&

          <div className="attendance-create-card">

            <div className="attendance-action-row">

              <h2>
                Students
              </h2>

              <button
                className="mark-all-btn"
                onClick={
                  markAllPresent
                }
              >
                Mark All Present
              </button>

            </div>

            <div className="attendance-table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>
                      Roll No
                    </th>

                    <th>
                      Student Name
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    students.map(
                      student => (

                        <tr
                          key={
                            student.studentId
                          }
                        >

                          <td>
                            {
                              student.rollNumber
                            }
                          </td>

                          <td>
                            {
                              student.name
                            }
                          </td>

                          <td>

                            <div className="status-buttons">

                              <button
                                className={
                                  student.status ===
                                  "Present"
                                  ?
                                  "status-btn present active"
                                  :
                                  "status-btn present"
                                }
                                onClick={()=>
                                  updateStatus(
                                    student.studentId,
                                    "Present"
                                  )
                                }
                              >
                                Present
                              </button>

                              <button
                                className={
                                  student.status ===
                                  "Late"
                                  ?
                                  "status-btn late active"
                                  :
                                  "status-btn late"
                                }
                                onClick={()=>
                                  updateStatus(
                                    student.studentId,
                                    "Late"
                                  )
                                }
                              >
                                Late
                              </button>

                              <button
                                className={
                                  student.status ===
                                  "Absent"
                                  ?
                                  "status-btn absent active"
                                  :
                                  "status-btn absent"
                                }
                                onClick={()=>
                                  updateStatus(
                                    student.studentId,
                                    "Absent"
                                  )
                                }
                              >
                                Absent
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

            <button
              className="save-attendance-btn"
              onClick={
                saveAttendance
              }
              disabled={loading}
            >
              {
                loading
                ?
                "Saving..."
                :
                "Save Attendance"
              }
            </button>

          </div>

        }

      </div>

    </div>
  );
};

export default AttendanceCreatePage;