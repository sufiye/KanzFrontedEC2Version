import axios from "axios";
import { useTokens } from "../stores/tokenStore.js";
import { refreshTokens } from "./utils.js";

const api = axios.create({
  baseURL: 'http://localhost:5064/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useTokens.getState().accessToken;
    const setLoading = useTokens.getState().setLoading;

    if (setLoading) setLoading(true);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Response interceptor: refresh token mexanizmi
api.interceptors.response.use(
  response => {
    const setLoading = useTokens.getState().setLoading;
    if (setLoading) setLoading(false);
    return response;
  },
  async (error) => {
    const setLoading = useTokens.getState().setLoading;
    if (setLoading) setLoading(false);

    const originalRequest = error.config;
    const clearTokens = useTokens.getState().clearTokens;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: 'Bearer ' + token
          };
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const newToken = await refreshTokens();
        processQueue(null, newToken);
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: 'Bearer ' + newToken
        };
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        if (clearTokens) clearTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;