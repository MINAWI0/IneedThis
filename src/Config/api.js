import axios from "axios"

export const API_BASE_URL = "http://localhost:8080"
// export const API_BASE_URL = "https://springneedthisbackend-production.up.railway.app/"

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
        // "Content-Type" : "application/json"
    }
})

// Request interceptor to dynamically set the Authorization header
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export default api;
