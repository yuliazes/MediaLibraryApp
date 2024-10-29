import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5002/api', // Your backend URL
});

// Add a request interceptor to include the token in each request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;