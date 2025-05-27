import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/e2e/", // Only look in E2E directory
  testMatch: "**/*.test.ts?(x)", // Match Playwright test files only
  // Other config like timeout, reporter, etc.
});
