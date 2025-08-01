import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const instance = axios.create({
  baseURL: "http://192.168.1.130:8080/api",
});

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export default instance;
