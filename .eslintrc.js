module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'import/extensions': 0,
    'no-new': 0,
    'class-methods-use-this': 0,
    'import/no-cycle': 0,
  },
};
