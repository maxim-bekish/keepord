import axios from "axios";
import { getCookie } from "./getCookie";

export const API_URL = `http://127.0.0.1:8000/`;
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getCookie("access")}`;
  return config;
});
export default $api;
