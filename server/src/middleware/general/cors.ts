import cors from "cors";
import { frontURL } from "../../config/env.js";

export const corsMid = () =>
  cors({
    origin: [frontURL!],
    credentials: true,
  });
