import api from "./api";

class ProductService {
  getAll(profileId) {
    return api.get(`products?profile=${profileId}`);
  }
}

export default new ProductService();
