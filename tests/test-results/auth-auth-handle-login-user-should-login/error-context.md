# Test info

- Name: handle login user >> should login
- Location: /home/ninja/Documents/PROJECTS/PERN__BOOK/tests/src/e2e/auth/auth.test.ts:136:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /home/ninja/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   36 | //     await page.getByRole("button", { name: "login" }).click();
   37 |
   38 | //     await expect(page.getByText("user not found")).toBeVisible();
   39 | //   });
   40 |
   41 | //   test("should not recover account", async ({ page }) => {
   42 | //     await nav(page, "auth/forgot-pwd");
   43 |
   44 | //     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
   45 | //     await page.getByRole("button", { name: "Send Email" }).click();
   46 |
   47 | //     await expect(page.getByText("user not found")).toBeVisible();
   48 | //   });
   49 |
   50 | //   test("should not send another email", async ({ page }) => {
   51 | //     await nav(page, "auth/verify-account");
   52 |
   53 | //     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
   54 | //     await page.getByRole("button", { name: "Send Email" }).click();
   55 |
   56 | //     await expect(page.getByText("user not found")).toBeVisible();
   57 | //   });
   58 | // });
   59 |
   60 | // test.describe("handle new user", () => {
   61 | //   test("should register", async ({ page }) => {
   62 | //     await nav(page, "auth/register");
   63 |
   64 | //     await page
   65 | //       .getByRole("textbox", { name: "First Name" })
   66 | //       .fill(account_0.firstName);
   67 | //     await page
   68 | //       .getByRole("textbox", { name: "Last Name" })
   69 | //       .fill(account_0.lastName);
   70 | //     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
   71 |
   72 | //     await page.getByRole("button", { name: "next" }).click();
   73 |
   74 | //     await page.waitForSelector("text=Password", { state: "visible" });
   75 | //     await expect(page.getByText("Password", { exact: true })).toBeVisible();
   76 | //     await page.waitForSelector("text=Generate password", { state: "visible" });
   77 | //     await expect(page.getByText("Generate password")).toBeVisible();
   78 |
   79 | //     // await page.getByRole("button", { name: "Generate password" }).click();
   80 | //     // await page
   81 | //     //   .locator(".tooltip_cpy > div > .txt__2")
   82 | //     //   .waitFor({ state: "visible" });
   83 | //     // await expect(page.locator(".tooltip_cpy > div > .txt__2")).toHaveText(
   84 | //     //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{16}$/
   85 | //     // );
   86 |
   87 | //     // await page.getByRole("button", { name: "copy to clipboard" }).click();
   88 | //     // await expect(page.getByText("Copied to clipboard")).toBeVisible();
   89 | //     // const pwd = await page
   90 | //     //   .locator(".tooltip_cpy > div > .txt__2") // or whatever element holds just the password
   91 | //     //   .textContent();
   92 |
   93 | //     await page
   94 | //       .getByLabel("Password", { exact: true })
   95 | //       .fill(account_0.pwd ?? "");
   96 | //     await page
   97 | //       .getByRole("textbox", { name: "Confirm Password" })
   98 | //       .fill(account_0.pwd ?? "");
   99 |
  100 | //     await page
  101 | //       .getByRole("checkbox", { name: "accept terms and conditions" })
  102 | //       .click();
  103 | //     await expect(
  104 | //       page.getByRole("checkbox", { name: "accept terms and conditions" })
  105 | //     ).toHaveClass(/checky/);
  106 | //     await expect(
  107 | //       page.getByRole("checkbox", { name: "accept terms and conditions" })
  108 | //     ).toHaveAttribute("aria-checked", "true");
  109 |
  110 | //     await page.getByRole("button", { name: "Register" }).click();
  111 | //     await expect(page.getByRole("button", { name: "Register" })).toBeHidden();
  112 |
  113 | //     await page.waitForURL("**/notice");
  114 | //     await expect(page.getByText("Account created".toUpperCase())).toBeVisible();
  115 | //     await expect(
  116 | //       page.getByText(makeNoticeTxt("to verify your account"))
  117 | //     ).toBeVisible();
  118 | //   });
  119 | // });
  120 |
  121 | // ? ALREADY TESTED LINK EMAIL , ALSO WRITING WRONG QUERIES
  122 |
  123 | test.describe("handle login user", () => {
  124 |   test("should not login ", async ({ page }) => {
  125 |     await nav(page, "auth/login");
  126 |
  127 |     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  128 |     await page.getByLabel("password").fill(account_0.pwd + "banana");
  129 |
  130 |     await page.getByRole("button", { name: "Login" }).click();
  131 |     await expect(
  132 |       page.getByText("invalid credentials".toUpperCase())
  133 |     ).toBeVisible();
  134 |   });
  135 |
> 136 |   test("should login", async ({ page }) => {
      |   ^ Error: browserType.launch: Executable doesn't exist at /home/ninja/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
  137 |     await nav(page, "auth/login");
  138 |
  139 |     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  140 |     await page.getByLabel("password").fill(account_0.pwd);
  141 |
  142 |     await page.getByRole("button", { name: "Login" }).click();
  143 |     await expect(
  144 |       page.getByText("login successful".toUpperCase())
  145 |     ).toBeVisible();
  146 |   });
  147 | });
  148 |
```