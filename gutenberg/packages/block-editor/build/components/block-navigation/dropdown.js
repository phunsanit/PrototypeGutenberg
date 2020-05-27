"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

var _ = _interopRequireDefault(require("./"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MenuIcon = (0, _element.createElement)(_components.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24"
}, (0, _element.createElement)(_components.Path, {
  d: "M13.8 5.2H3v1.5h10.8V5.2zm-3.6 12v1.5H21v-1.5H10.2zm7.2-6H6.6v1.5h10.8v-1.5z"
}));

function BlockNavigationDropdownToggle(_ref) {
  var isEnabled = _ref.isEnabled,
      onToggle = _ref.onToggle,
      isOpen = _ref.isOpen;
  (0, _keyboardShortcuts.useShortcut)('core/edit-post/toggle-block-navigation', (0, _element.useCallback)(onToggle, [onToggle]), {
    bindGlobal: true,
    isDisabled: !isEnabled
  });
  var shortcut = (0, _data.useSelect)(function (select) {
    return select('core/keyboard-shortcuts').getShortcutRepresentation('core/edit-post/toggle-block-navigation');
  }, []);
  return (0, _element.createElement)(_components.Button, {
    icon: MenuIcon,
    "aria-expanded": isOpen,
    onClick: isEnabled ? onToggle : undefined,
    label: (0, _i18n.__)('Block navigation'),
    className: "block-editor-block-navigation",
    shortcut: shortcut,
    "aria-disabled": !isEnabled
  });
}

function BlockNavigationDropdown(_ref2) {
  var isDisabled = _ref2.isDisabled,
      __experimentalWithBlockNavigationSlots = _ref2.__experimentalWithBlockNavigationSlots,
      __experimentalWithBlockNavigationBlockSettings = _ref2.__experimentalWithBlockNavigationBlockSettings;
  var hasBlocks = (0, _data.useSelect)(function (select) {
    return !!select('core/block-editor').getBlockCount();
  }, []);
  var isEnabled = hasBlocks && !isDisabled;
  return (0, _element.createElement)(_components.Dropdown, {
    contentClassName: "block-editor-block-navigation__popover",
    position: "bottom right",
    renderToggle: function renderToggle(toggleProps) {
      return (0, _element.createElement)(BlockNavigationDropdownToggle, (0, _extends2.default)({}, toggleProps, {
        isEnabled: isEnabled
      }));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return (0, _element.createElement)(_.default, {
        onSelect: onClose,
        __experimentalWithBlockNavigationSlots: __experimentalWithBlockNavigationSlots,
        __experimentalWithBlockNavigationBlockSettings: __experimentalWithBlockNavigationBlockSettings
      });
    }
  });
}

var _default = BlockNavigationDropdown;
exports.default = _default;
//# sourceMappingURL=dropdown.js.map