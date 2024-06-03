import axios from 'axios';

const API = axios.create({ baseURL: 'your_backend_url' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export const register = (formData) => API.post('/api/auth/register', formData);
export const login = (formData) => API.post('/api/auth/login', formData);
export const searchBreweries = (params) => API.get('/api/breweries/search', { params });
export const getBrewery = (id) => API.get(`/api/breweries/${id}`);
export const addReview = (id, review) => API.post(`/api/breweries/${id}/reviews`, review);
