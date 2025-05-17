import { BookType } from "@/types/all/books";
import { FaBook } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";
import { v4 } from "uuid";

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
