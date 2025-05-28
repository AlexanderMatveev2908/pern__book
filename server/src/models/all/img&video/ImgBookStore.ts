import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { CloudClass, makeSchemaCloud } from "./cloud.js";
import { refSql } from "../utils/helpers.js";

export class ImgBookStore extends CloudClass {
  bookStoreID!: string;
}

export type ImgBookStoreType = InstanceType<typeof ImgBookStore>;

export const defineImgBookStore = (seq: Sequelize) =>
  ImgBookStore.init(
    {
      ...makeSchemaCloud(),
      bookStoreID: refSql("book_stores"),
    },
    {
      sequelize: seq,
      tableName: "images_book_stores",
      modelName: "ImgBookStore",
      timestamps: true,
    }
  );
