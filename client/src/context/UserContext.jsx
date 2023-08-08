// Inside your UserProvider component

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // // Retrieve stored user info from localStorage
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // // Create the initial user context value using retrieved data
  const userContextInitialValue = {
    id: storedUserInfo.id || null,
    type: storedUserInfo.type || "none",
    IsConnected: storedUserInfo.IsConnected || false,
  };

  const [userInfo, setUserInfo] = useState(userContextInitialValue);

  const logout = () => {
    // Clear userInfo and remove from localStorage
    setUserInfo({ id: null, type: "none", IsConnected: false });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("AccessToken");
  };
//   const ResetUserInfo = ()=> { 
//     setUserInfo()
//  }

  // Watch for changes in userInfo and update localStorage accordingly
  useEffect(() => {
    if (userInfo.IsConnected) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </UserContext.Provider>
  );
};



export const useUserContext = () => useContext(UserContext);
