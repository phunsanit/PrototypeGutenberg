"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = MenuItem;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _shortcut = _interopRequireDefault(require("../shortcut"));

var _button = _interopRequireDefault(require("../button"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Renders a generic menu item for use inside the more menu.
 *
 * @param {Object} ref Ref
 *
 * @return {WPComponent} The component to be rendered.
 */
function MenuItem(_ref, ref) {
  var children = _ref.children,
      info = _ref.info,
      className = _ref.className,
      icon = _ref.icon,
      shortcut = _ref.shortcut,
      isSelected = _ref.isSelected,
      _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'menuitem' : _ref$role,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children", "info", "className", "icon", "shortcut", "isSelected", "role"]);
  className = (0, _classnames.default)('components-menu-item__button', className);

  if (info) {
    children = (0, _element.createElement)("span", {
      className: "components-menu-item__info-wrapper"
    }, children, (0, _element.createElement)("span", {
      className: "components-menu-item__info"
    }, info));
  }

  if (icon && !(0, _lodash.isString)(icon)) {
    icon = (0, _element.cloneElement)(icon, {
      className: 'components-menu-items__item-icon'
    });
  }

  return (0, _element.createElement)(_button.default, (0, _extends2.default)({
    ref: ref,
    icon: icon // Make sure aria-checked matches spec https://www.w3.org/TR/wai-aria-1.1/#aria-checked
    ,
    "aria-checked": role === 'menuitemcheckbox' || role === 'menuitemradio' ? isSelected : undefined,
    role: role,
    className: className
  }, props), children, (0, _element.createElement)(_shortcut.default, {
    className: "components-menu-item__shortcut",
    shortcut: shortcut
  }));
}

var _default = (0, _element.forwardRef)(MenuItem);

exports.default = _default;
//# sourceMappingURL=index.js.map