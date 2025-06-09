import cors from "cors";
import { frontURL } from "../../config/env.js";

export const corsMid = () =>
  cors({
    origin: [
      process.env.FRONT_URL!,
      "http://localhost:3001",
      "https://localhost",
    ],
    credentials: true,
  });
