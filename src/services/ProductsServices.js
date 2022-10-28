import HttpClient from './utils/HttpClient';

class ProductsService {
  constructor() {
    this.HttpClient = new HttpClient('https://restapi-myproducts.herokuapp.com');
  }

  async listProducts(orderBy = 'asc') {
    return this.HttpClient.get(`/products?orderBy=${orderBy}`);
  }

  async createProducts(product) {
    return this.HttpClient.post('/products', { body: product });
  }

  async getProductById(id) {
    return this.HttpClient.get(`/products/${id}`);
  }

  async deleteProducts(id) {
    return this.HttpClient.delete(`/products/${id}`);
  }

  async editProducts(id, product) {
    return this.HttpClient.put(`/products/${id}`, { body: product });
  }

  async buyProducts(id, product) {
    return this.HttpClient.patch(`/products/${id}`, { body: product });
  }
}

export default new ProductsService();
