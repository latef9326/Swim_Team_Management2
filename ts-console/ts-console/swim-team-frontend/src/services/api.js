import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // Wymagane dla CORS z credentials
});

// Request interceptor dodający token do nagłówka Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Dodaj obsługę preflight requests
    if (config.method === 'options') {
      config.headers['Access-Control-Request-Headers'] = 'Authorization';
      config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - wylogowuje użytkownika przy 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Obsłuż błędy CORS
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error('Network error - check CORS configuration');
    }
    
    return Promise.reject(error);
  }
);

export default api;