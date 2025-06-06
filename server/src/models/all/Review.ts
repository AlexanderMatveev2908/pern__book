import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";

export class Review extends Model {
  id!: string;
  userID!: string;
  bookStoreID!: string;
  title!: string;
  rating!: string;
  description!: string;
  images!: any;
}

export type ReviewInstance = InstanceType<typeof Review>;

export const defineReview = (seq: Sequelize) =>
  Review.init(
    {
      ...schemaID(),
      userID: refSql("users", { allowNull: true }),
      bookID: refSql("books", { allowNull: true }),
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
      paranoid: true,
    }
  );
