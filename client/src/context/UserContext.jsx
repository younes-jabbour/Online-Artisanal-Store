import React, { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import api from "../components/pages/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function extractUserInfo(token) {
  if (!token) return null;
  return jwtDecode(token);
}

export const UserProvider = ({ children }) => {
  const AccessToken = localStorage.getItem("AccessToken") || null;

  const user = extractUserInfo(AccessToken === null ? undefined : AccessToken);
  const navigate = useNavigate();

  // Handle token check and user initialization
  useEffect(() => {
    if (!user) {
      // Invalid token or expired, redirect to login
      localStorage.clear();
    }
  }, [user, navigate]);

  // Initialize user context
  const userContextInitialValue = {
    id: user?.id || null,
    type: user?.type || "none",
    IsConnected: !!user?.id,
  };

  const [userInfo, setUserInfo] = useState(userContextInitialValue);

  const logout = async () => {
    try {
      const response = await api.post("/auth/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      localStorage.clear();
      setUserInfo({ id: null, type: "none", IsConnected: false });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
