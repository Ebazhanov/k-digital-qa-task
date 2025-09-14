const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const playwrightPlugin = require('eslint-plugin-playwright');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.ts'],
    ignores: [
      'node_modules/',
      'dist/',
      'playwright-report/',
      'test-results/'
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'playwright': playwrightPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];
