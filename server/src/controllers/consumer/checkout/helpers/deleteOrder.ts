import { delArrCloud } from "../../../../lib/cloud/delete.js";
import { OrderInstance } from "../../../../models/all/Order.js";

export const deleteOrder = async (order: OrderInstance) => {
  const cloudIDs = order.orderStores!.flatMap((os) =>
    os.orderItemStores!.flatMap((ois) => ois.images!.map((img) => img.publicID))
  );

  await delArrCloud(cloudIDs);

  for (const os of order.orderStores!) {
    await os.destroy();

    for (const ois of os.orderItemStores!) {
      await ois.destroy();
    }
  }
  await order.destroy();
};
