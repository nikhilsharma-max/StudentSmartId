# StudentSmartId

StudentSmartId is a School Attendance Management System designed to simplify attendance tracking, student management, class management, and administrative operations for educational institutions.

The project aims to provide a secure and scalable platform where schools can manage students, teachers, classes, attendance records, and future RFID-based attendance systems.

---

# Project Goals

* Student Management
* Teacher Management
* Class Management
* Attendance Tracking
* Attendance Analytics
* Attendance Reports
* Authentication & Authorization
* Multi-School Support (Future)
* RFID Attendance Integration (Future)

---

# Features Implemented

## Student Module

* Add Student
* Get All Students
* Get Student By ID
* Update Student
* Delete Student

---

## Teacher Module

* Add Teacher
* Get All Teachers
* Get Teacher By ID
* Update Teacher
* Delete Teacher

---

## Class Module

* Add Class
* Get All Classes
* Get Class By ID
* Update Class
* Delete Class

---

## Attendance Module

* Create Attendance Record
* Get Attendance Records
* Get Attendance By Student
* Update Attendance
* Delete Attendance

### Attendance Summary

Supports:

* Complete Attendance Summary
* Date Range Summary
* Attendance Percentage
* Present Count
* Absent Count
* Late Count

---

## Activity Logs Module

Tracks:

* Which teacher performed an action
* Action type
* Target resource
* Timestamp

Purpose:

Audit and monitoring system.

---

## School Settings Module

Stores:

* School Information
* Academic Terms
* Attendance Rules
* School Configuration

Supports:

* Create Settings
* Read Settings
* Update Settings
* Delete Settings

---

## Authentication Module

### Registration

* User Registration
* Password Hashing
* Verification Token Generation
* Verification Email

### Email Verification

* Verify User Email
* Token Validation
* Token Expiry Validation

---

# Tech Stack

Backend:

* Node.js
* Express.js

Database:

* MongoDB Atlas
* Mongoose

Authentication:

* JWT
* Crypto

Email Service:

* Nodemailer

Development Tools:

* Nodemon
* Postman / Ekart

---

# Current Project Progress

Backend API Development:

Approximately 70% Complete

Authentication:

Approximately 40% Complete

Frontend:

Not Started

Deployment:

Not Started

RFID Integration:

Planned

---

# Upcoming Features

## Authentication

* Login
* Access Tokens
* Refresh Tokens
* Sessions
* Logout
* Logout From All Devices
* Role Based Access Control

---

## Frontend

* Admin Dashboard
* Teacher Dashboard
* Student Dashboard
* Attendance Reports
* Authentication Pages

---

## RFID System

* RFID Card Registration
* Attendance Scanning
* Automatic Attendance Marking
* Real-Time Attendance Updates

---

# Long-Term Vision

Create a complete multi-school attendance platform where:

* Schools can register independently.
* Each school manages its own students, teachers, and classes.
* Attendance is tracked digitally.
* RFID cards automate attendance collection.
* Reports and analytics help improve attendance monitoring.

The project is being built as a full-stack production-grade system while simultaneously serving as a learning project for backend development, authentication systems, databases, APIs, and software architecture.
