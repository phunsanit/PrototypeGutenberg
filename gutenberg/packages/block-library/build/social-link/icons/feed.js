"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedIcon = void 0;

var _element = require("@wordpress/element");

var _primitives = require("@wordpress/primitives");

/**
 * WordPress dependencies
 */
var FeedIcon = function FeedIcon() {
  return (0, _element.createElement)(_primitives.SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    version: "1.1"
  }, (0, _element.createElement)(_primitives.Path, {
    d: "M2,8.667V12c5.515,0,10,4.485,10,10h3.333C15.333,14.637,9.363,8.667,2,8.667z M2,2v3.333 c9.19,0,16.667,7.477,16.667,16.667H22C22,10.955,13.045,2,2,2z M4.5,17C3.118,17,2,18.12,2,19.5S3.118,22,4.5,22S7,20.88,7,19.5 S5.882,17,4.5,17z"
  }));
};

exports.FeedIcon = FeedIcon;
//# sourceMappingURL=feed.js.map