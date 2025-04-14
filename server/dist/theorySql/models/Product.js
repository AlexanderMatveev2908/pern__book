import { DataTypes } from "sequelize";
import User from "./User.js";
import seq from "../../config/db.js";
const Product = seq.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "products",
    timestamps: true,
});
export default Product;
