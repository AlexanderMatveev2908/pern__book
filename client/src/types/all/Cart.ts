import { BookType } from "./books";

export type CartItemType = {
  id: string;
  bookID: string;
  cartID: string;
  qty: number;
  book?: BookType;
  cart?: CartType;
};

export type CartType = {
  id: string;
  userID: string;
  items: CartItemType[];

  totPrice?: number;
};
