import path from "node:path";
import { defineConfig } from "vitest/config";

// Keep unit tests independent from the React Router build plugin. Loading the
// complete prerender graph for pure unit tests exhausts file handles on CI and
// does not provide any test functionality.
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
    },
  },
  test: {
    environment: "node",
    exclude: ["node_modules/**", "build/**"],
  },
});
