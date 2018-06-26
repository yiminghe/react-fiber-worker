import React from "react";
import createClass from "create-react-class";
import Worker from "worker-loader!./simple.worker";
import { render } from "../src/render";
import ReactDOM from "react-dom";

const Simple = createClass({
  componentDidMount() {
    const worker = new Worker();
    this.root = ReactDOM.findDOMNode(this);
    const self = this;
    const div = document.createElement("div");
    self.root.appendChild(div);

    render({
      rootView: div,
      bridge: worker,
      appKey: "simple",
      initialProps: {
        time: new Date().toString()
      }
    });
  },

  render() {
    return <div />;
  }
});

export default Simple;
