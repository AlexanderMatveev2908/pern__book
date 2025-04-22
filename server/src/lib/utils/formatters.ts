export const formatMsgApp = (str: string) => str.split("_").join(" ");

export const capChar = (txt: string) => txt.at(0)?.toUpperCase() + txt.slice(1);

export const captAll = (txt: string) =>
  txt
    .trim()
    .replace(/\s\s/g, "")
    .split(" ")
    .map((el) => capChar(el))
    .join(" ")
    .trim();
