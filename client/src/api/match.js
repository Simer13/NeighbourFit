import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL + "/api/neighborhoods";

export const getMatches = (prefs) => axios.post(`${API}/match`, prefs);
