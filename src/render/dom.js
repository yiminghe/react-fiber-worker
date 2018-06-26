import { viewRegistry } from './registry';

const tagMap = {
  view: 'div',
  text: 'span',
};

function toStyleString(o) {
  let s = '';
  Object.keys(o).forEach(k_ => {
    const k = k_.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
    s += `${k}:${o[k_]};`;
  });
  return s;
}

export function createView(bridge, tag, viewClass, rootTag, props) {
  let node;
  if (viewClass === 'rawText') {
    node = document.createTextNode(props.text);
  } else {
    node = document.createElement(tagMap[viewClass] || viewClass);
    if (props) {
      Object.keys(props).forEach(k => {
        let value = props[k];
        if (!value) {
          node.removeAttribute(k);
          return;
        }
        if (k === 'style') {
          value = toStyleString(value);
        }
        node.setAttribute(k, value);
      });
    }
  }
  // for test
  if (node.setAttribute) {
    node.setAttribute('data-reactTag', tag);
  }
  node.reactTag = tag;
  viewRegistry[tag] = node;
}

export function setChildren(bridge, parentTag, tags) {
  const parent = viewRegistry[parentTag];
  const children = tags.map(t => viewRegistry[t]);
  children.forEach(c => {
    parent.appendChild(c);
  });
}

export function updateView(bridge, tag, viewClass, props) {
  let node = viewRegistry[tag];
  if (viewClass === 'rawText') {
    node.nodeValue = props.text;
  } else {
    if (props) {
      Object.keys(props).forEach(k => {
        let value = props[k];
        if (!value) {
          node.removeAttribute(k);
          return;
        }
        if (k === 'style') {
          value = toStyleString(value);
        }
        node.setAttribute(k, value);
      });
    }
  }
}

export function manageChildren(
  bridge,
  containerTag,
  moveFromIndices,
  moveToIndices,
  addChildReactTags,
  addAtIndices,
  removeAtIndices,
) {
  const container = viewRegistry[containerTag];
  const childNodes = container.childNodes;
  if (moveFromIndices.length) {
    const from = childNodes[moveFromIndices[0]];
    const dest = childNodes[moveToIndices[0] + 1];
    if (dest) {
      container.insertBefore(from, dest);
    } else {
      container.appendChild(from);
    }
  } else if (addChildReactTags.length) {
    const newNode = viewRegistry[addChildReactTags[0]];
    const dest = childNodes[addAtIndices[0]];
    if (dest) {
      container.insertBefore(newNode, dest);
    } else {
      container.appendChild(newNode);
    }
  } else if (removeAtIndices.length) {
    const removeNode = childNodes[removeAtIndices[0]];
    if (removeNode) {
      container.removeChild(removeNode);
    }
  }
}

function noop() {}

function generateResponseFn(bridge, id) {
  return id
    ? response => {
        bridge.postMessage({
          type: 'callViewMethodResponse',
          response,
        });
      }
    : noop;
}

export function callViewMethod(
  bridge,
  { reactTag, method, args = [], callbackId },
) {
  let callback = generateResponseFn(bridge, callbackId);
  const newArgs = [callback, ...args];
  const node = viewRegistry[reactTag];
  if (node) {
    if (node[method]) {
      node[method](...newArgs);
    } else {
      const error = `${reactTag}:${method} not found!`;
      console.error(error);
      callback({
        error,
      });
    }
  } else {
    const error = `${reactTag} not found!`;
    console.error(error);
    callback({
      error,
    });
  }
}
