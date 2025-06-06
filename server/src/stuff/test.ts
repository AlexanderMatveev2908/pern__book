import { where } from "sequelize";
import { TestClass } from "../models/all/Test.js";

export const makeItem = async () => {
  await TestClass.create({
    num: 1,
    char: "abc",
  });
};

export const delItem = async () => {
  const res = await TestClass.destroy({
    where: {
      num: 1,
    },
  });
};
