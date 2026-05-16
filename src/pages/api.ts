import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fixup-fullstack.onrender.com/api'
});

// המיירט שמוסיף את הטוקן לכל בקשה שיוצאת
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;