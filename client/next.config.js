const withTM = require("next-transpile-modules");
const withCSS = require("@zeit/next-css");

module.exports = withTM(
  withCSS({
    transpileModules: ["lodash-es"],
    cssLoaderOptions: {
      url: false // this breaks custom fonts, but it will do for now
    },

    webpack: config => {
      return config;
    }
  })
);
