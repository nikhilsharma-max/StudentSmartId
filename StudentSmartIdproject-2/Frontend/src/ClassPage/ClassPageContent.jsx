import React, { useEffect, useState } from "react";
import "./ClassPageContent.css";
import Navbar from "@/Navbar";
import api from "@/api/axios";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp, Users, School } from "lucide-react";

const ClassPageContent = () => {
  const [schoolName, setSchoolName] = useState("School's Name");
  const [classesData, setClassesData] = useState([]);
  const [openClass, setOpenClass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await api.get("/classes/overview");
        const response2 = await api.get("/schoolSetting");
        setSchoolName(response2.data.data[0].schoolName);
        setClassesData(response.data.data || []);
      } catch (error) {
        toast.error("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    getClasses();
  }, []);

  const toggleClass = (className) => {
    setOpenClass(
      openClass === className ? null : className
    );
  };

  return (
    <div className="class-page-content">
      <Navbar SchoolName={schoolName} />

      <div className="class-page-main">

        <div className="class-page-header">
          <div>
            <p>Classes Overview</p>
            <h1>
              View all classes and sections
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="class-loading">
            Loading classes...
          </div>
        ) : classesData.length === 0 ? (
          <div className="class-empty">
            No class data available
          </div>
        ) : (
          classesData.map((cls) => (
            <div
              className="class-card"
              key={cls.className}
            >
              <div
                className="class-header"
                onClick={() =>
                  toggleClass(cls.className)
                }
              >
                <div className="class-header-left">
                  <School size={20} />

                  <span>
                    Class {cls.className}
                  </span>
                </div>

                <div className="class-header-center">
                  <span>
                    Sections :
                    {" "}
                    {cls.totalSections}
                  </span>

                  <span>
                    Students :
                    {" "}
                    {cls.totalStudents}
                  </span>
                </div>

                <div>
                  {openClass ===
                  cls.className ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </div>
              </div>

              {openClass ===
                cls.className && (
                <div className="section-container">

                  {cls.sections.map(
                    (section) => (
                      <div
                        key={
                          section.section
                        }
                        className="section-card"
                      >
                        <div className="section-left">
                          <span>
                            Section{" "}
                            {
                              section.section
                            }
                          </span>
                        </div>

                        <div className="section-right">
                          <Users
                            size={18}
                          />

                          <span>
                            {
                              section.totalStudents
                            }{" "}
                            Students
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassPageContent;