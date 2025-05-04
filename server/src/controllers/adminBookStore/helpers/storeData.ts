import { Op } from "sequelize";
import { captAll } from "../../../lib/utils/formatters.js";
import { BookStore, BookStoreInstance } from "../../../models/all/BookStore.js";
import { User } from "../../../models/models.js";
import { ReqApp } from "../../../types/types.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";

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

export const addMandatoryKeys = (body: Partial<BookStoreInstance>) =>
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

export const addOptKeys = (body: Partial<BookStoreInstance>) =>
  OPT_KEYS.reduce((acc, curr) => {
    const key = curr.key as keyof BookStoreInstance;
    const val = body[curr.key as keyof BookStoreInstance];

    (acc as any)[key] = val ? val : curr.fb;

    return acc;
  }, {} as BookStoreInstance);

export const makeTeam = async (bodyData: Partial<BookStoreInstance>) => {
  const team = bodyData?.items;
  if (
    !Array.isArray(team) ||
    !team?.length ||
    !Object.values(team?.[0] ?? {}).every((val) => !!val) ||
    !Object.keys(team?.[0] ?? {}).length
  )
    return null;

  const users = await User.findAll({
    where: {
      email: {
        [Op.in]: team.map((member) => member.email),
      },
    },
  });

  const emailUser = new Map(users.map((u) => [u.email, u]));

  return team.map((member) => {
    const user = emailUser.get(member.email)!;

    return {
      id: user.id,
      role: member.role,
      userEmail: member.email,
    };
  });
};

export const getStoreByID = async (req: ReqApp) => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  return await BookStore.findOne({
    where: { ownerID: userID, id: bookStoreID },
    include: [
      { model: ImgBookStore, as: "images" },
      { model: VideoBookStore, as: "video" },
    ],
    nest: true,
  });
};

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
