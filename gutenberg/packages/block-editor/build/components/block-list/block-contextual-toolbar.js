"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _i18n = require("@wordpress/i18n");

var _navigableToolbar = _interopRequireDefault(require("../navigable-toolbar"));

var _ = require("../");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockContextualToolbar(_ref) {
  var focusOnMount = _ref.focusOnMount,
      props = (0, _objectWithoutProperties2.default)(_ref, ["focusOnMount"]);
  return (0, _element.createElement)("div", {
    className: "block-editor-block-contextual-toolbar-wrapper"
  }, (0, _element.createElement)(_navigableToolbar.default, (0, _extends2.default)({
    focusOnMount: focusOnMount,
    className: "block-editor-block-contextual-toolbar"
    /* translators: accessibility text for the block toolbar */
    ,
    "aria-label": (0, _i18n.__)('Block tools')
  }, props), (0, _element.createElement)(_.BlockToolbar, null)));
}

var _default = BlockContextualToolbar;
exports.default = _default;
//# sourceMappingURL=block-contextual-toolbar.js.map