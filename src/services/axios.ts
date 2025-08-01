import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const instance = axios.create({
  baseURL: "https://todo.arnolddcunha.com/api",
});

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export default instance;
