const path = require('path');
const webpack = require('webpack');

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.resolve = storybookBaseConfig.resolve || {};
  storybookBaseConfig.resolve.alias = storybookBaseConfig.resolve.alias || {};
  let alias = {};
  [
    'react-reconciler', 'shared',
    'UIManager', 'TextInputState',
    'ReactNativeViewConfigRegistry'
  ].forEach((key) => {
    alias[key] = path.join(__dirname, `../src/worker/${key}`);
  });
  storybookBaseConfig.plugins.push(new webpack.DefinePlugin({
    '__DEV__': configType === 'DEVELOPMENT',
  }));
  // console.log(alias);
  Object.assign(storybookBaseConfig.resolve.alias, alias);
  return storybookBaseConfig;
};
