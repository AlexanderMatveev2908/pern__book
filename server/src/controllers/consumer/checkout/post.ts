import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { getCartWithTotPrice } from "./helpers/getCart.js";
import { seq } from "../../../config/db.js";
import { __cg } from "../../../lib/utils/log.js";
import { stripe } from "../../../config/stripe.js";
import { err404, err422, err500 } from "../../../lib/responseClient/err.js";
import { Order } from "../../../models/all/Order.js";
import { calcAmountStore, groupOrdersByStore } from "./helpers/groupOrders.js";
import { CloudImg } from "../../../types/all/cloud.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { formatFloat } from "../../../lib/utils/formatters.js";
import { reUploadImg } from "../../../lib/cloud/reUploadExisting.js";
import { OrderItemStore } from "../../../models/all/OrderItem.js";
import { delArrCloud } from "../../../lib/cloud/delete.js";
import { Cart } from "../../../models/all/Cart.js";

export const createOrder = async (req: ReqApp, res: Response) => {
  const {
    userID,
    body: { totPrice: amountSeenBuUser, code },
  } = req;

  const { cart } = await getCartWithTotPrice(userID!);

  if (!cart) return err404(res, { msg: "Cart not found" });

  if (!cart.totPrice)
    return err422(res, {
      msg: "Items not present in cart or removed from stock",
    });

  const totAmountFormatted = formatFloat(amountSeenBuUser);

  if (cart.totPrice !== totAmountFormatted)
    return err422(res, {
      msg: "amount not match, some items may have become unavailable",
    });

  const t = await seq.transaction();
  const imagesUploaded: CloudImg[] = [];

  const { groupedOrders } = groupOrdersByStore(cart);

  try {
    const order = await Order.create(
      {
        userID,
        amount: totAmountFormatted,
      },
      {
        transaction: t,
      }
    );

    for (const group of Object.values(groupedOrders)) {
      const store = group.store;
      const items = group.items;

      const { totAmountStore, deliveryPrice } = calcAmountStore({
        store,
        items,
      });

      const storeOrder = await OrderStore.create(
        {
          orderID: order.id,
          bookStoreID: store.id,
          delivery: deliveryPrice,
          amount: formatFloat(totAmountStore),
        },
        {
          transaction: t,
        }
      );

      for (const item of items) {
        const imagesItem: CloudImg[] = [];
        if (item.book?.images?.length) {
          for (const img of item.book.images) {
            const uploaded = await reUploadImg({
              url: img.url,
              folder: "order_items",
            });
            imagesItem.push(uploaded);
            imagesUploaded.push(uploaded);
          }
        }

        await OrderItemStore.create(
          {
            orderStoreID: storeOrder.id,
            bookID: item!.book!.id,
            qty: item.qty,
            title: item!.book!.title,
            price: item!.book!.price,
            images: imagesItem?.length ? imagesItem : null,
          },
          { transaction: t }
        );
      }
    }

    await Cart.destroy({
      where: {
        userID,
      },
      transaction: t,
    });

    await t.commit();

    return res200(res, { orderID: order.id });
  } catch (err) {
    await t.rollback();

    if (imagesUploaded.length)
      await delArrCloud(imagesUploaded.map((img) => img.url));

    __cg("fail pre checkout", err);

    return err500(res);
  }
};

export const getAddressCheckout = async (req: ReqApp, res: Response) => {
  const { userID, body } = req;

  const { cart } = await getCartWithTotPrice(userID!);

  if (!cart) return err404(res, { msg: "Cart not found" });

  if (!cart.totPrice)
    return err422(res, {
      msg: "Items not present in cart or removed from stock",
    });

  const t = await seq.transaction();
  const imagesUploaded: CloudImg[] = [];

  const { groupedOrders } = groupOrdersByStore(cart);

  try {
    const order = await Order.create(
      {
        ...body,
        userID,
        totAmount: formatFloat(cart.totPrice),
      },
      {
        transaction: t,
      }
    );

    for (const group of Object.values(groupedOrders)) {
      const store = group.store;
      const items = group.items;

      const { totAmountStore, deliveryPrice } = calcAmountStore({
        store,
        items,
      });

      const storeOrder = await OrderStore.create(
        {
          orderID: order.id,
          bookStoreID: store.id,
          delivery: deliveryPrice,
          amount: formatFloat(totAmountStore),
        },
        {
          transaction: t,
        }
      );

      for (const item of items) {
        const imagesItem: CloudImg[] = [];
        if (item.book?.images?.length) {
          for (const img of item.book.images) {
            const uploaded = await reUploadImg({
              url: img.url,
              folder: "order_items",
            });
            imagesItem.push(uploaded);
            imagesUploaded.push(uploaded);
          }
        }

        await OrderItemStore.create(
          {
            orderStoreID: storeOrder.id,
            bookID: item!.book!.id,
            qty: item.qty,
            title: item!.book!.title,
            price: item!.book!.price,
            images: imagesItem?.length ? imagesItem : null,
          },
          { transaction: t }
        );
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatFloat(cart.totPrice * 100),
      currency: "usd",
      metadata: {
        userID: userID!,
        orderID: order.id,
      },
    });

    await Order.update(
      {
        paymentID: paymentIntent.id,
      },
      {
        where: {
          id: order.id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return res200(res, { clientSecret: paymentIntent.client_secret });
  } catch (err) {
    await t.rollback();

    if (imagesUploaded.length)
      await delArrCloud(imagesUploaded.map((img) => img.url));

    __cg("fail pre checkout", err);

    return err500(res);
  }
};
