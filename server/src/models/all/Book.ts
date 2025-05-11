import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./helpers.js";

export class Book extends Model {
  declare id: string;
  declare bookStoreID: string;
  declare title: string;
  declare author: string;
  declare year: number;
  declare categories: string[];
  declare images: any;
  declare description: string | null;
  declare qty: number;
  declare price: number;
}

export type BookInstance = InstanceType<typeof Book>;

export const defineBook = (seq: Sequelize) =>
  Book.init(
    {
      ...schemaID(),
      bookStoreID: refSql("book_stores"),
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      modelName: "Book",
      tableName: "books",
    }
  );
