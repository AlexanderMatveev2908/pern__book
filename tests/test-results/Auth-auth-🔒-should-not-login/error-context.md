# Test info

- Name: auth 🔒 >> should not login
- Location: /home/ninja/Documents/PROJECTS/PERN__BOOK/tests/src/e2e/Auth.test.tsx:25:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByText('user not found')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText('user not found')

    at /home/ninja/Documents/PROJECTS/PERN__BOOK/tests/src/e2e/Auth.test.tsx:32:52
```

# Page snapshot

```yaml
- link "PERN__BOOK":
  - /url: /
- link "Register":
  - /url: /auth/register
  - img
  - text: Register
- link "Login":
  - /url: /auth/login
  - img
  - text: Login
- link "Verify email":
  - /url: /auth/verify-account
  - img
  - text: Verify email
- link "Recover account":
  - /url: /auth/forgot-pwd
  - img
  - text: Recover account
- img
- button:
  - img
- button:
  - img
- button
- button
- text: 500 ERROR
- button:
  - img
- text: A SNORLAX HAS FALLEN ASLEEP BLOCKING THE ROAD, TRY LATER 💤
- link "Home":
  - /url: /
  - img
  - text: Home
- link "Books":
  - /url: /books
  - img
  - text: Books
- img
- text: Account
- img
- link "Register":
  - /url: /auth/register
  - img
  - text: Register
- link "Login":
  - /url: /auth/login
  - img
  - text: Login
- link "Verify email":
  - /url: /auth/verify-account
  - img
  - text: Verify email
- link "Recover account":
  - /url: /auth/forgot-pwd
  - img
  - text: Recover account
- heading "LOGIN" [level=1]
- text: Email
- textbox "Email": matveevalexander470@gmail.com
- text: Password
- textbox "Password": o2zxih^Wl*W~8^da
- button:
  - img
- button "Login"
- img
- text: Don't have an' account ?
- link "Register":
  - /url: /auth/register
- img
- text: Forgot password ?
- link "Recover":
  - /url: /auth/forgot-pwd
- link "LOGO":
  - /url: /
- heading "NEWSLETTER" [level=1]
- textbox
- button "Subscribe"
- heading "LAST PROJECTS ✌🏼" [level=1]
- link "Source code":
  - /url: https://github.com/AlexanderMatveev2908/PERN__BOOK
  - img
  - text: Source code
- link "MERN Food App":
  - /url: https://food-app-aqkc.onrender.com
  - img
  - text: MERN Food App
- link "MERN Booking App":
  - /url: https://mern-booking-app-0w8v.onrender.com
  - img
  - text: MERN Booking App
- link "React X0":
  - /url: https://react-x0.onrender.com
  - img
  - text: React X0
- link "React Calculator":
  - /url: https://react-calculator-imc7.onrender.com
  - img
  - text: React Calculator
- link "REACT Form":
  - /url: https://react-form-ytsc.onrender.com
  - img
  - text: REACT Form
- link "React Team Devs":
  - /url: https://react-team-developers.onrender.com
  - img
  - text: React Team Devs
```

# Test source

```ts
   1 | import seq from "../db/config.js";
   2 | import { expect, test } from "@playwright/test";
   3 | import { bindModels } from "../db/models/all/bind/bind.js";
   4 | import { nav } from "./utils/general.js";
   5 |
   6 | const account_0 = {
   7 |   email: "matveevalexander470@gmail.com",
   8 |   pwd: "o2zxih^Wl*W~8^da",
   9 | };
  10 | const account_1 = {
  11 |   email: "matveev.alexander.29.08.00@gmail.com",
  12 |   pwd: "iME*Ge%7y@@,x0oi",
  13 | };
  14 | const account_2 = {
  15 |   email: "matveevalexander2908@gmail.com",
  16 |   pwd: "f760Im}CZ_7YG?(.",
  17 | };
  18 |
  19 | test.beforeAll(async () => {
  20 |   await seq.authenticate();
  21 |   bindModels(seq);
  22 | });
  23 |
  24 | test.describe("auth 🔒", () => {
  25 |   test("should not login", async ({ page }) => {
  26 |     await nav(page, "auth/login");
  27 |
  28 |     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  29 |     await page.getByLabel("password").fill(account_0.pwd);
  30 |     await page.getByRole("button", { name: "login" }).click();
  31 |
> 32 |     await expect(page.getByText("user not found")).toBeVisible();
     |                                                    ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  33 |   });
  34 | });
  35 |
```