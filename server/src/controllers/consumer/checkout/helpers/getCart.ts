import { literal } from "sequelize";
import { BookStore } from "../../../../models/all/BookStore.js";
import { Book } from "../../../../models/all/Book.js";
import { CartItem } from "../../../../models/all/CartItem.js";
import { Cart } from "../../../../models/all/Cart.js";

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
            SELECT
              COALESCE(SUM(
              b.price * ci.qty +
              CASE
                WHEN (b.price * ci.qty) < bs."freeDeliveryAmount"
                THEN bs."deliveryPrice"
                ELSE 0
              END
              ), 0)::FLOAT
            FROM "cart_items" AS ci
            INNER JOIN "books" AS b ON ci."bookID" = b.id
            INNER JOIN "book_stores" AS bs ON b."bookStoreID" = bs.id
            WHERE ci."cartID" = "Cart"."id"
            AND bs."deletedAt" IS NULL
            AND b."deletedAt" IS NULL
            )`),
          "totPrice",
        ],
      ],
    },
  });

  return { cart: cart ? cart.toJSON() : null };
};
