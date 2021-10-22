import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_BASE_API_URL}/admin/`;

class UsersService {
  getAll() {
    return axios.get(`${API_URL}/users`, { headers: authHeader() });
  }

  get(id: string) {
    return axios.get(`${API_URL}/user/${id}`, { headers: authHeader() });
  }

  create(data: object) {
    return axios.post(`${API_URL}/user`, data, { headers: authHeader() });
  }

  update(id: string, data: object) {
    return axios.put(`${API_URL}/user/${id}`, data, { headers: authHeader() });
  }

  delete(id: string) {
    return axios.delete(`${API_URL}/user/${id}`, { headers: authHeader() });
  }

}

export default new UsersService();