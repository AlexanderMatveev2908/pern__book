import { Model } from "sequelize";

export type CloudAsset = {
  id: string;
  publicID: string;
  url: string;
};

export type CloudImg = Omit<CloudAsset, "id">;
