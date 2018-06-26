export function get(type) {
  if (type === "view") {
    return {
      validAttributes: {
        style: 1,
        className: 1
      },
      uiViewClassName: type
    };
  }
}

export const eventTypes = [];

export const customDirectEventTypes = [];

export const customBubblingEventTypes = {
  topTouchStart: {
    phasedRegistrationNames: {
      bubbled: "onTouchStart",
      captured: "onTouchStartCapture"
    }
  },
  topClick: {
    phasedRegistrationNames: {
      bubbled: "onClick",
      captured: "onClickCapture"
    }
  }
};
