function Logout() {
  try {
    localStorage.removeItem("jwtToken");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export default Logout;
