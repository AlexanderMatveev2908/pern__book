import { calcTimeRun } from "../lib/utils/utils.js";
import { KeyCbcHmac } from "../models/all/KeyCbcHmac.js";
import { KeyRSA, Token, User } from "../models/models.js";

export const clearDB = async () => {
  calcTimeRun(async () => {
    await Token.destroy({ where: {} });
    await User.destroy({ where: {} });
    await KeyRSA.destroy({ where: {} });
    await KeyCbcHmac.destroy({ where: {} });
  });
};

export const getDataDB = async () => {
  const users = await User.findAll();

  // await User.update(
  //   { firstName: "newName" },
  //   {
  //     where: {
  //       id: 1,
  //     },
  //   }
  // );
};
