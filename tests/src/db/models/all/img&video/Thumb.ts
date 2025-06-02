import { DataTypes, Model, Sequelize } from "sequelize";
import { CloudClass, makeSchemaCloud } from "./cloud.js";

export class Thumb extends CloudClass {}

export type ThumbInstance = InstanceType<typeof Thumb>;

export const defineThumb = (seq: Sequelize) =>
  Thumb.init(
    {
      ...makeSchemaCloud(),
      userID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      tableName: "thumbs",
      modelName: "Thumb",
    }
  );
