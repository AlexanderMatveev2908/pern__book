import { nav } from "../../utils/general.js";
import { expect, Page, test } from "@playwright/test";
import { account_0 } from "./data.js";

export const handleBeforeEach = async ({ page }: { page: Page }) => {
  await nav(page, "auth/login");

  await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  await page.getByLabel("password").fill(account_0.pwd);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("login successful".toUpperCase())).toBeVisible();
};

export const handleGoPrivateAccountArea = async ({ page }: { page: Page }) => {
  await page.getByRole("button", { name: "dropdown header" }).hover();

  await expect(
    page.getByRole("link", { name: "Manage Account dropdown" })
  ).toBeVisible();

  await page.getByRole("link", { name: "Manage Account dropdown" }).click();
  await expect(page.getByText("CONFIRM YOUR PASSWORD")).toBeVisible();

  await page.getByRole("textbox", { name: "password" }).fill(account_0.pwd);
  await page.getByRole("button", { name: "Confirm password" }).click();

  await expect(page.getByText("CHANGE EMAIL")).toBeVisible();
};
