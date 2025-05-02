import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { CloudAsset } from "../../../types/all/cloud.js";

export class ImgBookStore extends Model {
  declare publicID: string;
  declare url: string;
  declare bookStoreID: string;
}

export type ImgBookStoreType = InstanceType<typeof ImgBookStore>;

export const defineImgBookStore = (seq: Sequelize) =>
  ImgBookStore.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
      publicID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      bookStoreID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "bookStores",
          key: "id",
        },
      },
    },
    {
      sequelize: seq,
      tableName: "imagesBookStore",
      modelName: "ImgBookStore",
      timestamps: true,
    }
  );
