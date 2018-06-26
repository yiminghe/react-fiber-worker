function toTouchObject(touch) {
  return {
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY
  };
}

const map = [].map;

export default function bindDOMEvent(bridge) {
  document.addEventListener("touchstart", e => {
    const { target } = e;
    const touches = map.call(e.touches, toTouchObject);
    touches.forEach(t => {
      t.target = target.reactTag;
      t.timeStamp = e.timeStamp;
    });
    const changedIndices = touches.map((t, i) => i);
    bridge.postMessage({
      type: "touchEvent",
      eventTopLevelType: "topTouchStart",
      changedIndices,
      touches
    });
  });

  document.addEventListener("click", e => {
    const { target } = e;
    bridge.postMessage({
      type: "clickEvent",
      e: {
        target: target.reactTag,
        pageX: e.pageX,
        pageY: e.pageY
      }
    });
  });
}
