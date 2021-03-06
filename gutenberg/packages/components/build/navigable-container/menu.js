"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigableMenu = NavigableMenu;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _keycodes = require("@wordpress/keycodes");

var _container = _interopRequireDefault(require("./container"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function NavigableMenu(_ref, ref) {
  var _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'menu' : _ref$role,
      _ref$orientation = _ref.orientation,
      orientation = _ref$orientation === void 0 ? 'vertical' : _ref$orientation,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["role", "orientation"]);

  var eventToOffset = function eventToOffset(evt) {
    var keyCode = evt.keyCode;
    var next = [_keycodes.DOWN];
    var previous = [_keycodes.UP];

    if (orientation === 'horizontal') {
      next = [_keycodes.RIGHT];
      previous = [_keycodes.LEFT];
    }

    if (orientation === 'both') {
      next = [_keycodes.RIGHT, _keycodes.DOWN];
      previous = [_keycodes.LEFT, _keycodes.UP];
    }

    if ((0, _lodash.includes)(next, keyCode)) {
      return 1;
    } else if ((0, _lodash.includes)(previous, keyCode)) {
      return -1;
    }
  };

  return (0, _element.createElement)(_container.default, (0, _extends2.default)({
    ref: ref,
    stopNavigationEvents: true,
    onlyBrowserTabstops: false,
    role: role,
    "aria-orientation": role === 'presentation' ? null : orientation,
    eventToOffset: eventToOffset
  }, rest));
}

var _default = (0, _element.forwardRef)(NavigableMenu);

exports.default = _default;
//# sourceMappingURL=menu.js.map