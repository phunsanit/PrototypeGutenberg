"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertLineSeparator = insertLineSeparator;

var _getTextContent = require("./get-text-content");

var _insert = require("./insert");

var _specialCharacters = require("./special-characters");

/**
 * Internal dependencies
 */

/**
 * Insert a line break character into a Rich Text value at the given
 * `startIndex`. Any content between `startIndex` and `endIndex` will be
 * removed. Indices are retrieved from the selection if none are provided.
 *
 * @param {Object} value        Value to modify.
 * @param {number} [startIndex] Start index.
 * @param {number} [endIndex]   End index.
 *
 * @return {Object} A new value with the value inserted.
 */
function insertLineSeparator(value) {
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : value.start;
  var endIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : value.end;
  var beforeText = (0, _getTextContent.getTextContent)(value).slice(0, startIndex);
  var previousLineSeparatorIndex = beforeText.lastIndexOf(_specialCharacters.LINE_SEPARATOR);
  var previousLineSeparatorFormats = value.replacements[previousLineSeparatorIndex];
  var replacements = [,];

  if (previousLineSeparatorFormats) {
    replacements = [previousLineSeparatorFormats];
  }

  var valueToInsert = {
    formats: [,],
    replacements: replacements,
    text: _specialCharacters.LINE_SEPARATOR
  };
  return (0, _insert.insert)(value, valueToInsert, startIndex, endIndex);
}
//# sourceMappingURL=insert-line-separator.js.map