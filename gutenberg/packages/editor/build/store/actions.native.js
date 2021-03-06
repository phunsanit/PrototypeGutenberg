"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  togglePostTitleSelection: true,
  autosave: true
};
exports.togglePostTitleSelection = togglePostTitleSelection;
exports.autosave = autosave;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _reactNativeGutenbergBridge = _interopRequireDefault(require("react-native-gutenberg-bridge"));

var _actions = require("./actions.js");

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

var _marked = /*#__PURE__*/_regenerator.default.mark(autosave);

/**
 * Returns an action object that enables or disables post title selection.
 *
 * @param {boolean} [isSelected=true] Whether post title is currently selected.
 *
 * @return {Object} Action object.
 */
function togglePostTitleSelection() {
  var isSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    type: 'TOGGLE_POST_TITLE_SELECTION',
    isSelected: isSelected
  };
}
/**
 * Action generator used in signalling that the post should autosave.
 */


function autosave() {
  return _regenerator.default.wrap(function autosave$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _reactNativeGutenbergBridge.default.editorDidAutosave();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
//# sourceMappingURL=actions.native.js.map