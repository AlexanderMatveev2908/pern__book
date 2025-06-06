import seq from "../../db/config.js";
import { expect, test } from "@playwright/test";
import { bindModels } from "../../db/models/all/bind/bind.js";
import { nav } from "../utils/general.js";
import { User } from "../../db/models/all/User.js";
import { Token } from "../../db/models/all/Token.js";
import { makeNoticeTxt } from "../../lib/utils.js";

const account_0 = {
  firstName: "alex",
  lastName: "matveev",
  email: "matveevalexander470@gmail.com",
  pwd: "o2zxih^Wl*W~8^da",
};
const account_1 = {
  email: "matveev.alexander.29.08.00@gmail.com",
  pwd: "iME*Ge%7y@@,x0oi",
};
const account_2 = {
  email: "matveevalexander2908@gmail.com",
  pwd: "f760Im}CZ_7YG?(.",
};

const clear = async () => {
  const c_0 = await Token.destroy({ where: {} });
  const c_1 = await User.destroy({ where: {} });
};

test.beforeAll(async () => {
  await seq.authenticate();
  bindModels(seq);

  // await clear();
});
test.afterAll(async () => {
  // await clear();
});

// test.describe("handle non existent user", () => {
//   test("should not login", async ({ page }) => {
//     await nav(page, "auth/login");

//     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
//     await page.getByLabel("password").fill(account_0.pwd);
//     await page.getByRole("button", { name: "login" }).click();

//     await expect(page.getByText("user not found")).toBeVisible();
//   });

//   test("should not recover account", async ({ page }) => {
//     await nav(page, "auth/forgot-pwd");

//     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
//     await page.getByRole("button", { name: "Send Email" }).click();

//     await expect(page.getByText("user not found")).toBeVisible();
//   });

//   test("should not send another email", async ({ page }) => {
//     await nav(page, "auth/verify-account");

//     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
//     await page.getByRole("button", { name: "Send Email" }).click();

//     await expect(page.getByText("user not found")).toBeVisible();
//   });
// });

// test.describe("handle new user", () => {
//   test("should register", async ({ page }) => {
//     await nav(page, "auth/register");

//     await page
//       .getByRole("textbox", { name: "First Name" })
//       .fill(account_0.firstName);
//     await page
//       .getByRole("textbox", { name: "Last Name" })
//       .fill(account_0.lastName);
//     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);

//     await page.getByRole("button", { name: "next" }).click();

//     await page.waitForSelector("text=Password", { state: "visible" });
//     await expect(page.getByText("Password", { exact: true })).toBeVisible();
//     await page.waitForSelector("text=Generate password", { state: "visible" });
//     await expect(page.getByText("Generate password")).toBeVisible();

//     // await page.getByRole("button", { name: "Generate password" }).click();
//     // await page
//     //   .locator(".tooltip_cpy > div > .txt__2")
//     //   .waitFor({ state: "visible" });
//     // await expect(page.locator(".tooltip_cpy > div > .txt__2")).toHaveText(
//     //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{16}$/
//     // );

//     // await page.getByRole("button", { name: "copy to clipboard" }).click();
//     // await expect(page.getByText("Copied to clipboard")).toBeVisible();
//     // const pwd = await page
//     //   .locator(".tooltip_cpy > div > .txt__2") // or whatever element holds just the password
//     //   .textContent();

//     await page
//       .getByLabel("Password", { exact: true })
//       .fill(account_0.pwd ?? "");
//     await page
//       .getByRole("textbox", { name: "Confirm Password" })
//       .fill(account_0.pwd ?? "");

//     await page
//       .getByRole("checkbox", { name: "accept terms and conditions" })
//       .click();
//     await expect(
//       page.getByRole("checkbox", { name: "accept terms and conditions" })
//     ).toHaveClass(/checky/);
//     await expect(
//       page.getByRole("checkbox", { name: "accept terms and conditions" })
//     ).toHaveAttribute("aria-checked", "true");

//     await page.getByRole("button", { name: "Register" }).click();
//     await expect(page.getByRole("button", { name: "Register" })).toBeHidden();

//     await page.waitForURL("**/notice");
//     await expect(page.getByText("Account created".toUpperCase())).toBeVisible();
//     await expect(
//       page.getByText(makeNoticeTxt("to verify your account"))
//     ).toBeVisible();
//   });
// });

// ? ALREADY TESTED LINK EMAIL , ALSO WRITING WRONG QUERIES

test.describe("handle login user", () => {
  test("should not login ", async ({ page }) => {
    await nav(page, "auth/login");

    await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
    await page.getByLabel("password").fill(account_0.pwd + "banana");

    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByText("invalid credentials".toUpperCase())
    ).toBeVisible();
  });

  test("should login", async ({ page }) => {
    await nav(page, "auth/login");

    await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
    await page.getByLabel("password").fill(account_0.pwd);

    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByText("login successful".toUpperCase())
    ).toBeVisible();
  });
});
