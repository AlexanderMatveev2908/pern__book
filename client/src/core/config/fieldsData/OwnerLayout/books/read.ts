import { priceFormatter } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import { FaBook, FaDatabase, FaLink } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { MdOutlineCategory, MdReviews } from "react-icons/md";
import { v4 } from "uuid";
import { genValsRating } from "../general";
import { GrUpdate } from "react-icons/gr";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { CiTextAlignJustify } from "react-icons/ci";

export const labelBookCard = (title: string) => ({
  label: title,
  icon: FaBook,
});

export const labelCategoriesBook = {
  label: "Categories",
  icon: MdOutlineCategory,
};

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

export const labelGeneralStatsBook = {
  label: "Info",
  icon: IoIosStats,
};

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

export const linksBookCard = [
  {
    icon: FaLink,
    label: "Book",
    path: "/owner/books/",
  },
  {
    icon: GrUpdate,
    label: "Update",
    path: "/owner/books/update/",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));

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
