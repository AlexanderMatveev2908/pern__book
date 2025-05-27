import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./helpers.js";

export class Book extends Model {}

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
      categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
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
