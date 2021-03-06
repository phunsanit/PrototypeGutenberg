import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Button, Dropdown, SVG, Path } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { useCallback } from '@wordpress/element';
/**
 * Internal dependencies
 */

import BlockNavigation from './';
var MenuIcon = createElement(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24"
}, createElement(Path, {
  d: "M13.8 5.2H3v1.5h10.8V5.2zm-3.6 12v1.5H21v-1.5H10.2zm7.2-6H6.6v1.5h10.8v-1.5z"
}));

function BlockNavigationDropdownToggle(_ref) {
  var isEnabled = _ref.isEnabled,
      onToggle = _ref.onToggle,
      isOpen = _ref.isOpen;
  useShortcut('core/edit-post/toggle-block-navigation', useCallback(onToggle, [onToggle]), {
    bindGlobal: true,
    isDisabled: !isEnabled
  });
  var shortcut = useSelect(function (select) {
    return select('core/keyboard-shortcuts').getShortcutRepresentation('core/edit-post/toggle-block-navigation');
  }, []);
  return createElement(Button, {
    icon: MenuIcon,
    "aria-expanded": isOpen,
    onClick: isEnabled ? onToggle : undefined,
    label: __('Block navigation'),
    className: "block-editor-block-navigation",
    shortcut: shortcut,
    "aria-disabled": !isEnabled
  });
}

function BlockNavigationDropdown(_ref2) {
  var isDisabled = _ref2.isDisabled,
      __experimentalWithBlockNavigationSlots = _ref2.__experimentalWithBlockNavigationSlots,
      __experimentalWithBlockNavigationBlockSettings = _ref2.__experimentalWithBlockNavigationBlockSettings;
  var hasBlocks = useSelect(function (select) {
    return !!select('core/block-editor').getBlockCount();
  }, []);
  var isEnabled = hasBlocks && !isDisabled;
  return createElement(Dropdown, {
    contentClassName: "block-editor-block-navigation__popover",
    position: "bottom right",
    renderToggle: function renderToggle(toggleProps) {
      return createElement(BlockNavigationDropdownToggle, _extends({}, toggleProps, {
        isEnabled: isEnabled
      }));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return createElement(BlockNavigation, {
        onSelect: onClose,
        __experimentalWithBlockNavigationSlots: __experimentalWithBlockNavigationSlots,
        __experimentalWithBlockNavigationBlockSettings: __experimentalWithBlockNavigationBlockSettings
      });
    }
  });
}

export default BlockNavigationDropdown;
//# sourceMappingURL=dropdown.js.map