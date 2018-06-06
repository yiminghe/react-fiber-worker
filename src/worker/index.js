import AppRegistry from './AppRegistry';

self.onmessage = function (event) {
  const { type, rootTag, appKey, initialProps } = event.data;
  if (type === 'mount') {
    AppRegistry.runApplication(appKey, {
      initialProps,
      rootTag,
    });
  }
};

export {
  AppRegistry
};
