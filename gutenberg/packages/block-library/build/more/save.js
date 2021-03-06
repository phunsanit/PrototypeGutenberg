"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = save;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function save(_ref) {
  var attributes = _ref.attributes;
  var customText = attributes.customText,
      noTeaser = attributes.noTeaser;
  var moreTag = customText ? "<!--more ".concat(customText, "-->") : '<!--more-->';
  var noTeaserTag = noTeaser ? '<!--noteaser-->' : '';
  return (0, _element.createElement)(_element.RawHTML, null, (0, _lodash.compact)([moreTag, noTeaserTag]).join('\n'));
}
//# sourceMappingURL=save.js.map