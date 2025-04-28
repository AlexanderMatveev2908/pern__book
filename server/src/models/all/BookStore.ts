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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          maxLen(val: string[]) {
            if (val.length > 3) throw new Error("Too many cat");
          },
          enumVals(val: string[]) {
            let i = 0;
            while (i < val.length) {
              const curr = val[i];
              if (!Object.values(CatBookStore).includes(curr as CatBookStore))
                throw new Error("Invalid cat");
            }
          },
        },
      },

      deliveryPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: true,
      },
      freeDeliveryAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: true,
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
    },
    {
      sequelize: seq,
      tableName: "bookStores",
      modelName: "BookStore",
      timestamps: true,
    }
  );
