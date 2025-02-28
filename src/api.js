import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add global error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const CategoryAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', { api_v1_category: data }),
  update: (id, data) => api.put(`/categories/${id}`, { api_v1_category: data }),
  delete: (id) => api.delete(`/categories/${id}`)
};

export const PostAPI = {
  getAll: () => api.get('/posts'),
  get: (id) => api.get(`/posts/${id}`),
  // Create and update uses FormData so "api_v1_" is not used here
  // This is because FormData is a special object meant to be sent 
  // as the request body on its own. Wrapping it inside a plain object 
  // causes problems—axios will try to serialize it to JSON, and 
  // FormData objects don’t serialize in the way you want.
  create: (data, config) => api.post('/posts', data, config),
  update: (id, data, config) => api.put(`/posts/${id}`, data, config),
  delete: (id) => api.delete(`/posts/${id}`)
};

export default api;
