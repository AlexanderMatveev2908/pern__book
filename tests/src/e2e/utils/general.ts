import { Page } from "@playwright/test";
import { account_0 } from "./data.js";
import { expect } from "@playwright/test";

export const handleLoginT = async ({ page }: { page: Page }) => {
  await nav(page, "auth/login");

  await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  await page.getByLabel("password").fill(account_0.pwd);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("login successful".toUpperCase())).toBeVisible();
};

const B_URL = "https://localhost";

export const nav = async (page: Page, p: string) => {
  await page.goto(`${B_URL}/${p}`);
};

export const makeNoticeTxt = (txt: string) =>
  `We've sent you an email ${txt}. If you don't see it, check your spam folder, it might be partying there 🎉`;

export const clickButton = async (page: Page, name: string) =>
  await page.getByRole("button", { name }).click();

export const clickLink = async (page: Page, name: string) =>
  await page.getByRole("link", { name }).click();

export const waitRedirect = async (page: Page, url: string) => {
  await page.waitForURL(url, { timeout: 10000 });
};

export const searchTxt = async ({ page, txt }: { page: Page; txt: string }) => {
  await page.waitForSelector(`text='${txt}'`, { state: "visible" });
  await expect(page.getByText(`${txt}`, { exact: true })).toBeVisible();
};

export const fillInput = async ({
  page,
  name,
  txt,
}: {
  page: Page;
  name: string;
  txt: string;
}) => {
  await page.waitForSelector(`input[name="${name}"]`, {
    state: "visible",
  });

  await page.locator(`input[name="${name}"]`).fill(txt);

  await expect(page.locator(`input[name="${name}"]`)).toHaveValue(txt);
};

export const clickBtn = async ({
  page,
  aria,
}: {
  page: Page;
  aria: string;
}) => {
  await page.waitForSelector(`button[aria-label='${aria}']`, {
    state: "visible",
  });

  await page.getByRole("button", { name: aria }).click();
};

export const listenErr = async ({
  page,
  testID,
}: {
  page: Page;
  testID: string;
}) => {
  const errOpacity_0 = await page.evaluate((testID) => {
    const el = document.querySelector(`[data-testid='err-msg-${testID}']`);
    if (!el) return false;

    let current = el as HTMLElement | null;
    while (current) {
      const style = getComputedStyle(current);
      if (style.opacity === "0") return true;
      current = current.parentElement;
    }

    return false;
  }, testID);

  expect(errOpacity_0).toBe(true);
};
