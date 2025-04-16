export const isObjOk = (obj: any, valsCb?: (val: any) => boolean) =>
  !!Object.keys(obj ?? {}).length &&
  Object.values(obj ?? {}).every(valsCb ?? ((val) => !!val));

export const isObjErrOk = (obj: any) =>
  isObjOk(obj, (val) => val !== undefined);
