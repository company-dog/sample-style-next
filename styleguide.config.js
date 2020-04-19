const path = require("path");

module.exports = {
  components: "./src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json"
  ).parse,
  styleguideComponents: {
    Wrapper: path.resolve(__dirname, "src/styleguide/Wrapper.tsx"),
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css?$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
};
