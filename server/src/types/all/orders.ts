export enum StoreOrderStage {
  PENDING = "pending",
  PAID = "paid",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  COMPLETED = "completed",
  REFUNDED = "refunded",
}

export const stagesOrderFlowFinished = [
  StoreOrderStage.REFUNDED,
  StoreOrderStage.COMPLETED,
];

export const stagesArgCalcPatch = [
  StoreOrderStage.PAID,
  StoreOrderStage.PROCESSING,
  StoreOrderStage.SHIPPED,
  StoreOrderStage.DELIVERED,
  StoreOrderStage.COMPLETED,
];

export const allowedPatchOrderStages = stagesArgCalcPatch.filter(
  (st) => st !== StoreOrderStage.PAID
);

export const allowedDeletePatchStore = [
  StoreOrderStage.PENDING,
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
