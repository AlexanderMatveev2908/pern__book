import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { BookStore, BookStoreInstance } from "../../../models/all/BookStore.js";
import { clearUnnecessary, handleAssetsCloud } from "./helpers/cloudUpload.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";
import { Book } from "../../../models/all/Book.js";
import { err404, err409, err500 } from "../../../lib/responseClient/err.js";
import { BookStoreUser } from "../../../models/all/BookStoreUser.js";
import { seq } from "../../../config/db.js";
import { User } from "../../../models/all/User.js";
import { subcategories } from "../../../types/all/books.js";
import { addMandatoryKeys, addOptKeys, makeTeam } from "./helpers/storeData.js";
import { Op } from "sequelize";
import {
  deleteOldAssetsStore,
  handleGetDeletedAssetsStore,
  handleStoreAssetsPut,
} from "../../../lib/sharedHandlers/assetsHandlers/store.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import {
  allowedDeletePatchStore,
  StoreOrderStage,
} from "../../../types/all/orders.js";

const choseRandom = () => Math.floor(Math.random() * 3);

export const updateBookStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;
  const bodyData: Partial<BookStoreInstance> = req.body;

  const { videoData, imagesData } = (await handleAssetsCloud(req)) ?? {};

  const bookStore = await BookStore.findOne({
    where: { ownerID: userID, id: bookStoreID },
    include: [
      { model: ImgBookStore, as: "images" },
      { model: VideoBookStore, as: "video" },
      { model: Book, as: "books" },
      { model: OrderStore, as: "orders" },
    ],
    nest: true,
  });

  if (!bookStore) {
    await clearUnnecessary(videoData!, imagesData!);
    return err404(res, { msg: "Bookstore not found" });
  }

  if (bookStore?.orders?.length) {
    if (
      bookStore.orders.some(
        (os) => !allowedDeletePatchStore.includes(os.stage as StoreOrderStage)
      )
    ) {
      await clearUnnecessary(videoData!, imagesData!);
      return err409(res, {
        msg: "You can not update delivery time with orders in progress",
      });
    }
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

    const user = await User.findByPk(userID, {
      attributes: ["id", "email"],
    });

    await BookStore.update(
      {
        ...mandatoryObj,
        ...optObj,
        lastUpdatedBy: user!.email,
      },
      {
        where: {
          id: bookStoreID,
        },
        transaction: t,
      }
    );

    if (bookStore.books?.length) {
      const newMainCategories = mandatoryObj.categories;

      for (const b of bookStore.books) {
        const newSubCategoriesChildren: string[] = [];

        for (const cat of newMainCategories as string[]) {
          newSubCategoriesChildren.push(
            subcategories[cat as keyof typeof subcategories][choseRandom()]
          );
        }

        await Book.update(
          {
            categories: newSubCategoriesChildren,
          },
          {
            where: {
              id: b.id,
            },
            transaction: t,
          }
        );
      }
    }

    const newTeam = await makeTeam(bodyData);
    const oldEmails = new Set(oldTeam.map((member) => member.userEmail));

    await BookStoreUser.destroy({
      where: {
        bookStoreID,
        userEmail: {
          [Op.notIn]: (newTeam ?? []).map((member) => member?.userEmail),
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

    await handleStoreAssetsPut({
      t,
      req,
      bookStore,
      imagesData,
      videoData,
    });

    const { deleteIds } = await handleGetDeletedAssetsStore({
      bookStore,
      bodyData,
      t,
    });

    await t.commit();

    await deleteOldAssetsStore({
      bookStore,
      bodyData,
      videoData,
      imagesData,
      deleteIds,
    });

    return res200(res, { msg: "BookStore updated" });
  } catch (err: any) {
    await t.rollback();

    await clearUnnecessary(videoData!, imagesData!);

    return err500(res);
  }
};
