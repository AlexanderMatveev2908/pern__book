/* eslint-disable @typescript-eslint/no-explicit-any */

import { LinksLoggedDrop } from "@/core/config/fieldsData/general/fieldsActionsAuth";
import { DropFieldType } from "@/core/config/fieldsData/Header/header";
import { AllowedFromApp } from "@/types/types";

let navigator: ((path: string, opt?: any) => any) | null = null;

export const setNavigator = (nav: typeof navigator) => (navigator = nav);

export const goTo = (path: string, opt?: any) =>
  navigator ? navigator(path, opt) : null;

export const canStayNotice = (from: string | null) =>
  Object.values(AllowedFromApp).includes(from as AllowedFromApp);

export const getPropsNav = (el: DropFieldType) => {
  const to =
    el.path === LinksLoggedDrop.MANAGE_ACCOUNT
      ? LinksLoggedDrop.SECURITY
      : el.path;
  const state =
    el.path === LinksLoggedDrop.MANAGE_ACCOUNT
      ? { from: AllowedFromApp.GEN }
      : null;

  return { to, state };
};
