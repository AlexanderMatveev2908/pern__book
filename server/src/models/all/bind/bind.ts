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

  definePairRSA(seq);
  defineKeyCbcHmac(seq);

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
    as: "user",
  });
  BookStoreUser.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
    as: "bookStore",
  });

  Order.belongsTo(User, {
    foreignKey: "userID",
  });
  User.hasMany(Order, {
    foreignKey: "userID",
    as: "orders",
  });

  Order.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
  });
  BookStore.hasMany(Order, {
    foreignKey: "bookStoreID",
    as: "orders",
  });

  Review.belongsTo(User, {
    foreignKey: "userID",
  });
  User.hasMany(Review, {
    foreignKey: "userID",
    as: "reviews",
  });

  Review.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
  });
  BookStore.hasMany(Review, {
    foreignKey: "bookStoreID",
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
};
