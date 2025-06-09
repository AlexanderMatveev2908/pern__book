import cors from "cors";
import { frontURL, isDev } from "../../config/env.js";

export const corsMid = () =>
  cors({
    origin: [
      process.env.FRONT_URL!,
      ...(isDev ? ["http://localhost:3001", "https://localhost"] : []),
    ],
    credentials: true,
  });
