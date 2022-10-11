import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

export default (config) => {
  config.plugins.push(new MonacoWebpackPlugin());

  return config;
};
