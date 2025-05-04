import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import { BookStore, BookStoreInstance } from "../../models/all/BookStore.js";
import { clearUnnecessary, handleAssetsCloud } from "./helpers/cloudUpload.js";
import { seq } from "../../config/db.js";
import { err404, err422, err500 } from "../../lib/responseClient/err.js";
import {
  addMandatoryKeys,
  addOptKeys,
  checkTeam,
} from "./helpers/storeData.js";

export const updateBookStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;
  const bodyData: Partial<BookStoreInstance> = req.body;

  // const { videoData, imagesData } = (await handleAssetsCloud(req)) ?? {};

  // const bookStore: BookStoreInstance | null = await BookStore.findOne({
  //   where: {
  //     ownerID: userID,
  //     id: bookStoreID,
  //   },
  // });
  // if (!bookStore) {
  //   await clearUnnecessary(videoData!, imagesData!);
  //   return err404(res, { msg: "Bookstore not found" });
  // }

  // const t = await seq.transaction();

  // try {
  //   const mandatoryObj: Partial<BookStoreInstance> = addMandatoryKeys(bodyData);
  //   const optObj: Partial<BookStoreInstance> = addOptKeys(bodyData);
  // } catch (err: any) {
  //   console.log(err);
  //   await t.rollback();

  //   try {
  //     await clearUnnecessary(videoData!, imagesData!);
  //   } catch (err) {
  //     console.log("err delete cloud", err);
  //   }

  //   return err500(res);
  // }
  return res200(res);
};
