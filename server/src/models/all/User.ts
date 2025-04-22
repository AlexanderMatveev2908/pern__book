import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { UserRole } from "../../types/types.js";
import pkg from "bson-objectid";
import { v4 } from "uuid";
import { Token } from "./Token.js";
import { calcTimeRun } from "../../lib/utils/utils.js";
import { hashPwd } from "../../lib/hashEncryptSign/argon.js";
import { ThumbInstance } from "./Thumb.js";
import { captAll } from "../../lib/utils/formatters.js";

const ObjectID = pkg.default;

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;

  declare firstName: string;
  declare lastName: string;

  declare email: string;
  declare tempEmail: CreationOptional<string | null>;
  declare password: string;

  declare role: CreationOptional<UserRole>;
  declare isVerified: CreationOptional<boolean>;
  declare isNewsletter: CreationOptional<boolean>;

  declare country: CreationOptional<string>;
  declare state: CreationOptional<string>;
  declare city: CreationOptional<string>;
  declare street: CreationOptional<string>;
  declare zipCode: CreationOptional<string>;
  declare phone: CreationOptional<string>;

  declare Thumb?: ThumbInstance;

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

  async hashPwdUser(this: User) {
    this.password = await calcTimeRun(() => hashPwd(this.password));
    await this.save();
  }

  async verify(this: User) {
    this.isVerified = true;
    await this.save();
  }

  async clearTokens(this: User) {
    await Token.destroy({
      where: {
        userID: this.id,
      },
    });
  }
}

export type UserInstance = InstanceType<typeof User>;

const defineUser = (seq: Sequelize) =>
  User.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
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
      role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.CUSTOMER,
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
