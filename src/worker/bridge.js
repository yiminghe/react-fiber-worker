import AppRegistry from './AppRegistry';
import {
  receiveTouches,
  receiveEvent,
} from './react-native-renderer/src/ReactNativeEventEmitter';

self.onmessage = function(event) {
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
  } else if (type === 'event') {
    const { e, eventTopLevelType } = event.data;
    receiveEvent(e.target, eventTopLevelType, e);
  } else if (type === 'callViewMethodResponse') {
    const { callbackId, response } = event.data;
    const callback = callPool[callbackId];
    delete callPool[callbackId];
    if (callback) {
      callback(response);
    }
  }
};

const callPool = {};
let id = 0;

export function callViewMethod(reactTag, { method, args }, callback) {
  if (callback) {
    callPool[++id] = callback;
  }
  postMessage({
    type: 'callViewMethod',
    args: [
      {
        reactTag,
        method,
        args,
        callbackId: callback ? id : undefined,
      },
    ],
  });
}

export function measure(reactTag, callback) {
  if (callback) {
    callPool[++id] = callback;
  }
  postMessage({
    type: 'measure',
    args: [
      {
        reactTag,
        callbackId: callback ? id : undefined,
      },
    ],
  });
}
