import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res201 } from "../../lib/responseClient/res.js";
import { err422, err500 } from "../../lib/responseClient/err.js";
import { seq } from "../../config/db.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";
import { BookStore, BookStoreInstance } from "../../models/all/BookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { clearUnnecessary, handleAssetsCloud } from "./helpers/cloudUpload.js";
import {
  addMandatoryKeys,
  addOptKeys,
  checkTeam,
} from "./helpers/storeData.js";

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

    const newBookStore: BookStoreInstance = await BookStore.create(
      {
        ...mandatoryObj,
        ...optObj,
        ownerID: userID,
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

    const team = await checkTeam(bodyData);
    if (team?.IDS && Array.isArray(team.IDS))
      await BookStoreUser.bulkCreate(
        team.IDS.map((member) => ({
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
    console.log(err);
    await t.rollback();

    try {
      await clearUnnecessary(videoData!, imagesData!);
    } catch (err) {
      console.log("err delete cloud", err);
    }
    return err500(res);
  }
};
