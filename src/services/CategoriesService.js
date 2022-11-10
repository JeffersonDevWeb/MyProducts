import HttpClient from './utils/HttpClient';

import api from '../contexts/utils/api';

class CategoriesService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    return (await api.get('/categories')).data;
  }
}

export default new CategoriesService();
