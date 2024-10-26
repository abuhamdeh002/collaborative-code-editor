// services/api.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const projectApi = {
  // Project related endpoints
  fetchProjects: async () => {
    const response = await fetch(`${BASE_URL}/projects`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  createProject: async (projectData) => {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  updateProject: async (projectId, projectData) => {
    const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  deleteProject: async (projectId) => {
    const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return response.json();
  },

  // File related endpoints
  getFileContent: async (projectId, fileId) => {
    const response = await fetch(`${BASE_URL}/projects/${projectId}/files/${fileId}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch file content');
    return response.json();
  },

  updateFileContent: async (projectId, fileId, content) => {
    const response = await fetch(`${BASE_URL}/projects/${projectId}/files/${fileId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error('Failed to update file content');
    return response.json();
  }
};

export default projectApi;