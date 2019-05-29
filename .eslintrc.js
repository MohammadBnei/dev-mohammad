module.exports = {
  plugins: ["gatsby-plugin-eslint"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
}
