import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { UserRole } from "../../types/types.js";

export class BookStoreUser extends Model {}

export const defineBookStoreUser = (seq: Sequelize) =>
  BookStoreUser.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        allowNull: false,
        primaryKey: true,
      },
      userID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      bookStoreID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "bookStores",
          key: "id",
        },
      },
      role: {
        type: DataTypes.ENUM(
          ...Object.values(UserRole).filter(
            (val) => ![UserRole.CUSTOMER, UserRole.OWNER].includes(val)
          )
        ),
        allowNull: false,
      },
    },
    {
      sequelize: seq,
      tableName: "bookStoreUsers",
      modelName: "BookStoreUser",
      timestamps: true,
    }
  );
