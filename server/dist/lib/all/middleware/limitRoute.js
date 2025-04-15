import rateLimit from "express-rate-limit";
const quarter = 1000 * 60 * 15;
export const hour = quarter * 4;
export const limitRoute = ({ max, ms = quarter, }) => rateLimit({
    windowMs: ms,
    max,
    message: {
        msg: "Our hamster-powered servers took a break, try later 🐹",
        ok: false,
    },
    keyGenerator: (req) => { var _a; return (_a = req.ip) !== null && _a !== void 0 ? _a : "unknown-ip"; },
});
