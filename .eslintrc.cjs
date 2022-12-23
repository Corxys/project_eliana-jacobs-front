/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    /* ESLint core rules */
    "quotes": [2, "double", {avoidEscape: true}],
    "semi": ["error", "always"],
    "max-len": ["error", {"code": 180, "tabWidth": 1}],
    
    /* Vue 3 rules */
    "vue/template-curly-spacing": ["error", "never"],
    "vue/mustache-interpolation-spacing": ["error", "never"],
    "vue/attributes-order": ["error"],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 4,
      },
      "multiline": {
        "max": 1,
      }
    }],
  }
};
