import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(autosave);

/**
 * External dependencies
 */
import RNReactNativeGutenbergBridge from 'react-native-gutenberg-bridge';
export * from './actions.js';
/**
 * Returns an action object that enables or disables post title selection.
 *
 * @param {boolean} [isSelected=true] Whether post title is currently selected.
 *
 * @return {Object} Action object.
 */

export function togglePostTitleSelection() {
  var isSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    type: 'TOGGLE_POST_TITLE_SELECTION',
    isSelected: isSelected
  };
}
/**
 * Action generator used in signalling that the post should autosave.
 */

export function autosave() {
  return _regeneratorRuntime.wrap(function autosave$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          RNReactNativeGutenbergBridge.editorDidAutosave();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
//# sourceMappingURL=actions.native.js.map