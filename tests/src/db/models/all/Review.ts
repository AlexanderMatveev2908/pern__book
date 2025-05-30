import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./helpers.js";

export class Review extends Model {}

export type ReviewInstance = InstanceType<typeof Review>;

export const defineReview = (seq: Sequelize) =>
  Review.init(
    {
      ...schemaID(),
      userID: refSql("users"),
      bookID: refSql("books"),
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
