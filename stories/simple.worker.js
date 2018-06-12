import React from 'react';
import { AppRegistry } from '../src/worker';
import createClass from 'create-react-class';


const Simple = createClass({
  onTouchStart(e) {
    console.log('receive onTouchStart', e.nativeEvent, e.currentTarget);
  },
  onClick(e) {
    console.log('receive onClick', e.nativeEvent, e.currentTarget);
  },
  render() {
    return (
      <view onClick={this.onClick}>
        <view onTouchStart={this.onTouchStart} onClick={this.onClick}>click me</view>
        <view>
          worker receive time from webview: {this.props.time}
        </view>
      </view>
    );
  }
});

AppRegistry.registerComponent('simple', () => Simple);
