import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { CloudClass, makeSchemaCloud } from "./cloud.js";

export class Thumb extends CloudClass {
  userID!: string;
}

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
