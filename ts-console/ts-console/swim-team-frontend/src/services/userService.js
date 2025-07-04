import api from './api';

const userService = {
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  changePassword: async (id, passwordData) => {
    const response = await api.put(`/users/${id}/password`, passwordData);
    return response.data;
  }
};

export default userService;