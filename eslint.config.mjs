// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  rules: {
    // Allow use of `any`
    "@typescript-eslint/no-explicit-any": "off",

    // Relax unused vars – allow underscores for unused
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],

    // Warn on missing dependencies in useEffect but don't block
    "react-hooks/exhaustive-deps": "warn",

    // Allow conditional hooks (⚠️ risky – use with caution)
    "react-hooks/rules-of-hooks": "off",

    // Use const rule (optional – you can keep this or disable if annoying)
    "prefer-const": "warn",

    // Disable warning for <img> (Next.js recommends <Image />, but you may choose to override)
    "@next/next/no-img-element": "off",

    // Disable strict escaping of quotes in JSX
    "react/no-unescaped-entities": "off",

    // Allow object wrapper types like `Boolean` (not recommended, but disables the warning)
    "@typescript-eslint/no-wrapper-object-types": "off",
  },
}, // Optional: ignore generated or noisy paths
{
  ignores: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/out/**",
    "**/*.gen.ts",
    "**/*.generated.ts",
    "**/generated/**",
    "**/prisma/runtime/**",
  ],
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
