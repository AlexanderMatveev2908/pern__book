import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import { UserRole } from "../../types/types.js";
import { UserInstance } from "./User.js";
import { BookStoreInstance } from "./BookStore.js";
import { refSql, schemaID } from "./utils/helpers.js";

export class BookStoreUser extends Model {
  id!: string;
  userID!: string | UserInstance;
  userEmail!: string;
  role!: UserRole;
  bookStoreID!: string | BookStoreInstance;
}

export type BookStoreUserInstance = InstanceType<typeof BookStoreUser>;

export const defineBookStoreUser = (seq: Sequelize) =>
  BookStoreUser.init(
    {
      ...schemaID(),
      userID: refSql("users"),
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookStoreID: refSql("book_stores"),
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
      tableName: "book_stores_users",
      modelName: "BookStoreUser",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          fields: ["userEmail"],
        },
      ],
    }
  );
