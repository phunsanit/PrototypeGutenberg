import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/primitives';
export var FlickrIcon = function FlickrIcon() {
  return createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    version: "1.1"
  }, createElement(Path, {
    d: "M6.5,7c-2.75,0-5,2.25-5,5s2.25,5,5,5s5-2.25,5-5S9.25,7,6.5,7z M17.5,7c-2.75,0-5,2.25-5,5s2.25,5,5,5s5-2.25,5-5 S20.25,7,17.5,7z"
  }));
};
//# sourceMappingURL=flickr.js.map