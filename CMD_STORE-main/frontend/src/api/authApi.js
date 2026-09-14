import axiosClient from './axiosClient';

export const authApi = {
  login: async (username, password) => {
    // Matches your backend: POST /api/auth/login
    return axiosClient.post('/auth/login', { username, password });
  },
};