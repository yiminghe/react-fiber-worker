/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// Module provided by RN:
import UIManager from '../../UIManager';

const ReactNativeGlobalResponderHandler = {
  onChange: function(from: any, to: any, blockNativeResponder: boolean) {
    if (to !== null) {
      const tag = to.stateNode._nativeTag;
      UIManager.setJSResponder(tag, blockNativeResponder);
    } else {
      UIManager.clearJSResponder();
    }
  },
};

export default ReactNativeGlobalResponderHandler;
