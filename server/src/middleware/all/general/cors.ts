import cors from "cors";
import { isDev } from "../../../config/env.js";

export const corsMid = () =>
  cors({
    origin: isDev ? process.env.FRONT_URL_DEV : process.env.FRONT_URL,
    credentials: true,
  });
