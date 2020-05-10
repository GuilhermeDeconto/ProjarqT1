import axios from "axios";

/* Import of getToken other class JS */
import { getToken } from '../api/LoginAuth';

const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use( async config => {
  const token = getToken();
  if ( token ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;