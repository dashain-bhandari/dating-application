import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    // baseURL:'http://localhost:8000',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

