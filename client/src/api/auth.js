import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL + "/api/auth";

export const signup = (data) => axios.post(`${API}/signup`, data);
export const login = (data) => axios.post(`${API}/login`, data);
