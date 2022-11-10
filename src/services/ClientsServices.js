import HttpClient from './utils/HttpClient';

class ClientsServices {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listClients(orderBy = 'asc') {
    return this.HttpClient.get(`/Clients?orderBy=${orderBy}`);
  }

  async createClient(user) {
    return this.HttpClient.post('/users', { body: user });
  }
}

export default new ClientsServices();
