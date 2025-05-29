import { backURL } from "./env";
import axios from "axios";

export const appInstance = axios.create({
  baseURL: backURL,
  withCredentials: true,
});

console.log(backURL);

appInstance.interceptors.request.use(
  (req) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) req.headers["Authorization"] = `Bearer ${token}`;

    if (!(req.data instanceof FormData))
      req.headers["Content-Type"] = "application/json";

    return req;
  },
  (err) => Promise.reject(err)
);
