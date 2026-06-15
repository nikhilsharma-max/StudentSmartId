import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get(
                    "http://localhost:8000/auth/logout",
                    {},
                    {
                        withCredentials: true,
                    }
                );

                localStorage.removeItem("accessToken");

                toast.success("Logged out successfully");

                navigate("/login");
            } catch (error) {
                console.log(error);

                localStorage.removeItem("accessToken");

                toast.error("Failed to logout");

                navigate("/login");
            }
        };

        logout();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;