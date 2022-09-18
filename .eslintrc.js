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
    'linebreak-style': 0,
    'no-console': 0,
    "class-methods-use-this": [
      0, 
      { "exceptMethods": [

      ] }
    ],
  },
};
