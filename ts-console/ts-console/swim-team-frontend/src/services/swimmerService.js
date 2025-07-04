import api from './api';

const swimmerService = {
  getAllSwimmers: async () => {
    const response = await api.get('/swimmers');
    return response.data;
  },

  getSwimmerById: async (id) => {
    const response = await api.get(`/swimmers/${id}`);
    return response.data;
  },

  createSwimmer: async (swimmerData) => {
    const response = await api.post('/swimmers', swimmerData);
    return response.data;
  },

  updateSwimmer: async (id, swimmerData) => {
    const response = await api.put(`/swimmers/${id}`, swimmerData);
    return response.data;
  },

  deleteSwimmer: async (id) => {
    const response = await api.delete(`/swimmers/${id}`);
    return response.data;
  },

  getSwimmerStats: async (id) => {
    const response = await api.get(`/swimmers/${id}/stats`);
    return response.data;
  }
};

export default swimmerService;