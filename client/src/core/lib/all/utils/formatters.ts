export const makeNoticeTxt = (txt: string) =>
  `We've sent you an email ${txt}. If you don't see it, check your spam folder, it might be partying there 🎉`;

export const formatMsgCode = (msg: string) => msg.split("_").join(" ");

export const capt = (txt: string) => txt.at?.(0)?.toUpperCase() + txt?.slice(1);

export const captAll = (txt: string) =>
  txt
    .trim()
    .split(" ")
    .map((el) => (el ? capt(el) : ""))
    .join(" ")
    .trim()
    .replace(/[\s\s]{2,}/g, " ");

export const decapt = (txt: string) => txt.at(0) + txt.slice(1).toLowerCase();

export const appendKey = (val: string) => captAll(val).trim();

export const parseNullRead = (str: string) => (str.trim().length ? str : null);

export const parseNullPost = (str: string | null): string =>
  str?.trim().length ? str : "_";
