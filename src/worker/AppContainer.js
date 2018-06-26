/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import React from "react";
import PropTypes from "prop-types";

class AppContainer extends React.Component<Props, State> {
  static childContextTypes = {
    rootTag: PropTypes.number
  };

  getChildContext() {
    return {
      rootTag: this.props.rootTag
    };
  }

  render() {
    return this.props.children;
  }
}

export default AppContainer;
