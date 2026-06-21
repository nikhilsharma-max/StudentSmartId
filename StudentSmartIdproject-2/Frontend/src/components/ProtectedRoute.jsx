import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );

                setAuthenticated(true);
                setLoading(false);

            } catch (error) {
                localStorage.removeItem("accessToken");

                setAuthenticated(false);
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;