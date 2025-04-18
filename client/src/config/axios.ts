import { isDev } from "./env";
import axios from "axios";

export const appInstance = axios.create({
  baseURL: isDev
    ? import.meta.env.VITE_BACK_URL_DEV
    : import.meta.env.VITE_BACK_URL,
  withCredentials: true,
});

appInstance.interceptors.request.use(
  (req) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) req.headers["Authorization"] = `Bearer ${token}`;
    return req;
  },
  (err) => Promise.reject(err)
);
