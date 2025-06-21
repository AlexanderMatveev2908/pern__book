import { expect, test } from "@playwright/test";
import { clickBtn, fillInput, nav, searchTxt } from "../../lib/play.js";
import { account_0 } from "../../lib/data.js";
import { makeNoticeTxt } from "../../lib/utils.js";

test.describe("handle new user", () => {
  test("should register", async ({ page }) => {
    await nav(page, "auth/register");

    await fillInput({
      page,
      name: "firstName",
      txt: account_0.firstName,
    });
    await fillInput({
      page,
      name: "lastName",
      txt: account_0.lastName,
    });
    await fillInput({
      page,
      name: "email",
      testID: "email-register",
      txt: account_0.email,
    });

    await page.getByRole("button", { name: "next" }).click();

    await fillInput({
      page,
      name: "password",
      txt: account_0.pwd,
    });
    await fillInput({
      page,
      name: "confirmPassword",
      txt: account_0.pwd,
    });
    await page
      .getByRole("checkbox", { name: "accept terms and conditions" })
      .click();
    await expect(
      page.getByRole("checkbox", { name: "accept terms and conditions" })
    ).toHaveClass(/checky/);
    await expect(
      page.getByRole("checkbox", { name: "accept terms and conditions" })
    ).toHaveAttribute("aria-checked", "true");

    // await page.waitForSelector("text=Generate password", { state: "visible" });
    // await expect(page.getByText("Generate password")).toBeVisible();
    // await page.getByRole("button", { name: "Generate password" }).click();
    // await page.locator("button > div > .txt__2").waitFor({ state: "visible" });
    // await expect(page.locator("button > div > .txt__2")).toHaveText(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{16}$/
    // );
    // await page.getByRole("button", { name: "copy to clipboard" }).click();
    // await expect(page.getByText("Copied to clipboard")).toBeVisible();
    // const pwd = await page.locator("button > div > .txt__2").textContent();
    // await page.getByLabel("Password", { exact: true }).fill(pwd ?? "");
    // await page
    //   .getByRole("textbox", { name: "Confirm Password" })
    //   .fill(pwd ?? "");

    await clickBtn({ page, aria: "register" });
    await expect(page.getByRole("button", { name: "Register" })).toBeHidden();

    await page.waitForURL("**/notice");
    await searchTxt({ page, txt: "Account created".toUpperCase() });
    await expect(
      page.getByText(makeNoticeTxt("to verify your account"))
    ).toBeVisible();
  });
});
