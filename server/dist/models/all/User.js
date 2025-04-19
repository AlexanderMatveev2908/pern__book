var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DataTypes, Model, Op, } from "sequelize";
import { TokenEventType, UserRole } from "../../types/types.js";
import pkg from "bson-objectid";
import { v4 } from "uuid";
import { calcTimeRun, capChar, hashPwd } from "../../lib/lib.js";
import { Token } from "./Token.js";
const ObjectID = pkg.default;
export class User extends Model {
    existUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findOne({
                where: { email: this.email },
            });
        });
    }
    capitalize() {
        this.firstName = capChar(this.firstName);
        this.lastName = capChar(this.lastName);
    }
    makePayload() {
        return {
            id: this.id,
        };
    }
    hashPwdUser() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield calcTimeRun(() => hashPwd(this.password));
        });
    }
    verify() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isVerified = true;
            yield this.save();
        });
    }
    delOldJWE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Token.destroy({
                where: {
                    [Op.and]: [{ userID: this.id }, { event: TokenEventType.REFRESH }],
                },
            });
        });
    }
}
const defineUser = (seq) => User.init({
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
}, {
    sequelize: seq,
    tableName: "users",
    timestamps: true,
    modelName: "User",
});
export { defineUser };
