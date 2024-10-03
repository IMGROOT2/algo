import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  includeIgnoreFile(gitignorePath),
  ...vue.configs['flat/essential'],

  {
    files: ['**/*.{js,cjs,mjs,ts,tsx}'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
    languageOptions: {
      ecmaVersion: 'latest',
    },
  },

  {
    files: ['**/*.vue'],
    plugins: {
      vue,
    },
    rules: {
      ...vue.configs['vue3-essential'].rules,
      'vue/multi-word-component-names': 'off',
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
  },

  {
    plugins: {
      prettier,
    },
    rules: {
      ...prettier.rules,
    },
  },
];
