import js from '@eslint/js';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsdoc from 'eslint-plugin-tsdoc';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const gitignorePath = new URL('.gitignore', import.meta.url).pathname;

export default defineConfig([
  includeIgnoreFile(gitignorePath),

  {
    files: ['**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],

    plugins: {
      'simple-import-sort': simpleImportSort,
      js,
      prettier,
      tsdoc,
    },

    extends: [js.configs.recommended, tseslint.configs.recommended],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'error',
      'no-debugger': 'error',
      'prettier/prettier': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'tsdoc/syntax': 'error',
    },
  },
]);
