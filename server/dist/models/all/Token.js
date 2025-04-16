import { DataTypes } from "sequelize";
import { TokenEventType } from "../../types/types.js";
import { v4 } from "uuid";
const defineToken = (seq) => seq.define("Token", {
    id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(...Object.values(TokenEventType)),
        allowNull: false,
    },
    hashed: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    expiry: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null,
    },
    userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
}, { timestamps: true, tableName: "tokens" });
export { defineToken };
