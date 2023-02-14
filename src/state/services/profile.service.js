import api from "./api";

class ProfileService {
  get(id) {
    return api.get(`profiles/public/${id}`);
  }
}

export default new ProfileService();
