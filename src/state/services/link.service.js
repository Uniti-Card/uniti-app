import api from "./api";

class LinkService {
  getAll(profileId) {
    return api.get(`links?profile=${profileId}`);
  }
}

export default new LinkService();
