import { Sequelize } from "sequelize";
import { defineToken } from "../Token.js";
import { defineUser } from "../User.js";
import { definePairRSA } from "../KeyRSA.js";
import { defineKeyCbcHmac } from "../KeyCbcHmac.js";
import { defineThumb } from "../Thumb.js";
import { defineBookStore } from "../BookStore.js";
import { defineImgBookStore } from "../ImgBookStore.js";
import { defineBookStoreUser } from "../BookStoreUser.js";

export const bindModels = (seq: Sequelize) => {
  const User = defineUser(seq);
  const Token = defineToken(seq);
  const Thumb = defineThumb(seq);
  const BookStore = defineBookStore(seq);
  const ImgBooStore = defineImgBookStore(seq);
  const BookStoreUser = defineBookStoreUser(seq);

  definePairRSA(seq);
  defineKeyCbcHmac(seq);

  Token.belongsTo(User, { foreignKey: "userID", onDelete: "CASCADE" });
  User.hasMany(Token);

  Thumb.belongsTo(User, {
    foreignKey: "userID",
    onDelete: "CASCADE",
  });
  User.hasOne(Thumb);

  ImgBooStore.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
    onDelete: "CASCADE",
  });
  BookStore.hasMany(ImgBooStore);

  BookStore.belongsTo(User, { foreignKey: "ownerID" });
  User.hasMany(BookStore);

  User.belongsToMany(BookStore, {
    through: BookStoreUser,
    foreignKey: "userID",
    otherKey: "bookStoreID",
  });
  BookStore.belongsToMany(User, {
    through: BookStoreUser,
    foreignKey: "bookStoreID",
    otherKey: "userID",
  });
};
