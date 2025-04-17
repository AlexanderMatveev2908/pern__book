import { DataTypes, Model } from "sequelize";
import { v4 } from "uuid";
import { KeyType } from "../../types/all/keys.js";
export class Key extends Model {}
export const definePairRSA = (seq) =>
  Key.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
      alg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(KeyType)),
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      tableName: "keys",
      modelName: "Key",
    }
  );
