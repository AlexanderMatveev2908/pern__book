export const makeNoticeTxt = (txt: string) =>
  `We've sent you an email ${txt}. If you don't see it, check your spam folder, it might be partying there 🎉`;

export const formatMsgCode = (msg: string) => msg.split("_").join(" ");

export const capt = (txt: string) => txt.at(0)?.toUpperCase() + txt.slice(1);

export const captAll = (txt: string) =>
  txt
    .trim()
    .replace(/\s\s/g, "")
    .split(" ")
    .map((el) => capt(el))
    .join(" ")
    .trim();
