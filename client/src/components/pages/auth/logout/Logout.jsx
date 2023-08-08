function Logout() {
  try {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export default Logout;
