import { formatD, priceFormatter } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import { FaBook, FaDatabase } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { v4 } from "uuid";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { CiTextAlignJustify } from "react-icons/ci";
import { genValsRating } from "@/features/OwnerLayout/shared/fields/general";

export const labelBookCard = (title: string) => ({
  label: title,
  icon: FaBook,
});

export const labelBookInfo = {
  label: "Book",
  icon: FaBook,
};

export const statsBookInfo = (book: BookType) =>
  [
    {
      label: "Author",
      val: book.author,
    },
    {
      label: "Year",
      val: book.year,
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));

export const labelBookRating = {
  label: "Rating",
  icon: MdReviews,
};

export const fieldsStatsRatingBook = (book: BookType) =>
  [...genValsRating(book)].map((el) => ({
    ...el,
    id: v4(),
  }));

export const labelDataBook = {
  label: "Data",
  icon: FaDatabase,
};

export const showGeneralStatsBook = (book: BookType) => [
  {
    label: "Price",
    val: priceFormatter(book.price + ""),
  },
  {
    label: "Quantity",
    val: book.qty,
  },
];

export const labelStoreBook = (name: string) => ({
  label: name,
  icon: HiMiniBuildingLibrary,
});

export const infoStoreFromBook = (book: BookType) =>
  [
    {
      label: "Store ID",
      icon: FaDatabase,
      val: book.bookStoreID,
    },
  ].map((el) => ({ ...el, id: v4() }));

export const labelDescriptionBook = {
  label: "About Book",
  icon: CiTextAlignJustify,
};

export const fieldsWorkFlowBook = (book?: BookType) =>
  [
    {
      label: "Created at",
      val: formatD(book?.createdAt ?? new Date()),
    },
    {
      label: "Updated at",
      val: formatD(book?.updatedAt ?? new Date()),
    },
    {
      label: "Created by",
      val: book?.createdBy || "N/A",
    },
    {
      label: "Updated by",
      val: book?.lastUpdatedBy || "N/A",
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
