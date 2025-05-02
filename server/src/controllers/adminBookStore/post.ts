import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200, res201 } from "../../lib/responseClient/res.js";
import fs from "fs";
import { uploadVideoCloud } from "../../lib/cloud/video.js";
import { uploadImdDisk } from "../../lib/cloud/imagesDisk.js";
import { delCloud } from "../../lib/cloud/delete.js";
import { err422, err500 } from "../../lib/responseClient/err.js";
import { seq } from "../../config/db.js";
import {
  ImgBookStore,
  ImgBookStoreType,
} from "../../models/all/img&video/ImgBookStore.js";
import {
  VideoBookStore,
  VideoBookStoreType,
} from "../../models/all/img&video/VideoBookStore.js";
import { captAll } from "../../lib/utils/formatters.js";
import { BookStore, BookStoreInstance } from "../../models/all/BookStore.js";
import { User } from "../../models/models.js";

const clearUnnecessary = async (
  videoData: Partial<VideoBookStoreType> | null,
  imagesData: Partial<ImgBookStoreType>[]
) => {
  if (videoData) await delCloud(videoData.publicID!);
  if (imagesData.length)
    await Promise.all(
      imagesData.map(async (img) => await delCloud(img.publicID!))
    );

  return null;
};

const MANDATORY_KEYS = [
  "name",
  "categories",

  "email",
  "phone",

  "country",
  "state",
  "city",
  "street",
  "zipCode",

  "deliveryTime",
] as string[];

const OPT_KEYS = [
  { key: "description", fb: null },
  { key: "website", fb: null },
  { key: "deliveryPrice", fb: 0 },
  { key: "freeDeliveryAmount", fb: 0 },
];

const addMandatoryKeys = (body: Partial<BookStoreInstance>) =>
  MANDATORY_KEYS.reduce(
    (acc: BookStoreInstance, curr: string): BookStoreInstance => {
      const key = curr as keyof BookStoreInstance;
      const val = body[curr as keyof BookStoreInstance];

      (acc as any)[key] = Array.isArray(val)
        ? (val as string[])
        : typeof val === "string"
        ? key === "email"
          ? val
          : captAll(val)
        : typeof val === "number"
        ? val
        : null;

      return acc;
    },
    {} as BookStoreInstance
  );

const addOptKeys = (body: Partial<BookStoreInstance>) =>
  OPT_KEYS.reduce((acc, curr) => {
    const key = curr.key as keyof BookStoreInstance;
    const val = body[curr.key as keyof BookStoreInstance];

    (acc as any)[key] = val ? val : curr.fb;

    return acc;
  }, {} as BookStoreInstance);

const checkTeam = async (bodyData: Partial<BookStoreInstance>) => {
  const team = bodyData?.items;
  if (
    !Array.isArray(team) ||
    !team?.length ||
    !Object.values(team?.[0] ?? {}).every((val) => !!val) ||
    !Object.keys(team?.[0] ?? {}).length
  )
    return null;

  // let i = 0;
  // let nonExistentEmail: string | null = null;

  // do {
  //   const curr = team[i];

  //   const user = await User.findOne({
  //     where: { email: curr.email },
  //   });
  //   if (!user) {
  //     nonExistentEmail = curr.email;
  //     break;
  //   }

  //   i++;
  // } while (i < team.length);

  // return nonExistentEmail
  //   ? {
  //       nonExist: nonExistentEmail,
  //     }
  //   : true;

  const users = await User.findAll({
    where: { email: team.map((t) => t.email) },
  });

  const rightEmails = new Set(users.map((u) => u.email));
  if (users.length !== team.length) {
    const notFound = team.filter((member) => !rightEmails.has(member.email));

    return {
      NOT_FOUND: notFound.map((el) => el.email),
    };
  }

  const verified = new Set(
    users.filter((u) => u.isVerified).map((el) => el.email)
  );
  if (verified.size !== users.length) {
    const NOT_VERIFIED = team.filter((member) => !verified.has(member.email));

    return {
      NOT_VERIFIED: NOT_VERIFIED.map((el) => el.email),
    };
  }
};

export const createBookStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const bodyData: Partial<BookStoreInstance> = req.body;
  const images = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.images;
  const video = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.video;

  let videoData: Partial<VideoBookStoreType> | null = null;

  if (video?.[0]) {
    if (video?.[0]) videoData = await uploadVideoCloud(video?.[0]);

    try {
      await fs.promises.unlink(video[0].path);
    } catch (err) {
      console.log("fail delete video file", err);
    }
  }

  const imagesData: Partial<ImgBookStoreType>[] = [];

  if (images?.length) {
    try {
      let i = 0;
      do {
        const curr = images[i];
        const dataImg = await uploadImdDisk(curr, "pern__book_stores");
        imagesData.push(dataImg);

        i++;
      } while (i < images.length);
    } catch (err) {
      console.log("fail upload all images", err);
      await clearUnnecessary(videoData, imagesData);

      return err500(res);
    } finally {
      try {
        await Promise.all(
          images.map(async (img) => await fs.promises.unlink(img.path))
        );
      } catch (err) {
        console.log("err delete images locally", err);
      }
    }
  }

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
    if (imagesData.length)
      await ImgBookStore.bulkCreate(
        imagesData.map((img) => ({
          ...img,
          bookStoreID: newBookStore.id,
        })),
        { transaction: t }
      );

    const team = await checkTeam(bodyData);
    if (team?.NOT_FOUND && Array.isArray(team?.NOT_FOUND))
      return err422(res, {
        msg: `${team.NOT_FOUND[0]} ${
          team.NOT_FOUND.length > 1
            ? `and others ${team.NOT_FOUND.length - 1} members do not`
            : "does not"
        } exists`,
      });
    if (team?.NOT_VERIFIED && Array.isArray(team?.NOT_VERIFIED))
      return err422(res, {
        msg: `${team.NOT_VERIFIED[0]} ${
          team.NOT_VERIFIED.length > 1
            ? `and others ${
                team.NOT_VERIFIED.length - 1
              } members are not verified`
            : "is not verified"
        }`,
      });

    await t.commit();

    return res201(res, { msg: "BookStore created" });
  } catch (err) {
    console.log(err);
    await t.rollback();

    try {
      await clearUnnecessary(videoData, imagesData);
    } catch (err) {
      console.log("err delete cloud", err);
    }
    return err500(res);
  }
};
