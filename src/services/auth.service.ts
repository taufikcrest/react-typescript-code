import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_API_URL}/auth/`;

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    return axios
      .get(API_URL + "logout")
      .then(response => {  
        localStorage.removeItem("user");
        return response.data;
      });
  }

  register(firstName: string, lastName: string, email: string, password: string, phoneNumber: string ) {
    return axios.post(API_URL + "signup", {
      firstName,
      lastName,
      email,
      password,
      phone:phoneNumber
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();