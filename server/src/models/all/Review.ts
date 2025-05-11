import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./helpers.js";

export class Review extends Model {
  declare id: string;
  declare userID: string;
  declare bookStoreID: string;
  declare title: string;
  declare rating: string;
  declare description: string;
  declare images: any;
}

export type ReviewInstance = InstanceType<typeof Review>;

export const defineReview = (seq: Sequelize) =>
  Review.init(
    {
      ...schemaID(),
      userID: refSql("users"),
      bookStoreID: refSql("book_stores"),
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isValidRating(value: number) {
            if (value < 1 || value > 5) {
              throw new Error("Rating must be between 1 and 5");
            }
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      modelName: "Review",
      tableName: "reviews",
    }
  );
