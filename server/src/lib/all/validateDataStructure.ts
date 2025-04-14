export const isObjOk = (obj: any) =>
  !!Object.keys(obj ?? {}).length &&
  Object.values(obj ?? {}).some((val) => !!val);
