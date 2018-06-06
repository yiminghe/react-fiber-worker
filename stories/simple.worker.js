import React from 'react';
import { AppRegistry } from '../src/worker';
import createClass from 'create-react-class';


const Simple = createClass({
  render() {
    return (<view>worker receive time from webview: {this.props.time}</view>);
  }
});

AppRegistry.registerComponent('simple', () => Simple);
