// import { Page, expect } from "@playwright/test";

// // Check if an element is visible
// export async function expectVisible(page: Page, selector: string) {
//   await expect(page.locator(selector)).toBeVisible();
// }

// // Check if an element is hidden
// export async function expectHidden(page: Page, selector: string) {
//   await expect(page.locator(selector)).toBeHidden();
// }

// // Fill input field by selector
// export async function fillInput(page: Page, selector: string, value: string) {
//   await page.fill(selector, value);
// }

// // Click and wait for navigation (e.g. after form submit or redirect)
// export async function clickAndWait(page: Page, selector: string) {
//   await Promise.all([page.waitForNavigation(), page.click(selector)]);
// }

// // Wait for sidebar (or any panel) to be open
// export async function waitForSidebar(page: Page, sidebarSelector = "#sidebar") {
//   await expect(page.locator(sidebarSelector)).toBeVisible();
// }

// // Click an item only if it's present and enabled
// export async function safeClick(page: Page, selector: string) {
//   const el = page.locator(selector);
//   if ((await el.isVisible()) && (await el.isEnabled())) {
//     await el.click();
//   }
// }

// await page.getByRole("button", { name: "Submit" }).click();

// await page.getByRole("textbox", { name: "Email" }).fill("me@mail.com");

// await page.getByRole("heading", { level: 1 }).textContent();
