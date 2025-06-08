export const formatMsgApp = (str: string) => str.split("_").join(" ");

export const capChar = (txt: string) => txt.at(0)?.toUpperCase() + txt.slice(1);

export const captAll = (txt: string) =>
  txt
    .trim()
    .split(" ")
    .map((el) => (el ? capChar(el) : ""))
    .join(" ")
    .trim()
    .replace(/[\s\s]{2,}/g, " ");

export const findVal = (val: string | string[], key: string) =>
  (Array.isArray(val) && val.includes(key)) || val === key ? key : null;

export const formatFloat = (val: number) => +val.toFixed(2);
