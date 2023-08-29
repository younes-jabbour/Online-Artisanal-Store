import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import jwtDecode from "jwt-decode";
import api from "../components/pages/api";
import { useDispatch } from "react-redux";

import { enroll } from "../redux/EnrollSlice";

const UserContext = createContext();

function extractUserInfo(token) {
  if (!token) return null;
  return jwtDecode(token);
}

export const UserProvider = ({ children }) => {
  const AccessToken = localStorage.getItem("AccessToken") || null;

  const user = extractUserInfo(AccessToken === null ? undefined : AccessToken);

  // Handle token check and user initialization
  useEffect(() => {
    if (user === null) {
      // Invalid token or expired, redirect to login
      localStorage.clear();
      setUserInfo({ id: null, type: "none", IsConnected: false });
    }
  }, [user]);

  // Initialize user context
  const userContextInitialValue = {
    id: user?.id || null,
    type: user?.type || "none",
    IsConnected: !!user?.id,
  };

  const [userInfo, setUserInfo] = useState(userContextInitialValue);
  const [Enrollement, setEnrollement] = useState([]);
  const dispatch = useDispatch();

  const memoizedDispatch = useCallback(dispatch, []);
  // useEffect(() => {
  //   dispatch(enroll(Enrollement));
  // }, [Enrollement]);

  useEffect(() => {
    if (userInfo.IsConnected) {
      api
        .get(`/enroll/getEnroll/${userInfo.id}`)
        .then((res) => {
          setEnrollement(res.data);
          // dispatch(enroll(res.data));
        })
        .catch((err) => console.log(err));
    } else {
      setEnrollement([]);
    }
    // if (userInfo.IsConnected) {
    //   api
    //     .get(`/enroll/getAllEnroll/${userInfo.id}`)
    //     .then((res) => {
    //       setEnrollement(res.data);
    //       memoizedDispatch(enroll(res.data));
    //     })
    //     .catch((err) => console.log(err));
    // } else {
    //   setEnrollement([]);
    // }
  }, [userInfo.IsConnected]);

  //logout function
  const logout = async () => {
    try {
      const response = await api.post("/auth/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      localStorage.clear();
      setUserInfo({ id: null, type: "none", IsConnected: false });
      setEnrollement([]);
      // window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, logout, Enrollement }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
