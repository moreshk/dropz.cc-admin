import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-dropz-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return { redirect: true };
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as axios };

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
