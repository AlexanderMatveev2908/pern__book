import { Page, expect } from "@playwright/test";
import { account_0 } from "./data.js";
import { clickBtn, fillInput, nav, searchTxt } from "./general.js";

export const handlePwdSwing = async ({
  page,
  aria,
  txt,
}: {
  page: Page;
  aria: string;
  txt: string;
}) => {
  let success = false;

  for (const pwd of [account_0.pwd, account_0.newPwd]) {
    try {
      await fillInput({ page, name: "password", txt: pwd });
      await clickBtn({ page, aria });

      await searchTxt({ page, txt });

      success = true;
      console.log(`logged in with ${pwd}`);

      break;
    } catch (err: any) {
      console.log(err?.message);
    }
  }

  return success;
};

export const handleLoginT = async ({ page }: { page: Page }) => {
  await nav(page, "auth/login");

  await page.getByRole("textbox", { name: "email" }).fill(account_0.email);

  const success = await handlePwdSwing({
    page,
    aria: "login",
    txt: "LOGIN SUCCESSFUL",
  });

  await expect(success).toBe(true);
};
