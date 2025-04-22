import { delCloud } from "../lib/cloud/delete.js";
import { calcTimeRun } from "../lib/utils/utils.js";
import { KeyCbcHmac } from "../models/all/KeyCbcHmac.js";
import { Thumb } from "../models/all/Thumb.js";
import { KeyRSA, Token, User } from "../models/models.js";

export const clearDB = async () => {
  calcTimeRun(async () => {
    await KeyRSA.destroy({ where: {} });
    await KeyCbcHmac.destroy({ where: {} });

    const thumbs = await Thumb.findAll({
      where: {},
    });
    await Promise.all(thumbs.map(async (t) => await delCloud(t.publicID)));
    await Thumb.destroy({ where: {} });

    await Token.destroy({ where: {} });
    await User.destroy({ where: {} });
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
