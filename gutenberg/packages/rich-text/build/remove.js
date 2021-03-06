"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = remove;

var _insert = require("./insert");

var _create = require("./create");

/**
 * Internal dependencies
 */

/**
 * Remove content from a Rich Text value between the given `startIndex` and
 * `endIndex`. Indices are retrieved from the selection if none are provided.
 *
 * @param {Object} value        Value to modify.
 * @param {number} [startIndex] Start index.
 * @param {number} [endIndex]   End index.
 *
 * @return {Object} A new value with the content removed.
 */
function remove(value, startIndex, endIndex) {
  return (0, _insert.insert)(value, (0, _create.create)(), startIndex, endIndex);
}
//# sourceMappingURL=remove.js.map