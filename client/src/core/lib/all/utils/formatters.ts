import { CartItemType } from "@/types/all/Cart";
import { isWeekend, format } from "date-fns";
import { BookStoreType } from "@/types/all/bookStore";

/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const countW = (len: number, txt?: string) =>
  (txt?.length ?? 0) > len ? txt?.slice(0, len) + "..." : txt;

export const priceFormatter = (price?: string | number, fb?: string) => {
  const priceVal = +(price ?? 0);

  return !priceVal && fb
    ? fb
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(priceVal);
};

export const formatPlural = (val: number = 0) => (val > 1 ? "s" : "");

const formatChainArrStr = (parts: string[]) => {
  if (parts.length === 1) return parts[0];

  let i = 0;
  let str = "";
  while (i < parts.length) {
    if (i) {
      if (i !== parts.length - 1) str += ", " + parts[i];
      else str += " and " + parts[i];
    } else {
      str += parts[i];
    }

    i++;
  }

  return str;
};

export const formatDay = (days?: number) => {
  const totalDays = days ?? 0;

  const years = Math.floor(totalDays / 365);
  const months = Math.floor(totalDays / 30);
  const weeks = Math.floor((totalDays % 30) / 7);
  const daysNum = Math.floor(((totalDays % 30) % 7) % 7);

  const parts: string[] = [];

  if (months) parts.push(`${months} month${formatPlural(months)}`);
  if (weeks) parts.push(`${weeks} week${formatPlural(weeks)}`);
  if (daysNum) parts.push(`${daysNum} day${formatPlural(daysNum)}`);

  return years ? "Maybe a little too much..." : formatChainArrStr(parts);
};

export const formatValDel = (key: string, val: any) => {
  switch (key) {
    case "deliveryTime":
      return formatDay(val as number);
    case "deliveryPrice":
      return priceFormatter(val as string, "Free Delivery");
    case "freeDeliveryAmount":
      return priceFormatter(val as string, "N/A");
    default:
      throw new Error(`Invalid key: ${key}`);
  }
};

export const makeNum = (type: "min" | "max", txt?: string) => {
  const formatted = type === "min" ? +(txt ?? "0") : +(txt || Infinity);

  return isNaN(formatted) ? (type === "min" ? 0 : Infinity) : formatted;
};

export const formatD = (date: string | Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
  }).format(new Date(date));

export const calcPriceItem = (qty: number, price: number) =>
  priceFormatter(qty * price);

export const calcTotPriceCart = (arg: CartItemType[]) =>
  arg.reduce((acc, curr) => acc + curr.qty * curr!.book!.price, 0);

export const getExpectedDeliveredDay = ({
  daysToAdd,
}: {
  daysToAdd: number;
}) => {
  const currDate = new Date();
  let addedDays = 0;

  while (addedDays < daysToAdd) {
    currDate.setDate(currDate.getDate() + 1);

    if (!isWeekend(currDate)) addedDays++;
  }

  return format(currDate, "EEE, dd MMM yyyy");
};

export const getDeliveryPrice = ({
  subTotal,
  store,
}: {
  subTotal: number;
  store: BookStoreType;
}) => {
  if (!+store!.deliveryPrice!) return 0;
  if (!+store!.freeDeliveryAmount!) return +store!.deliveryPrice!;

  return subTotal > +store!.freeDeliveryAmount! ? 0 : +store!.deliveryPrice!;
};
