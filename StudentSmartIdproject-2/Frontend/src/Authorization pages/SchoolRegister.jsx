import { useState } from "react";
import "./SchoolRegister.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function SchoolRegister() {
  const [formData, setFormData] = useState({
    schoolName: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8000/auth/register", {
          schoolName: formData.schoolName,
          username: formData.adminName,
          email: formData.email,
          password: formData.password,
          role: "Admin"
      });
      toast.success("Registration successful. Please verify your email.")
      setSuccess(
        "Registration successful. Please verify your email."
      );
    } catch (err) {
      toast.error("Registration failed");
      setError(
        err?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="school-register-page">
      <div className="school-register-card">

        <div className="register-header">
          <h1>SmartWalk ID</h1>

          <p>
            Register your school and create
            the administrator account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>School Name</label>

            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="ABC Public School"
              required
            />
          </div>

          <div className="form-group">
            <label>Administrator Name</label>

            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="Nikhil Sharma"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@school.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          {error && (
            <div className="message error">
              {error}
            </div>
          )}

          {success && (
            <div className="message success">
              {success}
            </div>
          )}

          <button
            className="register-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating School..."
              : "Register School"}
          </button>
                    <div className="auth-footer">
            <span>Already have an account? </span>
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SchoolRegister;