import React from 'react';
import {
  AppRegistry,
  callViewMethod,
  findNodeHandle,
  measure,
} from '../src/worker';
import createClass from 'create-react-class';

const Simple = createClass({
  getInitialState() {
    return {
      workerTime: new Date().toString(),
    };
  },
  onTouchStart(e) {
    console.log('receive onTouchStart', e.nativeEvent, e.currentTarget);
  },
  focus() {
    callViewMethod(this.inputHandle, {
      method: 'focus',
    });
  },
  measure() {
    measure(this.inputHandle, rect => {
      console.log('input rect', rect);
    });
  },
  onInnerClick(e) {
    this.onClick(e);
    this.setState({
      workerTime: new Date().toString(),
    });
  },
  onClick(e) {
    console.log('receive onClick', e.nativeEvent, e.currentTarget);
  },
  saveInput(input) {
    this.inputHandle = findNodeHandle(input);
  },
  render() {
    const views = [];
    const workerTime = (
      <view key="worker">worker time: {this.state.workerTime}</view>
    );
    const webviewTime = (
      <view key="webview">webview time: {this.props.time}</view>
    );
    const r = Math.random();
    let style;
    if (r > 0.5) {
      views.push(<view key="start">start</view>);
      views.push(workerTime, webviewTime);
      style = {
        color: 'red',
      };
    } else {
      style = {
        color: 'green',
        fontWeight: 'bold',
      };
      views.push(webviewTime, workerTime);
    }
    if (r > 0.7) {
      style = undefined;
    }
    const styleObj = {};
    if (style) {
      styleObj.style = style;
    }
    return (
      <view
        {...styleObj}
        onClick={this.onClick}
        onTouchStart={this.onTouchStart}
      >
        <button onClick={this.onInnerClick}>rerender</button>
        <button onClick={this.focus}>focus</button>
        <button onClick={this.measure}>measure</button>
        <view>
          <input ref={this.saveInput} />
        </view>
        <view>{views}</view>
      </view>
    );
  },
});

AppRegistry.registerComponent('simple', () => Simple);
