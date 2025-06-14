import { Sequelize } from "sequelize";
import { defineToken } from "../Token.js";
import { defineUser } from "../User.js";
import { definePairRSA } from "../KeyRSA.js";
import { defineKeyCbcHmac } from "../KeyCbcHmac.js";
import { defineThumb } from "../img&video/Thumb.js";
import { defineBookStore } from "../BookStore.js";
import { defineImgBookStore } from "../img&video/ImgBookStore.js";
import { defineBookStoreUser } from "../BookStoreUser.js";
import { defineVideoBookStore } from "../img&video/VideoBookStore.js";
import { defineOrder } from "../Order.js";
import { defineReview } from "../Review.js";
import { defineBook } from "../Book.js";
import { defineTestClass } from "../Test.js";
import { defineCart } from "../Cart.js";
import { defineCartItem } from "../CartItem.js";
import { defineOrderStore } from "../OrderStore.js";
import { defineOrderItemStore } from "../OrderItemStore.js";

export const bindModels = (seq: Sequelize) => {
  const User = defineUser(seq);
  const Token = defineToken(seq);
  const Thumb = defineThumb(seq);
  const BookStore = defineBookStore(seq);
  const ImgBookStore = defineImgBookStore(seq);
  const VideoBookStore = defineVideoBookStore(seq);
  const BookStoreUser = defineBookStoreUser(seq);
  const Order = defineOrder(seq);
  const Review = defineReview(seq);
  const Book = defineBook(seq);
  const Cart = defineCart(seq);
  const CartItem = defineCartItem(seq);
  const OrderStore = defineOrderStore(seq);
  const OrderItemStore = defineOrderItemStore(seq);

  definePairRSA(seq);
  defineKeyCbcHmac(seq);
  defineTestClass(seq);

  Token.belongsTo(User, { foreignKey: "userID", onDelete: "CASCADE" });
  User.hasMany(Token, {
    foreignKey: "userID",
  });

  Thumb.belongsTo(User, {
    foreignKey: "userID",
  });
  User.hasOne(Thumb, {
    foreignKey: "userID",
    as: "thumb",
  });

  ImgBookStore.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
  });
  BookStore.hasMany(ImgBookStore, {
    foreignKey: "bookStoreID",
    as: "images",
  });

  VideoBookStore.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
  });
  BookStore.hasOne(VideoBookStore, {
    foreignKey: "bookStoreID",
    as: "video",
  });

  BookStore.belongsTo(User, { foreignKey: "ownerID" });
  User.hasMany(BookStore, {
    foreignKey: "ownerID",
    as: "bookStores",
  });

  User.belongsToMany(BookStore, {
    through: BookStoreUser,
    foreignKey: "userID",
    otherKey: "bookStoreID",
    as: "stores",
  });
  BookStore.belongsToMany(User, {
    through: BookStoreUser,
    foreignKey: "bookStoreID",
    otherKey: "userID",
    as: "team",
  });
  BookStoreUser.belongsTo(User, {
    foreignKey: "userID",
    as: "member",
  });
  BookStoreUser.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
    as: "store",
  });

  Order.belongsTo(User, {
    foreignKey: "userID",
  });
  User.hasMany(Order, {
    foreignKey: "userID",
    as: "orders",
  });

  Order.hasMany(OrderStore, {
    foreignKey: "orderID",
    as: "orderStores",
  });
  OrderStore.belongsTo(Order, {
    foreignKey: "orderID",
    as: "order",
  });

  OrderStore.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
    as: "store",
  });
  BookStore.hasMany(OrderStore, {
    foreignKey: "bookStoreID",
    as: "orders",
  });

  OrderItemStore.belongsTo(OrderStore, {
    foreignKey: "orderStoreID",
    as: "orderStore",
  });
  OrderStore.hasMany(OrderItemStore, {
    foreignKey: "orderStoreID",
    as: "orderItemStores",
  });

  OrderItemStore.belongsTo(Book, {
    foreignKey: "bookID",
    as: "book",
  });
  Book.hasMany(OrderItemStore, {
    foreignKey: "bookID",
    as: "orderItemStores",
  });

  Review.belongsTo(User, {
    foreignKey: "userID",
  });
  User.hasMany(Review, {
    foreignKey: "userID",
    as: "reviews",
  });

  Review.belongsTo(Book, {
    foreignKey: "bookID",
    as: "book",
  });
  Book.hasMany(Review, {
    foreignKey: "bookID",
    as: "reviews",
  });

  Book.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
    as: "store",
  });
  BookStore.hasMany(Book, {
    foreignKey: "bookStoreID",
    as: "books",
  });

  User.hasOne(Cart, {
    foreignKey: "userID",
    as: "cart",
  });
  Cart.belongsTo(User, {
    foreignKey: "userID",
    as: "user",
  });

  Cart.hasMany(CartItem, {
    foreignKey: "cartID",
    as: "items",
  });
  CartItem.belongsTo(Cart, {
    foreignKey: "cartID",
    as: "cart",
  });

  CartItem.belongsTo(Book, {
    foreignKey: "bookID",
    as: "book",
  });
  Book.hasMany(CartItem, {
    foreignKey: "bookID",
    as: "bookItems",
  });
};
