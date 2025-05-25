export const isObjOk = (obj: any, valsCb?: (val: any) => boolean) =>
  !!Object.keys(obj ?? {}).length &&
  Object.values(obj ?? {}).every(valsCb ?? ((val) => val || val !== undefined));

export const isObjErrOk = (obj: any) => isObjOk(obj) && obj?.msg;

export const parseNull = (str: string) => (str === "_" ? null : str);
export const validateNull = (str: string) => str === "_";

export const isStr = (str?: string) => str?.trim()?.length;

export const allOrNothingStr = (reg: RegExp, str?: string) =>
  !str?.trim().length || reg.test(str ?? "");

export const replacePoint = (val: number) => (val + "").replace(".", "_");

export const parseArrFromStr = (val: string | string[]): string[] =>
  Array.isArray(val) ? val : [val];

export const isArrEq = (arr_1: any[], arr_2: any[]) => {
  if (arr_1.length !== arr_2.length) return false;

  const map_1 = new Map();

  for (const el of arr_1) {
    map_1.set(el, (map_1.get(el) || 0) + 1);
  }

  for (const el of arr_2) {
    if (!map_1.has(el)) return false;
    map_1.set(el, map_1.get(el) - 1);
    if (map_1.get(el) === 0) map_1.delete(el);
  }

  return !map_1.size;
};
