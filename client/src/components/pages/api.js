import axios from "axios";
import { Navigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SUCCESS: 200,
  CREATED: 201,
};

const ERROR_MESSAGE = {
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_AUTHORIZED: "You are not authorized!",
  REFRESH_EXPIRED: "Refresh token has expired",
};

const apiPublic = axios.create({
  baseURL: BASE_URL,
});

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  try {
    const AccessToken = localStorage.getItem("AccessToken");
    if (!AccessToken) {
      localStorage.clear();
      window.location.href = "/anauthorized";
    } else config.headers.Authorization = `Bearer ${AccessToken}`;

    return config;
  } catch (error) {
    if (error.response.status === 401) {
      console.error("Token invalid, redirecting to login page...");
    } else return Promise.reject(error);
  }
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === HTTP_STATUS.FORBIDDEN) {
      try {
        const refreshResponse = await axios.get(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });
        if (refreshResponse.status === HTTP_STATUS.SUCCESS) {
          // FOR TESTING PURPOSES
          console.log("Refreshed Token");
          const newAccessToken = refreshResponse.data.AccessToken;
          localStorage.setItem("AccessToken", newAccessToken);
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        if (refreshError.response.status === HTTP_STATUS.UNAUTHORIZED) {
          console.error(" ANAUTHORIZED ", refreshError);
          localStorage.clear();
          window.location.href = "/anauthorized";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export { apiPublic };

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
