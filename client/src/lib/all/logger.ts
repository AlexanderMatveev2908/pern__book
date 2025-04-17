/* eslint-disable @typescript-eslint/no-explicit-any */
export const cg = (str: string, ...arg: any) => {
  console.group(str.toUpperCase());

  for (const a of arg) {
    console.log(a);
  }
  console.groupEnd();
};
