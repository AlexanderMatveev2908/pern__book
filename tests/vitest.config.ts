/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/unit/**/*.test.ts"], // optionally restrict which files to test
  },
});
