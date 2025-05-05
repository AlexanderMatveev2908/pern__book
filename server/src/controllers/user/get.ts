import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { User } from "../../models/models.js";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { Thumb } from "../../models/all/img&video/Thumb.js";
import { BookStore } from "../../models/all/BookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { Op } from "sequelize";

export const getUserProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  if (!userID) return res204(res);

  const user = await User.findByPk(userID, {
    // attributes is like select in mongoose where u specify what u want or what to exclude with - like (-password, ...ecc)
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "tempEmail"],
    },
    // include is like populate in mongoose ODM( object data modelling instead of object relational mapping) that allow u to get the data referenced by id after `populate` that field with real data and not just leaving the id as string
    include: [
      {
        model: Thumb,
        attributes: { exclude: [] },
        as: "thumb",
      },
    ],
    // raw is like lean or toObject in mongoose and it allow u to to get data as js obj and not as document mongoDB, in this case postGres model, it also make operation faster
    raw: true,
    // nest exist just in sql, in mongoDB objects are naturally nested by default and u do not need to specify it as characteristic
    nest: true,
  });

  const bookStores = await BookStore.findAll({
    where: {
      ownerID: userID,
    },
  });
  const isOwner = !!bookStores.length;
  const isWorker = !!(await BookStoreUser.count({
    where: {
      userID,
    },
  }));
  const teams = await BookStoreUser.findAll({
    where: {
      bookStoreID: {
        [Op.in]: bookStores.map((bookStore) => bookStore.id),
      },
    },
  });
  const hasWorkers = !!teams.length;

  // const user = userInstance?.get({ plain: true });
  // return err401(res, { msg: MsgErrSession.ACCESS_INVALID });

  return res200(res, {
    user: {
      ...user,
      isOwner,
      isWorker,
      hasWorkers,
    },
  });
};
