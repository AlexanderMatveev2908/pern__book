import { capt, formatValDel } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import { BookStoreType } from "@/types/all/bookStore";
import { FaLink } from "react-icons/fa";
import { v4 } from "uuid";

export const showStoreAddressFromBook = (book: BookType) =>
  ["country", "state", "city", "street", "zipCode"].map((el) => ({
    label: capt(el),
    val: book?.store?.[el as keyof BookStoreType],
    id: v4(),
  }));

export const statsDeliveryStoreFromBook = (book?: BookType) =>
  [
    { key: "deliveryTime", label: "Delivery Time" },
    { key: "deliveryPrice", label: "Delivery price" },
    { key: "freeDeliveryAmount", label: "Free delivery amount" },
  ].map((el) => {
    const val = book?.store?.[el.key as keyof BookStoreType];

    return {
      id: v4(),
      label: el.label,
      val: formatValDel(el.key, val),
    };
  });

export const linksBookConsumer = (id: string) =>
  [
    {
      icon: FaLink,
      label: "View more",
      path: `/consumer/books/${id}`,
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
