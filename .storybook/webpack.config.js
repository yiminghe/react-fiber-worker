const webpack = require('webpack');

module.exports = ({ config, mode }) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: mode === 'DEVELOPMENT',
      __PROFILE__: true,
    }),
  );
  config.output.globalObject = 'this';
  return config;
};
