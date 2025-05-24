import { backURL } from "./env";
import axios from "axios";

export const appInstance = axios.create({
  baseURL: backURL,
  withCredentials: true,
});

appInstance.interceptors.request.use(
  (req) => {
    console.log(req.baseURL, req.url);

    const token = sessionStorage.getItem("accessToken");
    if (token) req.headers["Authorization"] = `Bearer ${token}`;

    if (!(req.data instanceof FormData))
      req.headers["Content-Type"] = "application/json";

    return req;
  },
  (err) => Promise.reject(err)
);
