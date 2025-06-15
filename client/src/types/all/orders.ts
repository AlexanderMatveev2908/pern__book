import { BookType } from "./books";
import { BookStoreType } from "./bookStore";
import { AssetCloudType } from "./images";

export enum StoreOrderStage {
  PAID = "paid",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  COMPLETED = "completed",
  REFUNDED = "refunded",
}

export type AllowedPatchOrderStages = Extract<
  StoreOrderStage,
  | StoreOrderStage.PROCESSING
  | StoreOrderStage.SHIPPED
  | StoreOrderStage.DELIVERED
  | StoreOrderStage.COMPLETED
>;

export enum DeliveryType {
  FREE = "free_delivery",
  PAY = "delivery_charged",
}

export enum OrderStage {
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
  author: string;
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

  bookStoreName: string;

  orderItemStores?: OrderItemStoreType[];
  store?: BookStoreType;
  totItems?: number;

  order?: OrderType;
};

export type OrderType = {
  id: string;
  paymentID: string;
  discount: number;
  amount: number;
  stage: OrderStage;
  userID?: string;

  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
  phone: string;

  totItems?: number;
  orderedAt?: string;

  orderStores?: OrderStoreType[];
};
