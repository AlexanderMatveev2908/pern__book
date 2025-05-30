import rateLimit from "express-rate-limit";
import { clearCookie } from "../../lib/hashEncryptSign/JWE.js";
import { ReqApp } from "../../types/types.js";
import { Response } from "express";
import { err429 } from "../../lib/responseClient/err.js";

export const securityLimiter = rateLimit({
  windowMs: 1000 * 60 * 60,
  max: 10,
  message: {
    msg: "Our hamster-powered servers took a break, try later 🐹",
    ok: false,
    pushOut: true,
  },
  keyGenerator: (req) => req.ip! ?? "unknown-ip",
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req: ReqApp, res: Response) => {
    clearCookie(res);

    return err429(res, {
      msg: "Our hamster-powered servers took a break, try later 🐹",
      ok: false,
      pushOut: true,
    });
  },
});
