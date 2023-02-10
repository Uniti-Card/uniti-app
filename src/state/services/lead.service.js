import api from './api';

class LeadService {
  add(data) {
    return api.post(`leads/`, data);
  }
}

export default new LeadService();
