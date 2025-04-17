import { DataTypes, Model, } from "sequelize";
import { v4 } from "uuid";
import { KeyTypeRSA } from "../../types/all/keys.js";
export class KeyRSA extends Model {
}
export const definePairRSA = (seq) => KeyRSA.init({
    id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(...Object.values(KeyTypeRSA)),
        allowNull: false,
    },
    key: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: seq,
    timestamps: true,
    tableName: "keysRSA",
    modelName: "KeyRSA",
});
