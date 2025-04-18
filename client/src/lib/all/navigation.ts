/* eslint-disable @typescript-eslint/no-explicit-any */

import { AllowedFromNotice } from "@/types/types";

let navigator: ((path: string, opt?: any) => any) | null = null;

export const setNavigator = (nav: typeof navigator) => (navigator = nav);

export const goTo = (path: string, opt?: any) =>
  navigator ? navigator(path, opt) : null;

export const canStayNotice = (from: string | null) =>
  Object.values(AllowedFromNotice).includes(from as AllowedFromNotice);
