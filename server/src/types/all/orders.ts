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

export const allowedDeletePatchStore = [
  StoreOrderStage.PENDING,
  StoreOrderStage.CANCELLED,
  StoreOrderStage.REFUNDED,
  StoreOrderStage.COMPLETED,
];

export enum OrderStage {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
  COMPLETED = "completed",
}

export enum DeliveryType {
  FREE = "free_delivery",
  PAY = "delivery_charged",
}
