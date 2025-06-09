import { OrderInstance } from "../../../../models/all/Order.js";
import { OrderItemStoreInstance } from "../../../../models/all/OrderItem.js";

export const checkAvailabilityStock = ({ order }: { order: OrderInstance }) => {
  let isValid = true;

  const { orderStores } = order;

  let i = orderStores!.length - 1;
  while (i >= 0) {
    const currOrderStore = orderStores![i];
    const { orderItemStores } = currOrderStore;

    if (
      currOrderStore.delivery &&
      currOrderStore.store!.deliveryPrice !== currOrderStore.delivery
    ) {
      isValid = false;
      break;
    }

    let j = orderItemStores!.length - 1;

    while (j >= 0) {
      const currStoreOrderItem: OrderItemStoreInstance = orderItemStores![j];

      if (currStoreOrderItem.qty > currStoreOrderItem.book!.qty) {
        isValid = false;
        break;
      }

      j--;
    }

    i--;
  }

  return { isValid };
};
