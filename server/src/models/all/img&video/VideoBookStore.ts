import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { CloudClass, makeSchemaCloud } from "./cloud.js";
import { refSql } from "../utils/helpers.js";

export class VideoBookStore extends CloudClass {
  bookStoreID!: string;
}

export type VideoBookStoreType = InstanceType<typeof VideoBookStore>;

export const defineVideoBookStore = (seq: Sequelize) =>
  VideoBookStore.init(
    {
      ...makeSchemaCloud(),
      bookStoreID: refSql("book_stores"),
    },
    {
      sequelize: seq,
      tableName: "videos_book_stores",
      modelName: "VideoBookStore",
      timestamps: true,
    }
  );
