import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export const B_URL = "https://localhost";

export const nav = async (page: Page, p: string) => {
  await page.goto(`${B_URL}/${p}`);
};

export const clickLink = async ({
  page,
  aria,
  testID,
  timeout,
}: {
  page: Page;
  aria?: string;
  testID?: string;
  timeout?: number;
}) => {
  let query = `a`;
  const arg: string[] = [];

  if (testID) arg.push(`[data-testid="${testID}"]`);
  if (aria) arg.push(`[aria-label="${aria}"]`);

  if (arg.length) query += arg.join("");

  await expect(page.locator(query)).toBeVisible({
    timeout: timeout ?? 10000,
  });
  await page.locator(query).click();
};

export const waitRedirect = async (page: Page, url: string) => {
  await page.waitForURL(B_URL + "/" + url, { timeout: 10000 });
};

export const searchTxt = async ({
  page,
  txt,
  timeout,
}: {
  page: Page;
  txt: string;
  timeout?: number;
}) => {
  await expect(page.getByText(`${txt}`, { exact: true })).toBeVisible({
    timeout: timeout ?? 10000,
  });
};

export const fillInput = async ({
  page,
  name,
  testID,
  txt,
}: {
  page: Page;
  name: string;
  testID?: string;
  txt: string;
}) => {
  let query = `input[name="${name}"]`;

  if (testID) query += `[data-testid="${testID}"]`;

  await expect(page.locator(query)).toBeVisible();
  await page.locator(query).fill(txt);
  await expect(page.locator(query)).toHaveValue(txt);
};

export const clickBtn = async ({
  page,
  aria,
  testID,
  timeout,
}: {
  page: Page;
  aria: string;
  testID?: string;
  timeout?: number;
}) => {
  let query = "button";
  const arg: string[] = [];

  if (testID) arg.push(`[data-testid="${testID}"]`);
  if (aria) arg.push(`[aria-label="${aria}"]`);

  if (arg.length) query += `:is(${arg.join(", ")})`;

  await expect(page.locator(query)).toBeVisible({
    timeout: timeout ?? 10000,
  });

  await page.locator(query).click();
};

export const listenErr = async ({
  page,
  testID,
}: {
  page: Page;
  testID: string;
}) => {
  const hasOpacity = await page.waitForFunction(
    (testID) => {
      const el = document.querySelector(`[data-testid='err-msg-${testID}']`);
      if (!el) return false;

      let current = el as HTMLElement | null;
      while (current) {
        const style = getComputedStyle(current);
        if (style.opacity === "0") return true;
        current = current.parentElement;
      }

      return false;
    },
    testID,
    { timeout: 10000 }
  );

  const isOK = await hasOpacity.jsonValue();
  expect(isOK).toBe(true);
};
