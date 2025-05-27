import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { CloudClass, makeSchemaCloud } from "./cloud.js";

export class VideoBookStore extends CloudClass {}

export type VideoBookStoreType = InstanceType<typeof VideoBookStore>;

export const defineVideoBookStore = (seq: Sequelize) =>
  VideoBookStore.init(
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
      tableName: "videos_book_stores",
      modelName: "VideoBookStore",
      timestamps: true,
    }
  );
