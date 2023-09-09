import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuthArtisan() {
  const { userInfo } = useUserContext();

  return userInfo.IsConnected && userInfo.type === "artisan" ? (
    <Outlet />
  ) : (
    <Navigate to="/anauthorized" replace={true} />
  );
}

export default RequireAuthArtisan;
