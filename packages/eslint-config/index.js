/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig, globalIgnores } = require("eslint/config");
const nextVitals = require("eslint-config-next/core-web-vitals");
const nextTs = require("eslint-config-next/typescript");

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
    "node_modules/**"
  ]),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-html-link-for-pages": "off"
    }
  }
]);

module.exports = eslintConfig;
