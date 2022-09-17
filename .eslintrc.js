module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'linebreak-style': false,
    'no-console': false,
    "class-methods-use-this": [
      false, 
      { "exceptMethods": [

      ] }
    ],
  },
};
