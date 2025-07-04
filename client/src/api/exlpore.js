import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + "/api";

export const getMatchedNeighborhoods = (prefs) => axios.post(`${API}/neighborhoods/match`, prefs);
export const getNeighborhoodDetails = (id) => axios.get(`${API}/neighborhoods/${id}`);
export const getNearbyPlaces = (id) => axios.get(`${API}/neighborhoods/${id}/nearby`);
export const likeNeighborhood = (data) => axios.post(`${API}/likes`, data);
export const unlikeNeighborhood = (id) => axios.delete(`${API}/likes/${id}`);
export const postComment = (data) => axios.post(`${API}/comments`, data);
export const getComments = (id) => axios.get(`${API}/comments/${id}`);
