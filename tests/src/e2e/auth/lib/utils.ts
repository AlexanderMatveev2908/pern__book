import { expect, Page } from "@playwright/test";
import { tailwindBreak } from "../../../config/breakpoints.js";
import { account_0 } from "../../utils/data.js";
import { handlePwdSwing } from "../../utils/login.js";

export const handleGoPrivateAccountArea = async ({ page }: { page: Page }) => {
  await expect(
    page.getByText(
      "Launch your store online with a few simple, seamless steps and start managing your business effortlessly"
    )
  ).toBeVisible();
  const dropdownBtn = page.getByRole("button", { name: "dropdown header" });
  await expect(dropdownBtn).toBeVisible();

  if ((page.viewportSize()?.width ?? 0) > tailwindBreak.md)
    await page.getByRole("button", { name: "dropdown header" }).hover();
  else await page.getByRole("button", { name: "dropdown header" }).click();

  await expect(
    page.getByRole("link", { name: "Manage Account dropdown" })
  ).toBeVisible();

  await page.getByRole("link", { name: "Manage Account dropdown" }).click();
  await expect(page.getByText("CONFIRM YOUR PASSWORD")).toBeVisible();

  const success = await handlePwdSwing({
    page,
    aria: "confirm password",
    txt: "CHANGE EMAIL",
  });

  await expect(success).toBe(true);
};
