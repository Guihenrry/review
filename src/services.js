import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/reviewapi/wp-json/api/v1"
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(endPoint) {
    return axiosInstance.get(endPoint);
  },
  post(endPoint, body) {
    return axiosInstance.post(endPoint, body);
  },
  put(endPoint, body) {
    return axiosInstance.put(endPoint, body);
  },
  delete(endPoint) {
    return axiosInstance.delete(endPoint);
  },
  signIn(body) {
    return axios.post(
      "http://localhost/reviewapi/wp-json/jwt-auth/v1/token",
      body
    );
  },
  validateToken() {
    return axiosInstance.post(
      "http://localhost/reviewapi/wp-json/jwt-auth/v1/token/validate "
    );
  }
};
