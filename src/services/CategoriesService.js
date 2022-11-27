import api from '../contexts/utils/api';

class CategoriesService {
  async listCategories() {
    return (await api.get('/categories')).data;
  }
}

export default new CategoriesService();
