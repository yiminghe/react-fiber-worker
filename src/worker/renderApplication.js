/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import AppContainer from './AppContainer';
import React from 'react';
import ReactNative from './react-native-renderer/';
import invariant from 'fbjs/lib/invariant';

export default function renderApplication(
  RootComponent,
  initialProps,
  rootTag,
  WrapperComponent,
) {
  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  let renderable = (
    <AppContainer rootTag={rootTag} WrapperComponent={WrapperComponent}>
      <RootComponent {...initialProps} rootTag={rootTag} />
    </AppContainer>
  );

  ReactNative.render(renderable, rootTag);
}
