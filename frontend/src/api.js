import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth"; // Your backend URL

// // Register user
// export const registerUser = async (userData) => {
//   return axios.post(`${API_URL}/register`, userData);
// };

// // Login user
// export const loginUser = async (userData) => {
//   return axios.post(`${API_URL}/login`, userData);
// };


const API_BASE = "http://localhost:5000/api/auth"; 


// Get token from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const registerUser = async (userData) => {
    console.log("Registering user:", userData);  // ✅ Debugging
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log("Registration Response:", data); // ✅ Log API Response

        return data;
    } catch (error) {
        console.error("Registration Error:", error);
        return { message: "Failed to register" };
    }
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};


// ✅ Logout user (Clear local storage)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.log("✅ User logged out");
};

// ✅ Fetch protected route data
export const getProtectedData = async () => {
  try {
      const response = await axios.get("http://localhost:5000/api/protected", {
          headers: getAuthHeaders()
      });
      return response.data;
  } catch (error) {
      console.error("❌ Protected Data Fetch Error:", error.response?.data);
      return { message: "Unauthorized" };
  }
};

// ✅ Fetch admin-only data
export const getAdminData = async () => {
  try {
      const response = await axios.get("http://localhost:5000/api/admin", {
          headers: getAuthHeaders()
      });
      return response.data;
  } catch (error) {
      console.error("❌ Admin Data Fetch Error:", error.response?.data);
      return { message: "Forbidden" };
  }
};
