import { Response } from "express";
import { MsgCheckToken, ReqApp, TokenEventType } from "../../types/types.js";
import { Op } from "sequelize";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { err401, err409, err500 } from "../../lib/responseClient/err.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { clearCookie } from "../../lib/hashEncryptSign/JWE.js";
import { seq } from "../../config/db.js";
import { BookStore } from "../../models/all/BookStore.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { Thumb } from "../../models/all/img&video/Thumb.js";
import { delArrCloud, ResourceType } from "../../lib/cloud/delete.js";
import { Book } from "../../models/all/Book.js";
import { Cart } from "../../models/all/Cart.js";
import { CartItem } from "../../models/all/CartItem.js";
import { User, UserInstance } from "../../models/all/User.js";
import { Token } from "../../models/all/Token.js";
import { Order } from "../../models/all/Order.js";
import { OrderStore } from "../../models/all/OrderStore.js";
import { OrderItemStore } from "../../models/all/OrderItemStore.js";
import { __cg } from "../../lib/utils/log.js";
import {
  allowedDeletePatchStore,
  StoreOrderStage,
} from "../../types/all/orders.js";
import { isArrOkSoft, isSoftObjOk } from "../../lib/dataStructures.js";

export const clearManageToken = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  await Token.destroy({
    where: {
      [Op.or]: [
        {
          userID,
          event: TokenEventType.SECURITY,
        },
        {
          userID,
          expiry: {
            [Op.lt]: Date.now(),
          },
        },
      ],
    },
  });

  return res204(res);
};

export const deleteAccount = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { token } = req.body;

  const user = (await User.findOne({
    where: {
      id: userID,
    },
    include: [
      {
        model: Thumb,
        as: "thumb",
      },
      {
        model: Order,
        as: "orders",
        include: [
          {
            model: OrderStore,
            as: "orderStores",
          },
        ],
      },
      {
        model: Cart,
        as: "cart",
        include: [
          {
            model: CartItem,
            as: "items",
          },
        ],
      },
      {
        model: BookStore,
        as: "bookStores",
        include: [
          {
            model: User,
            as: "team",
          },
          {
            model: Book,
            as: "books",
          },
          {
            model: ImgBookStore,
            as: "images",
          },
          {
            model: VideoBookStore,
            as: "video",
          },
          {
            model: OrderStore,
            as: "orders",
            include: [
              {
                model: OrderItemStore,
                as: "orderItemStores",
              },
            ],
          },
        ],
      },
    ],
  })) as UserInstance;

  const canProceed = await checkCbcHmac({
    user,
    event: TokenEventType.SECURITY,
    token,
    del: false,
  });

  if (canProceed !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(canProceed) });

  if (user.orders?.length) {
    for (const o of user.orders) {
      if (o.orderStores?.length) {
        for (const os of o.orderStores) {
          if (!allowedDeletePatchStore.includes(os.stage as StoreOrderStage))
            return err409(res, {
              msg: "you can't delete your account because you have pending orders to receive",
            });
        }
      }
    }
  }

  if (user.bookStores?.length) {
    for (const bs of user.bookStores) {
      if (bs.orders?.length) {
        for (const os of bs.orders) {
          if (!allowedDeletePatchStore.includes(os.stage as StoreOrderStage))
            return err409(res, {
              msg: "you can't delete your account because you have pending orders to deliver",
            });
        }
      }
    }
  }

  const idsCloudImg: string[] = [];
  const idsCloudVideo: string[] = [];

  const t = await seq.transaction();

  try {
    await Token.destroy({
      where: {
        userID: user.id,
      },
      transaction: t,
    });

    if (user.thumb) {
      idsCloudImg.push(user.thumb.publicID);
      await user.thumb.destroy({ transaction: t });
    }

    if (isArrOkSoft(user.cart?.items)) {
      await CartItem.destroy({
        where: {
          cartID: user.cart!.id!,
        },
        transaction: t,
      });

      await user.cart?.destroy({ transaction: t });
    }
    if (isArrOkSoft(user.bookStores)) {
      for (const s of user!.bookStores!) {
        if (isArrOkSoft(s.images)) {
          idsCloudImg.push(...s!.images!.flatMap((img) => img.publicID));
          await ImgBookStore.destroy({
            where: {
              bookStoreID: s.id,
            },
            transaction: t,
          });
        }

        if (isSoftObjOk(s.video)) {
          idsCloudVideo.push(s!.video!.publicID as string);
          await s!.video!.destroy({ transaction: t });
        }

        if (isArrOkSoft(s.books)) {
          for (const b of s.books!) {
            if (isArrOkSoft(b?.images)) {
              idsCloudImg.push(...b!.images!.flatMap((img) => img.publicID));
            }

            await b.destroy({ transaction: t });
          }
        }

        if (isArrOkSoft(s.team)) {
          await BookStoreUser.destroy({
            where: {
              bookStoreID: s.id,
            },
            transaction: t,
          });
        }

        // ? ORDER AS ORDER STORE(ONE OR MORE THAT CREATE THE BIGGER ONE) OF ORDER(THE BIG ONE OF USER)

        await s.destroy({ transaction: t });
      }
    }

    if (isArrOkSoft(user.stores)) {
      await BookStoreUser.destroy({
        where: {
          userID: user.id,
        },
        transaction: t,
      });
    }

    await user.destroy({ transaction: t });

    await t.commit();

    if (idsCloudImg.length) await delArrCloud(idsCloudImg);
    if (idsCloudVideo) await delArrCloud(idsCloudVideo, ResourceType.VID);

    clearCookie(res);

    return res200(res, { msg: "Account deleted" });
  } catch (err) {
    await t.rollback();

    __cg("err deletion account", err);

    return err500(res);
  }
};
