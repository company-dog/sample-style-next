const path = require("path");

module.exports = {
  // components: "./src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json"
  ).parse,
  styleguideComponents: {
    Wrapper: path.resolve(__dirname, "src/styleguide/Wrapper.tsx"),
  },

  sections: [
    {
      name: "Introduction",
      content: "docs/introduction.md",
    },
    {
      name: "Documentation",
      sections: [
        {
          name: "Installation",
          content: "docs/installation.md",
          description: "The description for the installation section",
        },
        {
          name: "Configuration",
          content: "docs/configuration.md",
        },
        {
          name: "Live Demo",
          external: true,
          href: "http://example.com",
        },
      ],
    },
    {
      name: "UI Components",
      content: "docs/ui.md",
      components: "./src/components/**/*.tsx",
      exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
      usageMode: "expand", // 'hide' | 'collapse' | 'expand'
    },
  ],

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
