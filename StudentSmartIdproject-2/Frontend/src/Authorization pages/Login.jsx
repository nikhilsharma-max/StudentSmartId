import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
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

    try {
      setLoading(true);

    
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {
          email: formData.username,
          password: formData.password
        },
        {
          withCredentials:true
        }
      );
      console.log(response);
      localStorage.setItem(
        "accessToken",
        response.data.token
      );
      
      toast.success("Logged in successfully");
      setSuccess("Login successful");

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      toast.error("Failed to login in");
      setError(
        err?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <h1>SmartWalk ID</h1>
          <p>Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="text"
              name="username"
              placeholder="Enter email"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">

            <label>Password</label>

            <div className="password-container">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          {error && (
            <div className="message error">
              {error}
            </div>
          )}

          {success && (
            <div className="message success">
              {success}
               toast.success("Register");
            </div>
          )}

          <button
            className="login-btn"
            disabled={loading}
            type="submit"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

          <div className="login-links">

            <a href="/register">
              Register School
            </a>

            <a href="#">
              Forgot Password?
            </a>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;