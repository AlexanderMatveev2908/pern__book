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

export const bindModels = (seq: Sequelize) => {
  const User = defineUser(seq);
  const Token = defineToken(seq);
  const Thumb = defineThumb(seq);
  const BookStore = defineBookStore(seq);
  const ImgBooStore = defineImgBookStore(seq);
  const VideoBookStore = defineVideoBookStore(seq);
  const BookStoreUser = defineBookStoreUser(seq);

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
  });

  ImgBooStore.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
  });
  BookStore.hasMany(ImgBooStore, {
    foreignKey: "bookStoreID",
  });

  VideoBookStore.belongsTo(BookStore, {
    foreignKey: "bookStoreID",
  });
  BookStore.hasOne(VideoBookStore, {
    foreignKey: "bookStoreID",
  });

  BookStore.belongsTo(User, { foreignKey: "ownerID" });
  User.hasMany(BookStore, {
    foreignKey: "ownerID",
  });

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
