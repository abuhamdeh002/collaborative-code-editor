import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const projectApi = {
    getProjects: () => api.get('/projects'),
    getProject: (id) => api.get(`/projects/${id}`),
    createProject: (data) => api.post('/projects', data),
    updateProject: (id, data) => api.put(`/projects/${id}`, data),
    deleteProject: (id) => api.delete(`/projects/${id}`),
    getProjectContent: (id) => api.get(`/projects/${id}/content`),
    updateProjectContent: (id, content) => api.put(`/projects/${id}/content`, { content }),
};

export const authApi = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getCurrentUser: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
};

export const executionApi = {
    executeCode: (projectId, language) =>
        api.post(`/execution/${projectId}`, { language }),
    getExecutionResult: (executionId) =>
        api.get(`/execution/result/${executionId}`),
};

export default {
    project: projectApi,
    auth: authApi,
    execution: executionApi,
};