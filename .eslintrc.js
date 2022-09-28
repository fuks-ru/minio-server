const resolver = require('eslint-config-fuks/resolver');

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint-config-fuks'],
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      [resolver]: {
        project: 'tsconfig.json',
      },
    },
  },
  rules: {
    'jsdoc/require-jsdoc': ['off'],
    'i18next/no-literal-string': ['off'],
  },
  overrides: [
    {
      files: ['*.json'],
      parserOptions: {
        project: false,
      },
    },
  ],
};
