/* eslint-disable @typescript-eslint/no-explicit-any */

import { AllowedFromApp } from "@/types/types";

let navigator: ((path: string, opt?: any) => any) | null = null;

export const setNavigator = (nav: typeof navigator) => (navigator = nav);

export const goTo = (path: string, opt?: any) =>
  navigator ? navigator(path, opt) : null;

export const canStayNotice = (from: string | null) =>
  Object.values(AllowedFromApp).includes(from as AllowedFromApp);
