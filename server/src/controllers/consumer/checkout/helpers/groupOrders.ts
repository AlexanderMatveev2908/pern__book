import { formatFloat } from "../../../../lib/utils/formatters.js";
import { BookStoreInstance } from "../../../../models/all/BookStore.js";
import { CartInstance } from "../../../../models/all/Cart.js";
import { CartItemInstance } from "../../../../models/all/CartItem.js";

export type GroupedOrdersType = Record<
  string,
  {
    items: CartItemInstance[];
    store: BookStoreInstance;
  }
>;

export const groupOrdersByStore = (
  cart: CartInstance
): { groupedOrders: GroupedOrdersType } => {
  const groupedOrders = cart.items!.reduce(
    (acc: GroupedOrdersType, curr: CartItemInstance) => {
      const storeID = curr.book!.store!.id;

      if (!acc[storeID as keyof typeof acc])
        acc[storeID as keyof typeof acc] = {
          store: curr.book!.store!,
          items: [],
        };
      (
        acc[storeID as keyof typeof acc].items as unknown as CartItemInstance[]
      ).push(curr as CartItemInstance);
      return acc;
    },
    {} as GroupedOrdersType
  );

  return { groupedOrders: groupedOrders };
};

export const calcAmountStore = ({
  store,
  items,
}: {
  store: BookStoreInstance;
  items: CartItemInstance[];
}) => {
  const totAmountStore = items.reduce(
    (acc, curr) => acc + +curr.book!.price * curr.qty,
    0
  );

  const deliveryPrice = +store!.deliveryPrice!
    ? +totAmountStore >= +store.freeDeliveryAmount!
      ? 0
      : +store!.deliveryPrice!
    : 0;

  return {
    totAmountStore: formatFloat(totAmountStore),
    deliveryPrice,
  };
};
