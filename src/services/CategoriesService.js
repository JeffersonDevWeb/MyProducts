import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.HttpClient = new HttpClient('https://restapi-myproducts.herokuapp.com');
  }

  async listCategories() {
    return this.HttpClient.get('/categories');
  }
}

export default new CategoriesService();
