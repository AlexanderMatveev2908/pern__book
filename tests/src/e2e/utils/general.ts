import { Page } from "@playwright/test";

const B_URL = "http://localhost:3001";

export const nav = async (page: Page, p: string) => {
  await page.goto(`${B_URL}/${p}`);
};
