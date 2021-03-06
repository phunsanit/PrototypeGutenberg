"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isActiveListType = isActiveListType;

var _getLineIndex = require("./get-line-index");

/**
 * Internal dependencies
 */

/**
 * Wether or not the selected list has the given tag name.
 *
 * @param {Object}  value    The value to check.
 * @param {string}  type     The tag name the list should have.
 * @param {string}  rootType The current root tag name, to compare with in case
 *                           nothing is selected.
 *
 * @return {boolean} True if the current list type matches `type`, false if not.
 */
function isActiveListType(value, type, rootType) {
  var replacements = value.replacements,
      start = value.start;
  var lineIndex = (0, _getLineIndex.getLineIndex)(value, start);
  var replacement = replacements[lineIndex];

  if (!replacement || replacement.length === 0) {
    return type === rootType;
  }

  var lastFormat = replacement[replacement.length - 1];
  return lastFormat.type === type;
}
//# sourceMappingURL=is-active-list-type.js.map