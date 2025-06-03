import { Response } from "express";
import { MsgCheckToken, ReqApp, TokenEventType } from "../../types/types.js";
import { Token, User, UserInstance } from "../../models/models.js";
import { Op } from "sequelize";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { err401, err500 } from "../../lib/responseClient/err.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { clearCookie } from "../../lib/hashEncryptSign/JWE.js";
import { clearThumb } from "../../lib/clearData/clearData.js";
import { seq } from "../../config/db.js";
import { BookStore } from "../../models/all/BookStore.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { Thumb } from "../../models/all/img&video/Thumb.js";
import { delArrCloud, ResourceType } from "../../lib/cloud/delete.js";
import { Book } from "../../models/all/Book.js";

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
    include: {
      model: Thumb,
      as: "thumb",
    },
  })) as UserInstance;

  const canProceed = await checkCbcHmac({
    user,
    event: TokenEventType.SECURITY,
    token,
    del: false,
  });
  if (canProceed !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(canProceed) });

  const stores = await BookStore.findAll({
    where: {
      ownerID: user.id,
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
      {
        model: User,
        as: "team",
      },
      {
        model: Book,
        as: "books",
      },
    ],
  });

  const junctions = await BookStoreUser.findAll({
    where: {
      userID: user.id,
    },
  });

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

    if (junctions.length)
      await BookStoreUser.destroy({
        where: {
          userID: user.id,
        },
        transaction: t,
      });

    if (stores.length) {
      for (const el of stores) {
        if (el.images?.length) {
          for (const img of el.images) {
            idsCloudImg.push(img.publicID);
            await img.destroy({ transaction: t });
          }
        }
        if (typeof el.video === "object" && el.video !== null) {
          idsCloudVideo.push(el.video.publicID);
          await el.video.destroy({ transaction: t });
        }
        if (el.books?.length) {
          for (const b of el.books) {
            if (b.images?.length)
              idsCloudImg.push(...b.images.map((img) => img.publicID));
            await b.destroy({ transaction: t });
          }
        }
        if (el.team?.length) {
          for (const jun of el.team) {
            await BookStoreUser.destroy({
              where: {
                userID: jun.id,
              },
              transaction: t,
            });
          }
        }

        await el.destroy({ transaction: t });
      }
    }

    await user.destroy({ transaction: t });

    await t.commit();

    if (idsCloudImg.length) await delArrCloud(idsCloudImg);
    if (idsCloudVideo) await delArrCloud(idsCloudVideo, ResourceType.VID);

    clearCookie(res);

    return res200(res, { msg: "account deleted" });
  } catch (err: any) {
    console.log(err);

    await t.rollback();

    return err500(res);
  }
};
