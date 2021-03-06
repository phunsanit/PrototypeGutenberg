/**
 * Internal dependencies
 */
import { getTextContent } from './get-text-content';
import { insert } from './insert';
import { LINE_SEPARATOR } from './special-characters';
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

export function insertLineSeparator(value) {
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : value.start;
  var endIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : value.end;
  var beforeText = getTextContent(value).slice(0, startIndex);
  var previousLineSeparatorIndex = beforeText.lastIndexOf(LINE_SEPARATOR);
  var previousLineSeparatorFormats = value.replacements[previousLineSeparatorIndex];
  var replacements = [,];

  if (previousLineSeparatorFormats) {
    replacements = [previousLineSeparatorFormats];
  }

  var valueToInsert = {
    formats: [,],
    replacements: replacements,
    text: LINE_SEPARATOR
  };
  return insert(value, valueToInsert, startIndex, endIndex);
}
//# sourceMappingURL=insert-line-separator.js.map