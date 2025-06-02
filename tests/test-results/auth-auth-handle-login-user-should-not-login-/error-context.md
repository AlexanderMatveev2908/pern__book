# Test info

- Name: handle login user >> should not login 
- Location: /home/ninja/Documents/PROJECTS/PERN__BOOK/tests/src/e2e/auth/auth.test.ts:134:3

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
   34 |   // await clear();
   35 | });
   36 | test.afterAll(async () => {
   37 |   // await clear();
   38 | });
   39 |
   40 | // test.describe("handle non existent user", () => {
   41 | //   test("should not login", async ({ page }) => {
   42 | //     await nav(page, "auth/login");
   43 |
   44 | //     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
   45 | //     await page.getByLabel("password").fill(account_0.pwd);
   46 | //     await page.getByRole("button", { name: "login" }).click();
   47 |
   48 | //     await expect(page.getByText("user not found")).toBeVisible();
   49 | //   });
   50 |
   51 | //   test("should not recover account", async ({ page }) => {
   52 | //     await nav(page, "auth/forgot-pwd");
   53 |
   54 | //     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
   55 | //     await page.getByRole("button", { name: "Send Email" }).click();
   56 |
   57 | //     await expect(page.getByText("user not found")).toBeVisible();
   58 | //   });
   59 |
   60 | //   test("should not send another email", async ({ page }) => {
   61 | //     await nav(page, "auth/verify-account");
   62 |
   63 | //     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
   64 | //     await page.getByRole("button", { name: "Send Email" }).click();
   65 |
   66 | //     await expect(page.getByText("user not found")).toBeVisible();
   67 | //   });
   68 | // });
   69 |
   70 | // test.describe("handle new user", () => {
   71 | //   test("should register", async ({ page }) => {
   72 | //     await nav(page, "auth/register");
   73 |
   74 | //     await page
   75 | //       .getByRole("textbox", { name: "First Name" })
   76 | //       .fill(account_0.firstName);
   77 | //     await page
   78 | //       .getByRole("textbox", { name: "Last Name" })
   79 | //       .fill(account_0.lastName);
   80 | //     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
   81 |
   82 | //     await page.getByRole("button", { name: "next" }).click();
   83 |
   84 | //     await page.waitForSelector("text=Password", { state: "visible" });
   85 | //     await expect(page.getByText("Password", { exact: true })).toBeVisible();
   86 | //     await page.waitForSelector("text=Generate password", { state: "visible" });
   87 | //     await expect(page.getByText("Generate password")).toBeVisible();
   88 |
   89 | //     // await page.getByRole("button", { name: "Generate password" }).click();
   90 | //     // await page
   91 | //     //   .locator(".tooltip_cpy > div > .txt__2")
   92 | //     //   .waitFor({ state: "visible" });
   93 | //     // await expect(page.locator(".tooltip_cpy > div > .txt__2")).toHaveText(
   94 | //     //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{16}$/
   95 | //     // );
   96 |
   97 | //     // await page.getByRole("button", { name: "copy to clipboard" }).click();
   98 | //     // await expect(page.getByText("Copied to clipboard")).toBeVisible();
   99 | //     // const pwd = await page
  100 | //     //   .locator(".tooltip_cpy > div > .txt__2") // or whatever element holds just the password
  101 | //     //   .textContent();
  102 |
  103 | //     await page
  104 | //       .getByLabel("Password", { exact: true })
  105 | //       .fill(account_0.pwd ?? "");
  106 | //     await page
  107 | //       .getByRole("textbox", { name: "Confirm Password" })
  108 | //       .fill(account_0.pwd ?? "");
  109 |
  110 | //     await page
  111 | //       .getByRole("checkbox", { name: "accept terms and conditions" })
  112 | //       .click();
  113 | //     await expect(
  114 | //       page.getByRole("checkbox", { name: "accept terms and conditions" })
  115 | //     ).toHaveClass(/checky/);
  116 | //     await expect(
  117 | //       page.getByRole("checkbox", { name: "accept terms and conditions" })
  118 | //     ).toHaveAttribute("aria-checked", "true");
  119 |
  120 | //     await page.getByRole("button", { name: "Register" }).click();
  121 | //     await expect(page.getByRole("button", { name: "Register" })).toBeHidden();
  122 |
  123 | //     await page.waitForURL("**/notice");
  124 | //     await expect(page.getByText("Account created".toUpperCase())).toBeVisible();
  125 | //     await expect(
  126 | //       page.getByText(makeNoticeTxt("to verify your account"))
  127 | //     ).toBeVisible();
  128 | //   });
  129 | // });
  130 |
  131 | // ? ALREADY TESTED LINK EMAIL , ALSO WRITING WRONG QUERIES
  132 |
  133 | test.describe("handle login user", () => {
> 134 |   test("should not login ", async ({ page }) => {
      |   ^ Error: browserType.launch: Executable doesn't exist at /home/ninja/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
  135 |     await nav(page, "auth/login");
  136 |
  137 |     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  138 |     await page.getByLabel("password").fill(account_0.pwd + "banana");
  139 |
  140 |     await page.getByRole("button", { name: "Login" }).click();
  141 |     await expect(
  142 |       page.getByText("invalid credentials".toUpperCase())
  143 |     ).toBeVisible();
  144 |   });
  145 |
  146 |   test("should login", async ({ page }) => {
  147 |     await nav(page, "auth/login");
  148 |
  149 |     await page.getByRole("textbox", { name: "email" }).fill(account_0.email);
  150 |     await page.getByLabel("password").fill(account_0.pwd);
  151 |
  152 |     await page.getByRole("button", { name: "Login" }).click();
  153 |     await expect(
  154 |       page.getByText("login successful".toUpperCase())
  155 |     ).toBeVisible();
  156 |   });
  157 | });
  158 |
```