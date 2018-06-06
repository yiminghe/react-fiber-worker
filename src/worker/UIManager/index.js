export default {
  createView(...args) {
    console.log('UIManager createView', args);
    postMessage({
      type: 'createView',
      args,
    });
  },
  setChildren(...args) {
    console.log('UIManager setChildren', args);
    postMessage({
      type: 'setChildren',
      args,
    });
  },
  manageChildren(...args) {
    console.log('UIManager manageChildren', args);
    postMessage({
      type: 'manageChildren',
      args,
    });
  },
  updateView(...args) {
    console.log('UIManager updateView', args);
    postMessage({
      type: 'updateView',
      args,
    });
  },
};
