"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _primitives = require("@wordpress/primitives");

/**
 * WordPress dependencies
 */
var chartBar = (0, _element.createElement)(_primitives.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0, _element.createElement)(_primitives.Path, {
  fillRule: "evenodd",
  d: "M11.25 5h1.5v15h-1.5V5zM6 10h1.5v10H6V10zm12 4h-1.5v6H18v-6z",
  clipRule: "evenodd"
}));
var _default = chartBar;
exports.default = _default;
//# sourceMappingURL=chart-bar.js.map