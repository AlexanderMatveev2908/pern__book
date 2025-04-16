import { check } from "express-validator";
import { REG_ID } from "../../../config/regex.js";
export const validateIDs = [
    check().custom((_, { req }) => {
        const { params, query, body } = req;
        const sources = [query, body, params];
        for (const source of sources) {
            if (Object.entries(source !== null && source !== void 0 ? source : {}).some(([key, val]) => key.includes("ID") && !REG_ID.test(val)))
                throw new Error("Invalid ID format");
        }
        return true;
    }),
];
