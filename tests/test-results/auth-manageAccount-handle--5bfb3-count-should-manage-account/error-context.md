# Test info

- Name: handle manage account >> should manage account
- Location: /home/ninja/Documents/PROJECTS/PERN__BOOK/tests/src/e2e/auth/manageAccount.test.ts:17:3

# Error details

```
Error: expect(locator).toBeVisible()

Locator: getByText('CONFIRM YOUR PASSWORD')
Expected: visible
Received: undefined
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText('CONFIRM YOUR PASSWORD')

    at /home/ninja/Documents/PROJECTS/PERN__BOOK/tests/src/e2e/auth/manageAccount.test.ts:20:59
```

# Test source

```ts
   1 | import { expect, test } from "@playwright/test";
   2 | import { nav } from "../utils/general.js";
   3 | import { account_0 } from "./data.js";
   4 |
   5 | test.beforeEach(async ({ page }) => {
   6 |   await nav(page, "auth/login");
   7 |
   8 |   await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
   9 |   await page.getByLabel("password").fill(account_0.pwd);
  10 |
  11 |   await page.getByRole("button", { name: "Login" }).click();
  12 |
  13 |   await expect(page.getByText("login successful".toUpperCase())).toBeVisible();
  14 | });
  15 |
  16 | test.describe("handle manage account", () => {
  17 |   test("should manage account", async ({ page }) => {
  18 |     await page.getByRole("button", { name: "dropdown header" }).hover();
  19 |
> 20 |     await expect(page.getByText("Profile")).toBeVisible();
     |                                                           ^ Error: expect(locator).toBeVisible()
  21 |     await expect(page.getByText("Manage Account")).toBeVisible();
  22 |     await expect(page.getByText("Logout")).toBeVisible();
  23 |
  24 |     // await expect(page.getByText("CONFIRM YOUR PASSWORD")).toBeVisible();
  25 |
  26 |     // await page
  27 |     //   .getByRole("textbox", { name: "password" })
  28 |     //   .fill(account_0.pwd + "banana");
  29 |     // await page.getByRole("button", { name: "confirm" }).click();
  30 |     // await expect(page.getByText("invalid credentials")).toBeVisible();
  31 |   });
  32 | });
  33 |
```