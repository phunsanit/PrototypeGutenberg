"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveFormat = getActiveFormat;

var _lodash = require("lodash");

var _getActiveFormats = require("./get-active-formats");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Gets the format object by type at the start of the selection. This can be
 * used to get e.g. the URL of a link format at the current selection, but also
 * to check if a format is active at the selection. Returns undefined if there
 * is no format at the selection.
 *
 * @param {Object} value      Value to inspect.
 * @param {string} formatType Format type to look for.
 *
 * @return {Object|undefined} Active format object of the specified type, or undefined.
 */
function getActiveFormat(value, formatType) {
  return (0, _lodash.find)((0, _getActiveFormats.getActiveFormats)(value), {
    type: formatType
  });
}
//# sourceMappingURL=get-active-format.js.map