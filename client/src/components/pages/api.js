import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = "http://localhost:5000";
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("AccessToken");
    const isTokenValid = accessToken && checkTokenExpiry(accessToken);
    if (isTokenValid) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("not updated");
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          RefreshToken: localStorage.getItem("RefreshToken"),
        });
          
        localStorage.setItem("AccessToken", response.data.AccessToken);
        localStorage.setItem("RefreshToken", response.data.RefreshToken);
        console.log("tokens updated !");
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// this function check if the AccesToken expired or not.
function checkTokenExpiry(token) {
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
}

export default api;
