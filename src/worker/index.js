import AppRegistry from './AppRegistry';
import { callViewMethod, measure } from './bridge';
import ReactNativeRender from './react-native-render/';

const { findNodeHandle } = ReactNativeRender;

export { AppRegistry, findNodeHandle, callViewMethod, measure };
