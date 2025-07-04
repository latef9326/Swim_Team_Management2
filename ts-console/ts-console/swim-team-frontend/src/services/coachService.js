import api from './api'; // Twój axios skonfigurowany z bazowym URL i tokenem

const getAllCoaches = async () => {
  // Wywołujemy endpoint z parametrem ?role=COACH
  const response = await api.get('/users', {
    params: { role: 'COACH' }
  });
  return response.data;
};

export default {
  getAllCoaches,
};
