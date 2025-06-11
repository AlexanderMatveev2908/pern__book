import { NextFunction, Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { err422, err500 } from "../../../lib/responseClient/err.js";
import fs from "fs";
import { __cg } from "../../../lib/utils/log.js";
import { User } from "../../../models/all/User.js";

export const clearMemoryDisk = async (req: ReqApp) => {
  const images = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.images;
  const video = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.video;

  if (video?.[0]) {
    try {
      await fs.promises.unlink(video[0].path);
    } catch (err) {
      console.log("fail delete video file", err);
    }
  }

  if (images?.length) {
    try {
      await Promise.all(
        images.map(async (img) => await fs.promises.unlink(img.path))
      );
    } catch (err) {
      __cg("err delete images locally", err);
    }
  }
};

export const checkTeam = async (
  req: ReqApp,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const bodyData = req.body;

  const team = bodyData?.items;

  if (
    !Array.isArray(team) ||
    !team?.length ||
    !Object.values(team?.[0] ?? {}).every((val) => !!val) ||
    !Object.keys(team?.[0] ?? {}).length
  )
    return next();

  try {
    const users = await User.findAll({
      where: { email: team.map((t) => t.email) },
    });

    const rightEmails = new Set(users.map((u) => u.email));
    if (users.length !== team.length) {
      const notFound = team.filter((member) => !rightEmails.has(member.email));

      await clearMemoryDisk(req);

      return err422(res, {
        msg: `${notFound[0].email} ${
          notFound.length > 1
            ? `and others ${notFound.length - 1} members do not`
            : "does not"
        } exists`,
      });
    }

    const verified = new Set(
      users.filter((u) => u.isVerified).map((el) => el.email)
    );
    if (verified.size !== users.length) {
      const notVerified = team.filter((member) => !verified.has(member.email));

      await clearMemoryDisk(req);

      return err422(res, {
        msg: `${notVerified[0].email} ${
          notVerified.length > 1
            ? `and others ${notVerified.length - 1} members are not verified`
            : "is not verified"
        }`,
      });
    }

    return next();
  } catch (err: any) {
    return err500(res);
  }
};
