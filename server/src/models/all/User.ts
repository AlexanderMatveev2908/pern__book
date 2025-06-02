import {
  CreationOptional,
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
import { schemaID } from "./utils/helpers.js";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  id!: CreationOptional<string>;

  firstName!: string;
  lastName!: string;

  email!: string;
  tempEmail!: CreationOptional<string | null>;
  password!: string;

  isVerified!: CreationOptional<boolean>;
  isNewsletter!: CreationOptional<boolean>;

  country!: CreationOptional<string>;
  state!: CreationOptional<string>;
  city!: CreationOptional<string>;
  street!: CreationOptional<string>;
  zipCode!: CreationOptional<string>;
  phone!: CreationOptional<string>;

  thumb?: ThumbInstance;

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
      tableName: "users",
      timestamps: true,
      modelName: "User",
    }
  );

export { defineUser };
