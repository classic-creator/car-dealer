import axios from 'axios';

// Create a global Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Centralized error handling
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('API Error:', error.response.data.message || error.message);
      if (error.response.status === 401) {
        // Handle unauthorized (e.g., redirect to login)
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error: No response received');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
