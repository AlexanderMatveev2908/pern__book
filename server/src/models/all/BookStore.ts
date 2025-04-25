import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { CatBookStore } from "../../types/all/bookStore.js";

export class BookStore extends Model {}

export const defineBookStore = (seq: Sequelize) =>
  BookStore.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      categories: {
        type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(CatBookStore))),
        allowNull: false,
        validate: {
          maxCatLen(val: CatBookStore[]) {
            if (val.length > 3) throw new Error("Max qty allowed is 3");
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
      timeDelivery: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      ownerID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
    },
    {
      sequelize: seq,
      tableName: "bookStores",
      modelName: "BookStore",
      timestamps: true,
    }
  );
