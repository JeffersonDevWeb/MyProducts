import api from '../contexts/utils/api';

class ProductsService {
  async listProducts(orderBy = 'asc') {
    return (await api.get(`/products?orderBy=${orderBy}`)).data;
  }

  async createProducts(product) {
    return api.post('/products', product);
  }

  async getProductById(id) {
    return (await api.get(`/products/${id}`)).data;
  }

  async getProductByUserId(id, orderBy = 'asc') {
    return (await api.get(`/profile/${id}?orderBy=${orderBy}`)).data;
  }

  async deleteProducts(id) {
    return (await api.delete(`/products/${id}`)).data;
  }

  async editProducts(id, product) {
    return api.put(`/products/${id}`, product);
  }

  async buyProducts(id, product) {
    return api.patch(`/products/${id}`, product);
  }
}

export default new ProductsService();
