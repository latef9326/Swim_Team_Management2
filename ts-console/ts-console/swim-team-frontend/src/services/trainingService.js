import api from './api';

const trainingService = {
  getAllTrainings: async () => {
    const response = await api.get('/trainings');
    return response.data;
  },

  getTrainingById: async (id) => {
    const response = await api.get(`/trainings/${id}`);
    return response.data;
  },

  getTrainingsForSwimmer: async (swimmerId) => {
    const response = await api.get(`/trainings/swimmer/${swimmerId}`);
    return response.data;
  },

  createTraining: async (trainingData) => {
    const response = await api.post('/trainings', trainingData);
    return response.data;
  },

  updateTraining: async (id, trainingData) => {
    const response = await api.put(`/trainings/${id}`, trainingData);
    return response.data;
  },

  deleteTraining: async (id) => {
    const response = await api.delete(`/trainings/${id}`);
    return response.data;
  },

  addSwimmerToTraining: async (trainingId, swimmerId) => {
    const response = await api.post(`/trainings/${trainingId}/swimmers/${swimmerId}`);
    return response.data;
  },

  removeSwimmerFromTraining: async (trainingId, swimmerId) => {
    const response = await api.delete(`/trainings/${trainingId}/swimmers/${swimmerId}`);
    return response.data;
  }
};

export default trainingService;