import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { CatBookStore } from "../../types/all/bookStore.js";
import { UserRole } from "../../types/types.js";
import { ImgBookStoreType } from "./img&video/ImgBookStore.js";
import { VideoBookStoreType } from "./img&video/VideoBookStore.js";
import { BookStoreUserInstance } from "./BookStoreUser.js";
import { BookInstance } from "./Book.js";
import { refSql, schemaID } from "./utils/helpers.js";

export interface TeamType {
  email: string;
  role: UserRole;
}

export class BookStore extends Model {
  id!: string;
  ownerID!: string;

  name!: string;
  description?: string | null;

  categories!: CatBookStore[];

  email!: string;
  phone!: string;
  website?: string | null;

  country!: string;
  state!: string;
  city!: string;
  street!: string;
  zipCode!: string;

  deliveryPrice?: number;
  freeDeliveryAmount?: number;
  deliveryTime!: number;

  lastUpdatedBy!: string;

  team?: BookStoreUserInstance[];
  images?: ImgBookStoreType[];
  video?: VideoBookStoreType;

  books?: BookInstance[];
}

export type BookStoreInstance = InstanceType<typeof BookStore>;

export const defineBookStore = (seq: Sequelize) =>
  BookStore.init(
    {
      ...schemaID(),
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          maxLen(val: string[]) {
            if (val.length > 3) throw new Error("Too many cat");
            return true;
          },
          enumVals(val: string[]) {
            let i = 0;
            while (i < val.length) {
              const curr = val[i];
              if (!Object.values(CatBookStore).includes(curr as CatBookStore))
                throw new Error("Invalid cat");

              i++;
            }

            return true;
          },
        },
      },

      deliveryPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false,
      },
      freeDeliveryAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false,
      },
      deliveryTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      ownerID: refSql("users"),

      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      lastUpdatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: seq,
      tableName: "book_stores",
      modelName: "BookStore",
      timestamps: true,
    }
  );
