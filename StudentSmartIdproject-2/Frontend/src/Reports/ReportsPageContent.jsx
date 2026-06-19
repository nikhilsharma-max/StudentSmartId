import React, { useEffect, useState } from "react";
import "./ReportsPageContent.css";
import Navbar from "../Navbar";
import { CardSmall } from "../CardSmall";
import api from "../api/axios";
import { toast } from "react-toastify";

import {
    Users,
    GraduationCap,
    Percent,
    Building2,
} from "lucide-react";

const ReportsPageContent = () => {

    const [schoolName, setSchoolName] = useState("School's Name");

    const [loading, setLoading] = useState(false);

    const [attendanceReport, setAttendanceReport] = useState([]);
    const [classSummary, setClassSummary] = useState([]);

    const [summaryData, setSummaryData] = useState({
        totalStudents: 0,
        averageAttendance: 0,
        classesCovered: 0,
        sectionsCovered: 0,
    });

    const [filters, setFilters] = useState({
        fromDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        )
            .toISOString()
            .split("T")[0],

        toDate: new Date()
            .toISOString()
            .split("T")[0],

        className: "",

        section: "",

        sortBy: "attendanceDesc",
    });

    // -------------------------
    // School Name
    // -------------------------

    useEffect(() => {
        const getSchoolName = async () => {
            try {
                const response = await api.get(
                    "/schoolSetting"
                );

                setSchoolName(
                    response?.data?.data?.[0]
                        ?.schoolName || "School"
                );
            } catch (error) {
                console.log(error);
            }
        };

        getSchoolName();
    }, []);

    // -------------------------
    // Initial Report Load
    // -------------------------

    useEffect(() => {
        loadReports();
    }, []);

    // -------------------------
    // Fetch Reports
    // -------------------------

    const loadReports = async () => {
        try {
            setLoading(true);

            const [
                summaryResponse,
                attendanceResponse,
                classSummaryResponse,
            ] = await Promise.all([
                api.get("/report/summary"),

                api.get("/report/attendance", {
                    params: filters,
                }),

                api.get(
                    "/report/class-summary"
                ),
            ]);

            setSummaryData(
                summaryResponse?.data?.data || {
                    totalStudents: 0,
                    averageAttendance: 0,
                    classesCovered: 0,
                    sectionsCovered: 0,
                }
            );

            setAttendanceReport(
                attendanceResponse?.data?.data || []
            );

            setClassSummary(
                classSummaryResponse?.data?.data ||
                []
            );
        } catch (error) {
            console.log(error);

            toast.error(
                "Failed to load reports"
            );
        } finally {
            setLoading(false);
        }
    };

    // -------------------------
    // Generate Report
    // -------------------------

    const generateReport =
        async () => {
            try {
                setLoading(true);

                const response =
                    await api.get(
                        "/report/attendance",
                        {
                            params: filters,
                        }
                    );

                setAttendanceReport(
                    response?.data?.data || []
                );

                toast.success(
                    "Report generated"
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to generate report"
                );
            } finally {
                setLoading(false);
            }
        };
    const exportCSV = () => {

        if (
            attendanceReport.length === 0
        ) {
            toast.error(
                "No data to export"
            );
            return;
        }

        const headers = [
            "Name",
            "Roll Number",
            "Class",
            "Section",
            "Attendance %"
        ];

        const rows =
            attendanceReport.map(
                (student) => [
                    student.name,
                    student.rollNumber,
                    student.className,
                    student.section,
                    student.attendancePercentage
                ]
            );

        const csvContent =
            [
                headers,
                ...rows
            ]
                .map((e) =>
                    e.join(",")
                )
                .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );

        const link =
            document.createElement(
                "a"
            );

        const url =
            URL.createObjectURL(blob);

        link.href = url;

        link.download =
            `attendance-report-${filters.fromDate}-${filters.toDate}.csv`;

        link.click();
    };

    // -------------------------
    // Handle Filters
    // -------------------------

    const handleFilterChange = (
        e
    ) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.value,
        }));
    };

    return (
        <div className="reports-page-content">

            <Navbar
                SchoolName={schoolName}
            />

            {/* Header */}

            <div className="reports-header">

                <div className="reports-header-left">
                    <p>
                        Reports Management
                    </p>

                    <h1>
                        Attendance and Class
                        Reports
                    </h1>
                </div>

            </div>

            {/* Filters */}

            <div className="reports-filter-card">

                <div className="filter-row">

                    <input
                        type="date"
                        name="fromDate"
                        value={
                            filters.fromDate
                        }
                        onChange={
                            handleFilterChange
                        }
                    />

                    <input
                        type="date"
                        name="toDate"
                        value={
                            filters.toDate
                        }
                        onChange={
                            handleFilterChange
                        }
                    />

                    <select
                        name="className"
                        value={
                            filters.className
                        }
                        onChange={
                            handleFilterChange
                        }
                    >
                        <option value="">
                            All Classes
                        </option>

                        <option value="LKG">
                            LKG
                        </option>

                        <option value="UKG">
                            UKG
                        </option>

                        <option value="I">
                            I
                        </option>

                        <option value="II">
                            II
                        </option>

                        <option value="III">
                            III
                        </option>

                        <option value="IV">
                            IV
                        </option>

                        <option value="V">
                            V
                        </option>

                        <option value="VI">
                            VI
                        </option>

                        <option value="VII">
                            VII
                        </option>

                        <option value="VIII">
                            VIII
                        </option>

                        <option value="IX">
                            IX
                        </option>

                        <option value="X">
                            X
                        </option>

                        <option value="XI">
                            XI
                        </option>

                        <option value="XII">
                            XII
                        </option>
                    </select>

                    <select
                        name="section"
                        value={
                            filters.section
                        }
                        onChange={
                            handleFilterChange
                        }
                    >
                        <option value="">
                            All Sections
                        </option>

                        <option value="A">
                            A
                        </option>

                        <option value="B">
                            B
                        </option>

                        <option value="C">
                            C
                        </option>

                        <option value="D">
                            D
                        </option>

                        <option value="E">
                            E
                        </option>

                        <option value="F">
                            F
                        </option>
                    </select>

                    <select
                        name="sortBy"
                        value={
                            filters.sortBy
                        }
                        onChange={
                            handleFilterChange
                        }
                    >
                        <option value="attendanceDesc">
                            Attendance ↓
                        </option>

                        <option value="attendanceAsc">
                            Attendance ↑
                        </option>

                        <option value="rollAsc">
                            Roll ↑
                        </option>

                        <option value="rollDesc">
                            Roll ↓
                        </option>
                    </select>

                    <button
                        className="generate-btn"
                        onClick={
                            generateReport
                        }
                    >
                        Generate Report
                    </button>

                    <button
                        className="export-btn"
                        onClick={exportCSV}
                    >
                        Export CSV
                    </button>

                </div>

            </div>

            {/* Summary Cards */}

            <div className="reports-summary-cards">

                <CardSmall
                    heading="Total Students"
                    data={
                        summaryData.totalStudents
                    }
                    detail="Students included"
                    icon={Users}
                />

                <CardSmall
                    heading="Average Attendance"
                    data={`${summaryData.averageAttendance}%`}
                    detail="Overall attendance"
                    icon={Percent}
                />

                <CardSmall
                    heading="Classes Covered"
                    data={
                        summaryData.classesCovered
                    }
                    detail="Total classes"
                    icon={GraduationCap}
                />

                <CardSmall
                    heading="Sections Covered"
                    data={
                        summaryData.sectionsCovered
                    }
                    detail="Total sections"
                    icon={Building2}
                />

            </div>

            {/* Tables Section */}

            <div className="reports-table-container">

                <h2>Attendance Report</h2>

                {loading ? (

                    <div className="loading-container">
                        Loading report...
                    </div>

                ) : attendanceReport.length === 0 ? (

                    <div className="empty-state">
                        No attendance report found
                    </div>

                ) : (

                    <table className="report-table">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Attendance %</th>
                            </tr>
                        </thead>

                        <tbody>

                            {attendanceReport.map(
                                (student) => {

                                    let attendanceClass =
                                        "attendance-good";

                                    if (
                                        student.attendancePercentage <
                                        75
                                    ) {
                                        attendanceClass =
                                            "attendance-low";
                                    } else if (
                                        student.attendancePercentage <
                                        90
                                    ) {
                                        attendanceClass =
                                            "attendance-average";
                                    }

                                    return (
                                        <tr
                                            key={
                                                student.studentId
                                            }
                                        >
                                            <td>
                                                {student.name}
                                            </td>

                                            <td>
                                                {
                                                    student.rollNumber
                                                }
                                            </td>

                                            <td>
                                                {
                                                    student.className
                                                }
                                            </td>

                                            <td>
                                                {
                                                    student.section
                                                }
                                            </td>

                                            <td
                                                className={
                                                    attendanceClass
                                                }
                                            >
                                                {
                                                    student.attendancePercentage
                                                }
                                                %
                                            </td>

                                        </tr>
                                    );
                                }
                            )}

                        </tbody>

                    </table>

                )}

            </div>
            <div className="reports-table-container">

                <h2>
                    Class Summary Report
                </h2>

                {loading ? (

                    <div className="loading-container">
                        Loading class summary...
                    </div>

                ) : classSummary.length === 0 ? (

                    <div className="empty-state">
                        No class summary available
                    </div>

                ) : (

                    <table className="report-table">

                        <thead>

                            <tr>
                                <th>Class</th>
                                <th>Sections</th>
                                <th>Total Students</th>
                            </tr>

                        </thead>

                        <tbody>

                            {classSummary.map(
                                (item) => (
                                    <tr
                                        key={
                                            item.className
                                        }
                                    >
                                        <td>
                                            {
                                                item.className
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.sections
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.totalStudents
                                            }
                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
};

export default ReportsPageContent;