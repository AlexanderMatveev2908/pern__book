import express from "express";
import { handleStripeWebHook } from "./webHooks/stripeWebHook.js";
import { wrapApp } from "../middleware/general/wrapApp.js";

const routerWebhook = express.Router();

routerWebhook.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  wrapApp(handleStripeWebHook)
);

export default routerWebhook;
