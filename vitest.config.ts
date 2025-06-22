/// <reference types="vitest" />
import "dotenv/config";
import { defineConfig } from "vitest/config";
import path from "path";


export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, "src/lib"),
      types: path.resolve(__dirname, "src/types"),
    },
  },
});
