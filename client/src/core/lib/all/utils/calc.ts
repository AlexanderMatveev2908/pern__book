import { CartItemType } from "@/types/all/Cart";
import { isWeekend, format } from "date-fns";
import { BookStoreType } from "@/types/all/bookStore";
import { priceFormatter } from "./formatters";
import { REG_BIG } from "@/core/config/regex";

export const calcPriceItem = (qty: number, price: number) =>
  priceFormatter(qty * price);

export const calcTotPriceCart = (arg: CartItemType[]) =>
  arg.reduce(
    (acc, curr) =>
      // ? book deleted or out of stock skip
      curr!.book?.deletedAt || +!curr!.book?.qty
        ? acc
        : acc + curr.qty * curr!.book!.price,
    0
  );

export const getExpectedDeliveredDay = ({
  daysToAdd,
  dayFrom = new Date(),
}: {
  daysToAdd: number;
  dayFrom?: string | number | Date;
}) => {
  let addedDays = 0;

  const currDate =
    dayFrom instanceof Date
      ? dayFrom
      : new Date(REG_BIG.test(dayFrom + "") ? +dayFrom : dayFrom);

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
  if (!+store!.deliveryPrice! || store?.deletedAt) return 0;
  if (!+store!.freeDeliveryAmount!) return +store!.deliveryPrice!;

  return subTotal >= +store!.freeDeliveryAmount! ? 0 : +store!.deliveryPrice!;
};
