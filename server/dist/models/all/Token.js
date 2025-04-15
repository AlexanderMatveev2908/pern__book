import { DataTypes } from "sequelize";
import { TokenEventType } from "../../types/types.js";
const defineToken = (seq) => seq.define("Token", {
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
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
    },
}, { timestamps: true, tableName: "tokens" });
export { defineToken };
