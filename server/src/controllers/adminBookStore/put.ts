import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import { BookStore, BookStoreInstance } from "../../models/all/BookStore.js";
import { clearUnnecessary, handleAssetsCloud } from "./helpers/cloudUpload.js";
import { seq } from "../../config/db.js";
import { err404, err422, err500 } from "../../lib/responseClient/err.js";
import { addMandatoryKeys, addOptKeys, makeTeam } from "./helpers/storeData.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { Op } from "sequelize";
import { delCloud, ResourceType } from "../../lib/cloud/delete.js";

export const updateBookStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;
  const bodyData: Partial<BookStoreInstance> = req.body;

  const { videoData, imagesData } = (await handleAssetsCloud(req)) ?? {};

  const bookStore: BookStoreInstance | null = await BookStore.findOne({
    where: {
      ownerID: userID,
      id: bookStoreID,
    },
    include: [
      {
        model: ImgBookStore,
        as: "images",
      },
      {
        model: VideoBookStore,
        as: "video",
      },
    ],
    nest: true,
  });

  if (!bookStore) {
    await clearUnnecessary(videoData!, imagesData!);
    return err404(res, { msg: "Bookstore not found" });
  }

  const oldTeam = await BookStoreUser.findAll({
    where: {
      bookStoreID,
    },
  });

  const t = await seq.transaction();

  try {
    const mandatoryObj: Partial<BookStoreInstance> = addMandatoryKeys(bodyData);
    const optObj: Partial<BookStoreInstance> = addOptKeys(bodyData);

    await BookStore.update(
      {
        ...mandatoryObj,
        ...optObj,
      },
      {
        where: {
          id: bookStoreID,
        },
        transaction: t,
      }
    );

    const newTeam = await makeTeam(bodyData);
    const oldEmails = new Set(oldTeam.map((member) => member.userEmail));

    await BookStoreUser.destroy({
      where: {
        bookStoreID,
        userEmail: {
          [Op.notIn]: (newTeam ?? [])?.map((member) => member.userEmail),
        },
      },
      transaction: t,
    });
    if (newTeam?.length) {
      let i = 0;

      while (i < newTeam.length) {
        const newCurr = newTeam[i];

        if (oldEmails.has(newCurr.userEmail))
          await BookStoreUser.update(
            {
              role: newCurr.role,
            },
            {
              where: {
                bookStoreID,
                userEmail: newCurr.userEmail,
              },
              transaction: t,
            }
          );
        else
          await BookStoreUser.create(
            {
              bookStoreID,
              userID: newCurr.id,
              userEmail: newCurr.userEmail,
              role: newCurr.role,
            },
            { transaction: t }
          );

        i++;
      }
    }

    if (bookStore.video && (videoData || !bodyData?.video)) {
      await VideoBookStore.destroy({
        where: {
          bookStoreID,
        },
        transaction: t,
      });
    }

    if (videoData)
      await VideoBookStore.create(
        {
          ...videoData,
          bookStoreID,
        },
        { transaction: t }
      );

    if (imagesData?.length) {
      if (bookStore?.images?.length)
        await ImgBookStore.destroy({
          where: {
            bookStoreID,
          },
          transaction: t,
        });

      await ImgBookStore.bulkCreate(
        imagesData.map((img) => ({
          ...img,
          bookStoreID,
        })),
        { transaction: t }
      );
    }

    const newIds = new Set(
      bodyData.images?.length
        ? bodyData.images.map(
            (el: any) =>
              el.split("/").at(-2) + "/" + el.split("/").pop().split(".")[0]
          )
        : []
    ) as unknown as Set<string>;
    const deleteIds = bookStore.images?.length
      ? bookStore.images
          .filter((img) => !newIds.has(img.publicID))
          .map((el) => el.publicID)
      : [];

    await ImgBookStore.destroy({
      where: {
        publicID: {
          [Op.in]: deleteIds,
        },
      },
      transaction: t,
    });

    await t.commit();

    try {
      if (bookStore.video && (videoData || !bodyData?.video))
        await delCloud(bookStore.video.publicID, ResourceType?.VID);

      if (imagesData?.length && bookStore?.images?.length)
        await Promise.all(
          bookStore.images.map((img) => delCloud(img.publicID))
        );
      if (deleteIds) await Promise.all(deleteIds.map((id) => delCloud(id)));
    } catch (err) {
      console.log(err);
    }

    return res200(res, { msg: "BookStore updated" });
  } catch (err: any) {
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
