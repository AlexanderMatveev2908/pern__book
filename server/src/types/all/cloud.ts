import { Model } from "sequelize";

export class CloudAsset extends Model {
  declare id: string;
  declare publicID: string;
  declare url: string;
}
