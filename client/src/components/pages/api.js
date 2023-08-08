import axios from "axios";
import { Navigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SUCCESS: 200,
};

const ERROR_MESSAGE = {
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_AUTHORIZED: "You are not authorized!",
  REFRESH_EXPIRED: "Refresh token has expired",
};

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  try {
    const AccessToken = localStorage.getItem("AccessToken");
    if (!AccessToken) {
      // window.location.href = "/login";
      localStorage.clear();
    } else config.headers.Authorization = `Bearer ${AccessToken}`;

    return config;
  } catch (error) {
    if (error.response.status === 401) {
      console.error("Token invalid, redirecting to login page...");
    } else return Promise.reject(error);
  }
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === HTTP_STATUS.FORBIDDEN) {
//       // console.log(error.response.status);
//       try {
//         const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
//           withCredentials: true,
//         });
//         if (refreshResponse.status === HTTP_STATUS.SUCCESS) {
//           const newAccessToken = refreshResponse.data.AccessToken;
//           localStorage.setItem("AccessToken", newAccessToken);
//           const originalRequest = error.config;
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error("Both tokens expired:", refreshError);
//         // window.location.href = "/login";
//         // localStorage.clear();
//         console.log("Both tokens expired");
//       }
//     } else if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
//       console.log("Unauthorized");
//     }
//     return Promise.reject(error);
//   }
// );

export default api;

// api.interceptors.request.use(
//   async (config) => {
//     const accessToken = localStorage.getItem("AccessToken");
//     const RefreshToken = localStorage.getItem("RefreshToken");

//     const isTokenValid = accessToken && checkTokenExpiry(accessToken);
//     if (isTokenValid) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     } else {
//       try {
//         const response = await axios.post(`${BASE_URL}/auth/refresh`, {
//           RefreshToken: localStorage.getItem("RefreshToken"),
//         });

//         localStorage.setItem("AccessToken", response.data.AccessToken);
//         localStorage.setItem("RefreshToken", response.data.RefreshToken);

//         // console.log(jwt_decode(response.data.accessToken));
//       } catch (error) {
//         console.log("Token refresh failed:");
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// this function check if the AccesToken expired or not.
// function checkTokenExpiry(token) {
//   try {
//     const decodedToken = jwt_decode(token);
//     return decodedToken.exp * 1000 > Date.now();
//   } catch (error) {
//     return false;
//   }
// }
