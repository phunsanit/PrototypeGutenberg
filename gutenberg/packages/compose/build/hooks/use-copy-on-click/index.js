"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCopyOnClick;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _clipboard = _interopRequireDefault(require("clipboard"));

var _element = require("@wordpress/element");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Copies the text to the clipboard when the element is clicked.
 *
 * @param {Object}          ref     Reference with the element.
 * @param {string|Function} text    The text to copy.
 * @param {number}          timeout Optional timeout to reset the returned
 *                                  state. 4 seconds by default.
 *
 * @return {boolean} Whether or not the text has been copied. Resets after the
 *                   timeout.
 */
function useCopyOnClick(ref, _text) {
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;
  var clipboard = (0, _element.useRef)();

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hasCopied = _useState2[0],
      setHasCopied = _useState2[1];

  (0, _element.useEffect)(function () {
    var timeoutId; // Clipboard listens to click events.

    clipboard.current = new _clipboard.default(ref.current, {
      text: function text() {
        return typeof _text === 'function' ? _text() : _text;
      },
      container: ref.current
    });
    clipboard.current.on('success', function (_ref) {
      var clearSelection = _ref.clearSelection;
      // Clearing selection will move focus back to the triggering button,
      // ensuring that it is not reset to the body, and further that it is
      // kept within the rendered node.
      clearSelection();

      if (timeout) {
        setHasCopied(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          return setHasCopied(false);
        }, timeout);
      }
    });
    return function () {
      clipboard.current.destroy();
      clearTimeout(timeoutId);
    };
  }, [_text, timeout, setHasCopied]);
  return hasCopied;
}
//# sourceMappingURL=index.js.map