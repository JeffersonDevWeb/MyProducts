import api from '../contexts/utils/api';

class ClientsServices {
  async listUserById(id) {
    return (await api.get(`/users/${id}`)).data;
  }

  async createClient(user) {
    return api.post('/users', user);
  }
}

export default new ClientsServices();
