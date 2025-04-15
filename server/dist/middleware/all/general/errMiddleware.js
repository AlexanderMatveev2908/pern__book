import { err500 } from "../../../lib/all/err.js";
export const errMiddleware = (err, _, res, __) => {
    console.log({
        error: err.message,
        stack: err.stack,
    });
    return err500(res);
};
