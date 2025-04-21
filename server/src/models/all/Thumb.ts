import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";

export class Thumb extends Model {}

export const defineThumb = (seq: Sequelize) =>
  Thumb.init(
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
