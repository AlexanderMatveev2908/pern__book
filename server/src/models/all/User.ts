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
import { calcTimeRun, capChar, hashPwd } from "../../lib/lib.js";

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

  async existUser(this: User) {
    return await User.findOne({
      where: { email: this.email },
    });
  }

  capitalize(this: User) {
    this.firstName = capChar(this.firstName);
    this.lastName = capChar(this.lastName);
  }

  makePayload(this: User) {
    return {
      id: this.id,
      isVerified: this.isVerified,
      role: this.role,
    };
  }

  async hashPwdUser(this: User) {
    this.password = await calcTimeRun(() => hashPwd(this.password));
  }

  async verify(this: User) {
    this.isVerified = true;
    await this.save();
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
    },
    {
      sequelize: seq,
      tableName: "users",
      timestamps: true,
      modelName: "User",
    }
  );

export { defineUser };
