import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./VerifyEmail.css";
import { toast } from "react-toastify";
function VerifyEmail() {
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setStatus("error");
          setMessage("Verification token missing");
          return;
        }
  
        await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify-email?token=${token}`
        );
        toast.success("Email verified Successfully");
        setStatus("success");
        setMessage(
          "Email verified successfully. Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
        

      } catch (error) {
        toast.error("Failed to verify Email");
        setStatus("error");

        setMessage(
          error?.response?.data?.message ||
            "Verification failed"
        );
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="verify-page">

      <div className="verify-card">

        <h1>SmartWalk ID</h1>

        {status === "verifying" && (
          <>
            <div className="loader"></div>
            <h2>Verifying Email</h2>
          </>
        )}

        {status === "success" && (
          <>
            <div className="success-icon">✓</div>
            <h2>Email Verified</h2>
          </>
        )}

        {status === "error" && (
          <>
            <div className="error-icon">✕</div>
            <h2>Verification Failed</h2>
          </>
        )}

        <p>{message}</p>

      </div>

    </div>
  );
}

export default VerifyEmail;