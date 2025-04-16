export const isObjOk = (obj, valsCb) => !!Object.keys(obj !== null && obj !== void 0 ? obj : {}).length &&
    Object.values(obj !== null && obj !== void 0 ? obj : {}).every(valsCb !== null && valsCb !== void 0 ? valsCb : ((val) => !!val));
export const isObjErrOk = (obj) => isObjOk(obj, (val) => val !== undefined);
