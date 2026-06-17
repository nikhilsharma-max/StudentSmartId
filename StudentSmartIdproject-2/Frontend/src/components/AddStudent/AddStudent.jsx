import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import './AddStudent.css';
import Navbar from "@/Navbar.jsx";
const AddStudent = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    admissionNumber: "",
    profilePhoto: "",
    studentCardId: "",

    classId: "",
    section: "",
    session: "2026-27",

    dateOfBirth: "",
    gender: "Male",
    bloodGroup: "O+",
    nationality: "Indian",
    aadhaarNumber: "",

    email: "",
    phone: "",

    address: {
      locality: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
    },

    parentInfo: {
      fatherName: "",
      motherName: "",
      fatherPhone: "",
      motherPhone: "",
      fatherOccupation: "",
      motherOccupation: "",
      emergencyContact: "",
      fatherEmail: "",
    },
  });
  const [schoolName,setSchoolName] = useState('');
  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await api.get("/classes");
        const school = await api.get("/schoolSetting");
        setSchoolName(school.data.data[0].schoolName);
        setClasses(response.data.classes);
      } catch (error) {
        toast.error("Failed to load classes");
      }
    };

    getClasses();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddressChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleParentChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      parentInfo: {
        ...prev.parentInfo,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleClassChange = (e) => {
    const selectedClass = classes.find(
      (cls) => cls._id === e.target.value
    );

    setFormData((prev) => ({
      ...prev,
      classId: selectedClass._id,
      section: selectedClass.section,
      session: selectedClass.session,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/student", formData);

      toast.success("Student added successfully");

      navigate("/student");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to add student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (<>
  <div className="add-student-page">
    <Navbar SchoolName={schoolName}/>
    <div className="add-student-header">
      <div>
        <p>Add Student</p>
        <h1>Create and manage student records</h1>
      </div>
    </div>

    <form
      className="add-student-form"
      onSubmit={handleSubmit}
    >

      {/* Basic Information */}
      <div className="form-section">
        <h2>Basic Information</h2>

        <div className="form-grid">

          <input
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="rollNumber"
            type="number"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />

          <input
            name="admissionNumber"
            placeholder="Admission Number"
            value={formData.admissionNumber}
            onChange={handleChange}
            required
          />

          <input
            name="studentCardId"
            placeholder="Student Card ID"
            value={formData.studentCardId}
            onChange={handleChange}
          />

          <select
            value={formData.classId}
            onChange={handleClassChange}
            required
          >
            <option value="">
              Select Class
            </option>

            {classes?.map((cls) => (
              <option
                key={cls._id}
                value={cls._id}
              >
                {cls.className}-{cls.section}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Personal Information */}
      <div className="form-section">
        <h2>Personal Information</h2>

        <div className="form-grid">

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <input
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Nationality"
          />

          <input
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            placeholder="Aadhaar Number"
          />

        </div>
      </div>

      {/* Contact Information */}
      <div className="form-section">
        <h2>Contact Information</h2>

        <div className="form-grid">

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

        </div>
      </div>

      {/* Address */}
      <div className="form-section">
        <h2>Address</h2>

        <div className="form-grid">

          <input
            name="locality"
            placeholder="Locality"
            value={formData.address.locality}
            onChange={handleAddressChange}
          />

          <input
            name="city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleAddressChange}
          />

          <input
            name="state"
            placeholder="State"
            value={formData.address.state}
            onChange={handleAddressChange}
          />

          <input
            name="country"
            placeholder="Country"
            value={formData.address.country}
            onChange={handleAddressChange}
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={formData.address.pincode}
            onChange={handleAddressChange}
          />

        </div>
      </div>

      {/* Parent Information */}
      <div className="form-section">
        <h2>Parent Information</h2>

        <div className="form-grid">

          <input
            name="fatherName"
            placeholder="Father Name"
            value={formData.parentInfo.fatherName}
            onChange={handleParentChange}
          />

          <input
            name="motherName"
            placeholder="Mother Name"
            value={formData.parentInfo.motherName}
            onChange={handleParentChange}
          />

          <input
            name="fatherPhone"
            placeholder="Father Phone"
            value={formData.parentInfo.fatherPhone}
            onChange={handleParentChange}
          />

          <input
            name="motherPhone"
            placeholder="Mother Phone"
            value={formData.parentInfo.motherPhone}
            onChange={handleParentChange}
          />

          <input
            name="fatherEmail"
            placeholder="Father Email"
            value={formData.parentInfo.fatherEmail}
            onChange={handleParentChange}
          />

          <input
            name="fatherOccupation"
            placeholder="Father Occupation"
            value={formData.parentInfo.fatherOccupation}
            onChange={handleParentChange}
          />

          <input
            name="motherOccupation"
            placeholder="Mother Occupation"
            value={formData.parentInfo.motherOccupation}
            onChange={handleParentChange}
          />

          <input
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formData.parentInfo.emergencyContact}
            onChange={handleParentChange}
          />

        </div>
      </div>

      <div className="form-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/student")}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-btn"
          disabled={loading}
        >
          {loading
            ? "Adding Student..."
            : "Add Student"}
        </button>

      </div>

    </form>
  </div>
  </>
);
 
};

export default AddStudent;

