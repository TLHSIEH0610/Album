import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const apiUrl = process.env.REACT_APP_DEV_URL;
const config: AxiosRequestConfig = {
  baseURL: "",
  // timeout: 10000,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
};
//Create Axios
const service: AxiosInstance = axios.create(config);

/** Request Intercept **/
service.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {};
    }
    const token = localStorage.getItem("token");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** Response Intercept **/
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error: any) => {
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default service;
