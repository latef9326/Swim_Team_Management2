import api from './api';

const competitionService = {
  getAllCompetitions: async () => {
    const response = await api.get('/competitions');
    return response.data;
  },

  getCompetitionById: async (id) => {
    const response = await api.get(`/competitions/${id}`);
    return response.data;
  },

  createCompetition: async (competitionData) => {
    const response = await api.post('/competitions', competitionData);
    return response.data;
  },

  updateCompetition: async (id, competitionData) => {
    const response = await api.put(`/competitions/${id}`, competitionData);
    return response.data;
  },

  deleteCompetition: async (id) => {
    const response = await api.delete(`/competitions/${id}`);
    return response.data;
  },

  registerSwimmer: async (competitionId, swimmerId, categories) => {
    const response = await api.post(`/competitions/${competitionId}/register`, {
      swimmerId,
      categories
    });
    return response.data;
  }
};

export default competitionService;