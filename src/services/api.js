import axios from 'axios';

// Dynamically construct base URL to avoid hardcoding localhost
const rawApiUrl = import.meta.env.VITE_API_URL || 'https://matrimony-backend-d7cq.onrender.com';
const cleanApiUrl = rawApiUrl.replace(/\/$/, ''); // Remove trailing slash if present

const API = axios.create({
  baseURL: cleanApiUrl.endsWith('/api') ? cleanApiUrl : `${cleanApiUrl}/api`,
});

// Pass JWT token automatically on every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
