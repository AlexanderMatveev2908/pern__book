import { backURL } from "./env";
import axios from "axios";

export const appInstance = axios.create({
  baseURL: backURL,
  withCredentials: true,
});

appInstance.interceptors.request.use(
  (req) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) req.headers["Authorization"] = `Bearer ${token}`;

    req.headers["Content-Type"] =
      req.data instanceof FormData ? "" : "application/json";
    return req;
  },
  (err) => Promise.reject(err)
);
