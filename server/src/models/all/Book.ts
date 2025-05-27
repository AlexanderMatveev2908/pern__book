import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";
import { CloudImg } from "../../types/all/cloud.js";
import { BookStoreInstance } from "./BookStore.js";

export class Book extends Model {
  id!: string;
  bookStoreID!: string;
  title!: string;
  author!: string;
  year!: number;
  categories!: string[];
  images!: CloudImg[] | null;
  description!: string | null;
  qty!: number;
  price!: number;

  store?: BookStoreInstance;
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

      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastUpdatedBy: {
        type: DataTypes.STRING,
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
