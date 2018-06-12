import AppRegistry from './AppRegistry';
import { receiveTouches, receiveEvent } from './worker-render/ReactNativeEventEmitter';

self.onmessage = function (event) {
  const { type } = event.data;
  if (type === 'mount') {
    const { rootTag, appKey, initialProps } = event.data;
    AppRegistry.runApplication(appKey, {
      initialProps,
      rootTag,
    });
  } else if (type === 'touchEvent') {
    const { eventTopLevelType, changedIndices, touches } = event.data;
    receiveTouches(eventTopLevelType, touches, changedIndices);
  } else if (type === 'clickEvent') {
    const { e } = event.data;
    receiveEvent(e.target, 'topClick', e);
  }
};
