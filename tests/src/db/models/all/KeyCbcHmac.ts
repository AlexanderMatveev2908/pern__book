import { DataTypes, Model, Sequelize } from "sequelize";
import { KeyTypeCbcHmac } from "../../types/all/keys.js";
import { v4 } from "uuid";

export class KeyCbcHmac extends Model {}

export type KeyCbcHmacInstance = InstanceType<typeof KeyCbcHmac>;

export const defineKeyCbcHmac = (seq: Sequelize) =>
  KeyCbcHmac.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(KeyTypeCbcHmac)),
        allowNull: false,
      },
      key: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      tableName: "keys_cbc_hmac",
      modelName: "KeyCbcHmac",
    }
  );
