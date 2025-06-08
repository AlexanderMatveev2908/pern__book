import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  Transaction,
} from "sequelize";
import pkg from "bson-objectid";
import { calcTimeRun } from "../../lib/utils/utils.js";
import { hashPwd } from "../../lib/hashEncryptSign/argon.js";
import { ThumbInstance } from "./img&video/Thumb.js";
import { captAll } from "../../lib/utils/formatters.js";
import { schemaAddress, schemaID } from "./utils/helpers.js";
import { CartInstance } from "./Cart.js";
import { BookStoreInstance } from "./BookStore.js";

export class User extends Model {
  id!: string;

  firstName!: string;
  lastName!: string;

  email!: string;
  tempEmail!: string | null;
  password!: string;

  isVerified!: boolean;
  isNewsletter!: boolean;

  country?: string;
  state?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  phone?: string;

  thumb?: ThumbInstance;

  stores?: BookStoreInstance[];
  cart?: CartInstance;

  async existUser(this: User) {
    return await User.findOne({
      where: { email: this.email },
    });
  }

  capitalize(this: User) {
    this.firstName = captAll(this.firstName);
    this.lastName = captAll(this.lastName);
  }

  makePayload(this: User) {
    return {
      id: this.id,
    };
  }

  async hashPwdUser(this: User, t: Transaction) {
    this.password = await calcTimeRun(() => hashPwd(this.password));
    await this.save({ transaction: t });
  }

  async verify(this: User, t: Transaction) {
    this.isVerified = true;
    await this.save({ transaction: t });
  }

  async verifyNewEmail(this: User, t: Transaction) {
    this.email = this.tempEmail as string;
    this.tempEmail = null;
    this.isVerified = true;
    await this.save({ transaction: t });
  }
}

export type UserInstance = InstanceType<typeof User>;

const defineUser = (seq: Sequelize) =>
  User.init(
    {
      ...schemaID(),

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tempEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isNewsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ...schemaAddress({ allowNull: true }),
    },
    {
      sequelize: seq,
      tableName: "users",
      timestamps: true,
      modelName: "User",
    }
  );

export { defineUser };
