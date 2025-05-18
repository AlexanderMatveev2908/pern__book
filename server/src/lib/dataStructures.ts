export const isObjOk = (obj: any, valsCb?: (val: any) => boolean) =>
  !!Object.keys(obj ?? {}).length &&
  Object.values(obj ?? {}).every(valsCb ?? ((val) => val || val !== undefined));

export const isObjErrOk = (obj: any) => isObjOk(obj) && obj?.msg;

export const parseNull = (str: string) => (str === "_" ? null : str);
export const validateNull = (str: string) => str === "_";

export const allOrNothingStr = (reg: RegExp, str?: string) =>
  !str?.trim().length || reg.test(str ?? "");

export const replacePoint = (val: number) => (val + "").replace(".", "_");

export const parseArrFromStr = (val: string | string[]): string[] =>
  Array.isArray(val) ? val : [val];
