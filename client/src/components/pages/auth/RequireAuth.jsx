import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const { userInfo } = useUserContext();

  return userInfo.IsConnected ? <Outlet /> : <Navigate to="/" replace={true} />;
}

export default RequireAuth;