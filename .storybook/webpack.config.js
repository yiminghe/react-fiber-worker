const webpack = require('webpack');

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: configType === 'DEVELOPMENT',
      __PROFILE__: true,
    }),
  );
  return storybookBaseConfig;
};
