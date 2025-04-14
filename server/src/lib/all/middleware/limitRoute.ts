import rateLimit from "express-rate-limit";

const quarter = 1000 * 60 * 15;
export const hour = quarter * 4;

export const limitRoute = ({
  max,
  ms = quarter,
}: {
  max: number;
  ms?: number;
}) =>
  rateLimit({
    windowMs: ms,
    max,
    message: {
      msg: "Our hamster-powered servers took a break, try later 🐹",
      ok: false,
    },
    keyGenerator: (req) => req.ip! ?? "unknown-ip",
  });
