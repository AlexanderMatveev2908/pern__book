import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { v4 } from "uuid";
import { KeyTypeRSA } from "../../types/all/keys.js";

export class KeyRSA extends Model<
  InferAttributes<KeyRSA>,
  InferCreationAttributes<KeyRSA>
> {
  declare id: CreationOptional<string>;
  declare key: string;
  declare type: KeyTypeRSA;
}

export type KeyRSAInstance = InstanceType<typeof KeyRSA>;

export const definePairRSA = (seq: Sequelize) =>
  KeyRSA.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(KeyTypeRSA)),
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
      tableName: "keysRSA",
      modelName: "KeyRSA",
    }
  );
