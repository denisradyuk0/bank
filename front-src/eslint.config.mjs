import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  { ignores: ["src/infrastructure/strapi/*.ts"] },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ),
  {
    plugins: {
      react,
      "@typescript-eslint": typescriptEslint,
      prettier,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".stories.tsx"],
          moduleDirectory: ["node_modules", "src/"],
        },

        alias: {
          map: [["~", "./src"]],
          extensions: [".js", ".ts", ".tsx", ".d.ts", ".test.ts", ".json"],
        },
      },
    },

    rules: {
      "object-curly-spacing": ["error", "always"],

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],

      "class-methods-use-this": "off",
      "import/no-import-module-exports": "off",
      "react/require-default-props": "off",
      "import/prefer-default-export": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "no-useless-constructor": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-shadow": "off",
      "no-shadow": "off",
      "no-return-await": "off",
      "no-use-before-define": "off",

      "no-empty-function": [
        "error",
        {
          allow: ["constructors"],
        },
      ],

      "import/order": [
        "error",
        {
          pathGroups: [
            {
              pattern: "~/**",
              group: "external",
            },
          ],
        },
      ],

      "prettier/prettier": [
        "warn",
        {
          printWidth: 80,
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false,
          semi: true,
          singleQuote: false,
          quoteProps: "as-needed",
          jsxSingleQuote: false,
          trailingComma: "all",
          bracketSpacing: true,
          arrowParens: "always",
        },
      ],

      "react/button-has-type": "off",

      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],

      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-namespace": "off",
      "no-control-regex": "off",
      "no-plusplus": "off",
      "react/no-array-index-key": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-alert": "off",
      "no-param-reassign": "off",
      "eol-last": ["error", "always"],
      camelcase: "off",
      "no-underscore-dangle": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "react-hooks/rules-of-hooks": "off",
      "jsx-a11y/control-has-associated-label": "off",
      "react/jsx-props-no-spreading": "off",
    },
  },
];
