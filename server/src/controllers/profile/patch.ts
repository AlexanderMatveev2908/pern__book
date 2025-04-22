import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import { Thumb, ThumbInstance } from "../../models/all/Thumb.js";
import { uploadThumb } from "../../lib/cloud/uploadSingle.js";
import { User, UserInstance } from "../../models/models.js";
import { delCloud } from "../../lib/cloud/delete.js";
import { err500 } from "../../lib/responseClient/err.js";
import { isObjOk, parseNull } from "../../lib/validateDataStructure.js";

const clearThumb = async (user: UserInstance) => {
  await delCloud(user!.Thumb!.publicID);
  await user.Thumb!.destroy();
};

export const updateProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { firstName, lastName, Thumb: thumbURL, ...address } = req.body;

  const user = (await User.findByPk(userID, {
    include: [
      {
        model: Thumb,
      },
    ],
    nest: true,
  })) as UserInstance;

  let thumbUploadNow: Partial<ThumbInstance> | null = null;
  if (req.file) thumbUploadNow = await uploadThumb(req.file);

  try {
    for (const keyAd in address) {
      (user as any)[keyAd as keyof UserInstance] = parseNull(address[keyAd]);
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    const isCloudUpload = isObjOk(thumbUploadNow);
    const isURL = parseNull(thumbURL);

    if (!isCloudUpload) {
      if (!isURL && user.Thumb?.publicID) await clearThumb(user);
    } else {
      if (user.Thumb?.publicID) await clearThumb(user);
      await Thumb.create({ ...thumbUploadNow, userID });
    }
  } catch (err) {
    console.log(err);

    if (thumbUploadNow?.publicID) await delCloud(thumbUploadNow.publicID);
    return err500(res, { msg: "error during update profile" });
  }

  return res200(res, { msg: "user profile updated" });
};
