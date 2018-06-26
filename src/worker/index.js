import AppRegistry from './AppRegistry';
import { callViewMethod } from './bridge';
import ReactNativeRender from './worker-render/';

const { findNodeHandle } = ReactNativeRender;

export { AppRegistry, findNodeHandle, callViewMethod };
