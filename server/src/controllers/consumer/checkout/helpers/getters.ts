import { literal } from "sequelize";
import { BookStore } from "../../../../models/all/BookStore.js";
import { Book } from "../../../../models/all/Book.js";
import { CartItem } from "../../../../models/all/CartItem.js";
import { Cart } from "../../../../models/all/Cart.js";
import { Order } from "../../../../models/all/Order.js";
import { OrderStore } from "../../../../models/all/OrderStore.js";
import { OrderItemStore } from "../../../../models/all/OrderItemStore.js";

export const getCartWithTotPrice = async (userID: string) => {
  const cart = await Cart.findOne({
    where: {
      userID,
    },

    include: [
      {
        model: CartItem,
        as: "items",
        required: true,
        separate: true,
        include: [
          {
            model: Book,
            as: "book",
            required: true,
            include: [
              {
                model: BookStore,
                as: "store",
                required: true,
              },
            ],
          },
        ],
      },
    ],

    attributes: {
      include: [
        [
          literal(`(
            SELECT COALESCE(SUM(
              sub.total + sub.delivery
            ), 0)::FLOAT
            FROM (
              SELECT
                SUM(b.price * ci.qty) AS total,
                CASE 
                  WHEN SUM(b.price * ci.qty) < bs."freeDeliveryAmount"
                  THEN bs."deliveryPrice"
                  ELSE 0
                END AS delivery
            FROM "cart_items" AS ci
            INNER JOIN "books" AS b ON ci."bookID" = b.id
            INNER JOIN "book_stores" AS bs ON b."bookStoreID" = bs.id
            WHERE ci."cartID" = "Cart".id
              AND bs."deletedAt" IS NULL
              AND b."deletedAt" IS NULL
            GROUP BY bs.id
            ) AS sub
          )`),
          "totPrice",
        ],
      ],
    },
  });

  return { cart: cart ? cart.toJSON() : null };
};

export const getPopulatedOrder = async ({
  orderID,
  userID,
}: {
  orderID: string;
  userID: string;
}) => {
  const order = await Order.findOne({
    where: {
      userID,
      id: orderID,
    },

    include: [
      {
        model: OrderStore,
        as: "orderStores",
        required: true,
        separate: true,
        paranoid: false,
        include: [
          {
            model: BookStore,
            as: "store",
            required: true,
            paranoid: false,
          },
          {
            model: OrderItemStore,
            as: "orderItemStores",
            required: true,
            paranoid: false,
            include: [
              {
                model: Book,
                as: "book",
                required: true,
                paranoid: false,
              },
            ],
          },
        ],
      },
    ],
  });

  return { order };
};
