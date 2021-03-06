/**
 * Internal dependencies
 */
import { LINE_SEPARATOR } from './special-characters';
/**
 * Gets the currently selected line index, or the first line index if the
 * selection spans over multiple items.
 *
 * @param {Object}  value      Value to get the line index from.
 * @param {boolean} startIndex Optional index that should be contained by the
 *                             line. Defaults to the selection start of the
 *                             value.
 *
 * @return {?boolean} The line index. Undefined if not found.
 */

export function getLineIndex(_ref) {
  var start = _ref.start,
      text = _ref.text;
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start;
  var index = startIndex;

  while (index--) {
    if (text[index] === LINE_SEPARATOR) {
      return index;
    }
  }
}
//# sourceMappingURL=get-line-index.js.map