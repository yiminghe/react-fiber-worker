import { END_FLAG } from '../shared/constants';
import { viewRegistry, rootViewRegistry } from './registry';
import * as dom from './dom';

let globalRootTag = 1;
// maybe no need to check worker ready
let readied = true;
let bindDOM = false;

function onDOMMessage(event) {
  const { type, args } = event.data;
  if (dom[type]) {
    dom[type](...args);
  }
}

export function render({ bridge, appKey, rootView, initialProps }) {
  let rootTag = globalRootTag;
  globalRootTag += 10;
  rootViewRegistry[rootTag] = viewRegistry[rootTag] = rootView;
  rootView.__reactRootTag = rootTag;

  function doIt() {
    if (!bindDOM) {
      bindDOM = true;
      bridge.addEventListener('message', onDOMMessage, false);
    }
    bridge.postMessage({
      type: 'mount',
      appKey,
      rootTag,
      initialProps,
    });
  }

  function ready(e) {
    if (e.data === END_FLAG) {
      readied = true;
      bridge.removeEventListener('message', ready, false);
      doIt();
    }
  }

  if (readied) {
    doIt();
  } else {
    bridge.addEventListener('message', ready, false);
  }
}
