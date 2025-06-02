import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { CloudClass, makeSchemaCloud } from "./cloud.js";

export class ImgBookStore extends CloudClass {}

export type ImgBookStoreType = InstanceType<typeof ImgBookStore>;

export const defineImgBookStore = (seq: Sequelize) =>
  ImgBookStore.init(
    {
      ...makeSchemaCloud(),
      bookStoreID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "book_stores",
          key: "id",
        },
      },
    },
    {
      sequelize: seq,
      tableName: "images_book_stores",
      modelName: "ImgBookStore",
      timestamps: true,
    }
  );
