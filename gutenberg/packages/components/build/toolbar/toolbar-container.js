"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Toolbar = require("reakit/Toolbar");

var _toolbarContext = _interopRequireDefault(require("../toolbar-context"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ToolbarContainer(_ref, ref) {
  var accessibilityLabel = _ref.accessibilityLabel,
      props = (0, _objectWithoutProperties2.default)(_ref, ["accessibilityLabel"]);
  // https://reakit.io/docs/basic-concepts/#state-hooks
  // Passing baseId for server side rendering (which includes snapshots)
  // If an id prop is passed to Toolbar, toolbar items will use it as a base for their ids
  var toolbarState = (0, _Toolbar.useToolbarState)({
    loop: true,
    baseId: props.id
  });
  return (// This will provide state for `ToolbarButton`'s
    (0, _element.createElement)(_toolbarContext.default.Provider, {
      value: toolbarState
    }, (0, _element.createElement)(_Toolbar.Toolbar, (0, _extends2.default)({
      ref: ref,
      "aria-label": accessibilityLabel
    }, toolbarState, props)))
  );
}

var _default = (0, _element.forwardRef)(ToolbarContainer);

exports.default = _default;
//# sourceMappingURL=toolbar-container.js.map