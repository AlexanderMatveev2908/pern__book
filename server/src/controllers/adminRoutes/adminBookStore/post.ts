import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { BookStore, BookStoreInstance } from "../../../models/all/BookStore.js";
import { clearUnnecessary, handleAssetsCloud } from "./helpers/cloudUpload.js";
import { seq } from "../../../config/db.js";
import { User } from "../../../models/all/User.js";
import { addMandatoryKeys, addOptKeys, makeTeam } from "./helpers/storeData.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { BookStoreUser } from "../../../models/all/BookStoreUser.js";
import { res201 } from "../../../lib/responseClient/res.js";
import { err500 } from "../../../lib/responseClient/err.js";

export const createBookStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const bodyData: Partial<BookStoreInstance> = req.body;

  const { videoData, imagesData } = (await handleAssetsCloud(req)) ?? {};

  const t = await seq.transaction();

  try {
    const mandatoryObj: Partial<BookStoreInstance> = addMandatoryKeys(bodyData);
    const optObj: Partial<BookStoreInstance> = addOptKeys(bodyData);

    const user = await User.findByPk(userID, {
      attributes: ["id", "email"],
    });

    const newBookStore: BookStoreInstance = await BookStore.create(
      {
        ...mandatoryObj,
        ...optObj,
        ownerID: userID,
        lastUpdatedBy: user!.email,
      },
      { transaction: t }
    );

    if (videoData)
      await VideoBookStore.create(
        {
          ...videoData,
          bookStoreID: newBookStore.id,
        },
        { transaction: t }
      );
    if (imagesData!.length)
      await ImgBookStore.bulkCreate(
        imagesData!.map((img) => ({
          ...img,
          bookStoreID: newBookStore.id,
        })),
        { transaction: t }
      );

    const team = await makeTeam(bodyData);
    if (Array.isArray(team))
      await BookStoreUser.bulkCreate(
        team.map((member) => ({
          bookStoreID: newBookStore.id,
          userID: member.id,
          userEmail: member.userEmail,
          role: member.role,
        })),
        { transaction: t }
      );

    await t.commit();

    return res201(res, {
      msg: "BookStore created",
      bookStoreID: newBookStore.id,
    });
  } catch (err) {
    await t.rollback();

    await clearUnnecessary(videoData!, imagesData!);

    return err500(res);
  }
};
