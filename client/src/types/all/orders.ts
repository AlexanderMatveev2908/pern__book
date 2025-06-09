import { BookType } from "./books";
import { BookStoreType } from "./bookStore";
import { AssetCloudType } from "./images";

export enum StoreOrderStage {
  PENDING = "pending",
  PAID = "paid",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

export enum DeliveryType {
  FREE = "free_delivery",
  PAY = "delivery_charged",
}

export enum OrderState {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
  COMPLETED = "completed",
}

export type OrderItemStoreType = {
  id: string;
  orderStoreID: string;
  bookID: string;
  title: string;
  qty: number;
  price: number;
  images: AssetCloudType[] | null;

  book?: BookType;
};

export type OrderStoreType = {
  id: string;
  orderID: string;
  bookStoreID: string;
  amount: number;
  delivery: number;
  expectedArrival: number;
  stage: string;

  orderItemStores: OrderItemStoreType[];
  store: BookStoreType;
};

export type OrderType = {
  id: string;
  paymentID: string;
  discount: number;
  totAmount: number;
  stage: OrderState;
  userID?: string;

  county: string;
  state: string;
  city: string;
  street: string;
  zipCod: string;
  phone: string;

  orderStores?: OrderStoreType[];
};
