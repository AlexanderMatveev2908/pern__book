import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./helpers.js";
import { CloudImg } from "../../types/all/cloud.js";
import { BookStoreInstance } from "./BookStore.js";

export class Book extends Model {
  declare id: string;
  declare bookStoreID: string;
  declare title: string;
  declare author: string;
  declare year: number;
  declare categories: string[];
  declare images: CloudImg[] | null;
  declare description: string | null;
  declare qty: number;
  declare price: number;

  declare store?: BookStoreInstance;
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
