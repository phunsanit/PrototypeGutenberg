"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blockEditor = require("@wordpress/block-editor");

var _containerNative = _interopRequireDefault(require("./container.native.scss"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BottomSheetSettings(_ref) {
  var editorSidebarOpened = _ref.editorSidebarOpened,
      closeGeneralSidebar = _ref.closeGeneralSidebar,
      props = (0, _objectWithoutProperties2.default)(_ref, ["editorSidebarOpened", "closeGeneralSidebar"]);
  return (0, _element.createElement)(_components.BottomSheet, (0, _extends2.default)({
    isVisible: editorSidebarOpened,
    onClose: closeGeneralSidebar,
    hideHeader: true,
    contentStyle: _containerNative.default.content
  }, props), (0, _element.createElement)(_components.BottomSheetConsumer, null, function (_ref2) {
    var currentScreen = _ref2.currentScreen,
        extraProps = _ref2.extraProps,
        bottomSheetProps = (0, _objectWithoutProperties2.default)(_ref2, ["currentScreen", "extraProps"]);

    switch (currentScreen) {
      case _components.colorsUtils.subsheets.color:
        return (0, _element.createElement)(_components.ColorSettings, (0, _extends2.default)({
          defaultSettings: _blockEditor.SETTINGS_DEFAULTS
        }, bottomSheetProps, extraProps));

      case _components.colorsUtils.subsheets.settings:
      default:
        return (0, _element.createElement)(_blockEditor.InspectorControls.Slot, null);
    }
  }));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/edit-post'),
      isEditorSidebarOpened = _select.isEditorSidebarOpened;

  return {
    editorSidebarOpened: isEditorSidebarOpened()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      closeGeneralSidebar = _dispatch.closeGeneralSidebar;

  return {
    closeGeneralSidebar: closeGeneralSidebar
  };
})])(BottomSheetSettings);

exports.default = _default;
//# sourceMappingURL=container.native.js.map