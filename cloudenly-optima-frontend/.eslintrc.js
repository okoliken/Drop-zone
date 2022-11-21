module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-unused-vars": 0,
    "no-console": 0,
    // "no-undef": 0,
    // "no-dupe-keys": 0,
    // "vue/no-dupe-keys": 0,
    // "no-mixed-space~s-and-tabs": 0,
    // "vue/no-unused-vars": 0,
    // "vue/require-v-for-key": 0,
    // "no-redeclare": 0,
    // "vue/return-in-computed-property": 0,
    // "vue/no-side-effects-in-computed-properties": 0,
    // "vue/return-in-computed-property": 0,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
