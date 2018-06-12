import { viewRegistry } from './registry';

const tagMap = {
  view: 'div',
  text: 'span'
};

export function createView(tag, viewClass, rootTag, props) {
  let node;
  if (viewClass === 'rawText') {
    node = document.createTextNode(props.text);
  } else {
    node = document.createElement(tagMap[viewClass] || 'div');
    if (props) {
      Object.keys(props).forEach((k) => {
        node.setAttribute(k, props[k]);
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

export function setChildren(parentTag, tags) {
  const parent = viewRegistry[parentTag];
  const children = tags.map((t) => viewRegistry[t]);
  children.forEach((c) => {
    parent.appendChild(c);
  });
}
