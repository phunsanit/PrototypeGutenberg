import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { SVG, Path } from '@wordpress/components';

var NavigateUp = function NavigateUp(_ref) {
  var isRTL = _ref.isRTL;
  return createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(Path, {
    fill: "white",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M17,11  z L15.58,12.42 L12,8.83 L12,18 L22,18 L22,20 L10,20 L10,8.83 L6.42,12.42 L5,11 L11,5 L17,11",
    transform: isRTL ? 'scale(-1,1) translate(-24,0)' : undefined
  }));
};

export default NavigateUp;
//# sourceMappingURL=nav-up-icon.js.map