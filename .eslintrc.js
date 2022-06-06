module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  globals: {
    exampleGlobalVariable: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
