/*
 * @Author: jack.hai
 * @Date: 2022-11-23 14:35:45
 * @LastEditTime: 2022-11-27 19:13:58
 * @Description:
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "./.eslintrc-auto-import.json"],
  overrides: [],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: '@typescript-eslint/parser',
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "no-extra-parens": "error",
    "no-multi-spaces": "error",
    "no-self-compare": "error",
    "no-useless-concat": "error",
    "indent": ["error", 4],
    "key-spacing": "error",
    "vue/multi-word-component-names": "off",
    "no-multiple-empty-lines": "error", // 限制最多出现两个空行
    "no-trailing-spaces": "error", // 禁止在空行使用空白字符
    "no-unneeded-ternary": "error",
    "operator-assignment": "error",
    "quotes": ["error", "double"],
    "semi-spacing": "error",
    "semi-style": "error",
    "space-before-blocks": "error",
    "space-infix-ops": "error",
    "no-duplicate-imports": "error",
    "no-var": "error",
    "prefer-const": "error",
    "rest-spread-spacing": "error",
  },
};
