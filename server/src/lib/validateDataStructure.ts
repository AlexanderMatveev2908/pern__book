export const isObjOk = (obj: any, valsCb?: (val: any) => boolean) =>
  !!Object.keys(obj ?? {}).length &&
  Object.values(obj ?? {}).every(valsCb ?? ((val) => val || val !== undefined));

export const isObjErrOk = (obj: any) =>
  isObjOk(obj) && (obj?.msg || obj.message);
