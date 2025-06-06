import { DataTypes, Model, Sequelize } from "sequelize";
import { schemaID } from "./utils/helpers.js";

export class TestClass extends Model {
  id!: string;
  num!: number;
  char!: string;
}

export const defineTestClass = (seq: Sequelize) =>
  TestClass.init(
    {
      ...schemaID(),
      num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      char: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: seq,
      modelName: "Test",
      tableName: "tests",
      timestamps: true,
      paranoid: true,
    }
  );
