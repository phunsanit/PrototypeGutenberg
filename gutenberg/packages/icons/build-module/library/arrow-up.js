import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { SVG, Path } from '@wordpress/primitives';
var arrowUp = createElement(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-2 -2 24 24"
}, createElement(Path, {
  d: "M11 18H9V6l-4 4-2-1 7-7 7 7-2 1-4-4v12z"
}));
export default arrowUp;
//# sourceMappingURL=arrow-up.js.map