import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";

export class VideoBookStore extends Model {}

export const defineVideoBookStore = (seq: Sequelize) =>
  VideoBookStore.init(
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
      tableName: "videoBookStores",
      modelName: "VideoBookStore",
      timestamps: true,
    }
  );
