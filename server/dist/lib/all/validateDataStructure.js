export const isObjOk = (obj) => !!Object.keys(obj !== null && obj !== void 0 ? obj : {}).length &&
    Object.values(obj !== null && obj !== void 0 ? obj : {}).some((val) => !!val);
