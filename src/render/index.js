import { viewRegistry, rootViewRegistry } from './registry';
import * as dom from './dom';
import bindDOMEvent from './bindDOMEvent';

let globalRootTag = 1;
// maybe no need to check worker ready
let readied = true;
let bindDOM = false;

function onDOMMessage(bridge, event) {
  const { type, args = [] } = event.data;
  if (dom[type]) {
    dom[type](bridge, ...args);
  }
}

export function render({ bridge, appKey, rootView, initialProps }) {
  let rootTag = globalRootTag;
  globalRootTag += 10;
  rootViewRegistry[rootTag] = viewRegistry[rootTag] = rootView;
  rootView.__reactRootTag = rootTag;
  if (!bindDOM) {
    bindDOM = true;
    bindDOMEvent(bridge);
    bridge.addEventListener(
      'message',
      event => onDOMMessage(bridge, event),
      false,
    );
  }
  bridge.postMessage({
    type: 'mount',
    appKey,
    rootTag,
    initialProps,
  });
}
