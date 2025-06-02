import { Transaction } from "sequelize";
import { Book, BookInstance } from "../../../models/all/Book.js";
import { CloudAsset } from "../../../types/all/cloud.js";
import { ReqApp } from "../../../types/types.js";
import { uploadCloudMemory } from "../../cloud/imagesMemory.js";
import { captAll } from "../../utils/formatters.js";
import { User } from "../../../models/models.js";

export const handleAddBook = async ({
  images,
  req,
  t,
}: {
  req: ReqApp;
  images: Partial<CloudAsset>[];
  t: Transaction;
}) => {
  const files = req.files as Express.Multer.File[];
  const { body, userID } = req;

  const user = await User.findByPk(userID, {
    attributes: ["id", "email"],
  });

  if (files?.length) {
    for (const f of files) {
      const img: Partial<CloudAsset> = await uploadCloudMemory(f, "books");
      images.push(img);
    }
  }

  const newBook = {
    lastUpdatedBy: user!.email,
    createdBy: user!.email,
  } as Partial<BookInstance>;

  for (const key in body) {
    if (["title", "author"].includes(key)) {
      (newBook as any)[key] = captAll(body[key]);
    } else if (key === "description") {
      newBook[key] = body?.[key] || null;
    } else {
      newBook[key as keyof BookInstance] = body[key];
    }
  }

  if (images) newBook.images = images as CloudAsset[];

  const bookCreated = await Book.create(newBook, { transaction: t });

  return { bookCreated };
};
