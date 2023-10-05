module.exports = {
  presets: [
    ["@babel/preset-react", { runtime: "automatic", importSource: "@emotion/react" }],
    "@babel/preset-env",
    "@babel/preset-typescript",
  ],
  env: {
    test: {
      presets: [
        ["@babel/preset-react", { runtime: "automatic", importSource: "@emotion/react" }],
        "@babel/preset-env",
        "@babel/preset-typescript",
      ],
      plugins: ["transform-require-context", "@emotion/babel-plugin"],
    },
  },
};
