/* eslint-disable @typescript-eslint/no-explicit-any */

let navigator: ((path: string, opt?: any) => any) | null = null;

export const setNavigator = (nav: typeof navigator) => (navigator = nav);

export const goTo = (path: string, opt?: any) =>
  navigator ? navigator(path, opt) : null;
