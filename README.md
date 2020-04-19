# Nextjs と Typescript で React-StyleGuidist を使うための設定


## Nextjs プロジェクトの作成

```
create-next-app [prject-name]
```

```
cd [project-name]

mkdir src
mv pages src/
mkdir src/components
mkdir src/styleguide
```

## 必要なパッケージのインストール

```
# NextjsでTypeScriptを使うためのパッケージ
yarn add -D @types/node typescript @types/react

# React-StyleguidistをNextjs,TypeScriptと一緒に使うためのパッケージ
yarn add -D react-styleguidist babel-loader react-docgen-typescript
```



## styleguide.config.js の設定

```js
module.exports = {
  components: "./src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json"
  ).parse,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
  },
};
```

## babel.config.js の設定

```js
module.exports = {
  presets: ["next/babel"],
  plugins: [],
};
```

## package.jsonの設定

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "styleguide": "styleguidist server",
    "styleguide:build": "styleguidist build"
  },
```


## 補足）Bootstrapのスタイルを適用する方法

### Bootstrapのインストール

```
yarn add bootstrap jquery popper.js
```

### styleguide.config.jsの設定

```js
const path = require("path");

module.exports = {
  components: "./src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json"
  ).parse,
  styleguideComponents: {
    // ADD: Wrapperコンポーネントをスタイルガイド用に定義する
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
        // ADD: style-loaderとcss-loaderを追加する。
        {
          test: /\.css?$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
};
```

### src/styleguide/Wrapper.tsxの設定


```tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const Wrapper: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

export default Wrapper;
```
