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
