"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _button = _interopRequireDefault(require("../button"));

var _toolbarItem = _interopRequireDefault(require("../toolbar-item"));

var _toolbarContext = _interopRequireDefault(require("../toolbar-context"));

var _toolbarButtonContainer = _interopRequireDefault(require("./toolbar-button-container"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ToolbarButton(_ref) {
  var containerClassName = _ref.containerClassName,
      className = _ref.className,
      extraProps = _ref.extraProps,
      children = _ref.children,
      title = _ref.title,
      isActive = _ref.isActive,
      isDisabled = _ref.isDisabled,
      props = (0, _objectWithoutProperties2.default)(_ref, ["containerClassName", "className", "extraProps", "children", "title", "isActive", "isDisabled"]);
  var accessibleToolbarState = (0, _element.useContext)(_toolbarContext.default);

  if (!accessibleToolbarState) {
    // This should be deprecated when <Toolbar __experimentalAccessibilityLabel="label">
    // becomes stable.
    return (0, _element.createElement)(_toolbarButtonContainer.default, {
      className: containerClassName
    }, (0, _element.createElement)(_button.default, (0, _extends2.default)({
      icon: props.icon,
      label: title,
      shortcut: props.shortcut,
      "data-subscript": props.subscript,
      onClick: function onClick(event) {
        event.stopPropagation();

        if (props.onClick) {
          props.onClick(event);
        }
      },
      className: (0, _classnames.default)('components-toolbar__control', className),
      isPressed: isActive,
      disabled: isDisabled,
      "data-experimental-toolbar-item": true
    }, extraProps), children));
  } // ToobarItem will pass all props to the render prop child, which will pass
  // all props to Button. This means that ToolbarButton has the same API as
  // Button.


  return (0, _element.createElement)(_toolbarItem.default, (0, _extends2.default)({
    className: (0, _classnames.default)('components-toolbar-button', className)
  }, props), function (toolbarItemProps) {
    return (0, _element.createElement)(_button.default, (0, _extends2.default)({
      label: title,
      isPressed: isActive,
      disabled: isDisabled
    }, toolbarItemProps), children);
  });
}

var _default = ToolbarButton;
exports.default = _default;
//# sourceMappingURL=index.js.map