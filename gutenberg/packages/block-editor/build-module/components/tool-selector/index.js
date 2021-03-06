import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Dropdown, Button, MenuItemsChoice, SVG, Path, NavigableMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';
var editIcon = createElement(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, createElement(Path, {
  d: "M20.1 5.1L16.9 2 6.2 12.7l-1.3 4.4 4.5-1.3L20.1 5.1zM4 20.8h8v-1.5H4v1.5z"
}));
var selectIcon = createElement(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, createElement(Path, {
  d: "M9.4 20.5L5.2 3.8l14.6 9-2 .3c-.2 0-.4.1-.7.1-.9.2-1.6.3-2.2.5-.8.3-1.4.5-1.8.8-.4.3-.8.8-1.3 1.5-.4.5-.8 1.2-1.2 2l-.3.6-.9 1.9zM7.6 7.1l2.4 9.3c.2-.4.5-.8.7-1.1.6-.8 1.1-1.4 1.6-1.8.5-.4 1.3-.8 2.2-1.1l1.2-.3-8.1-5z"
}));

function ToolSelector() {
  var isNavigationTool = useSelect(function (select) {
    return select('core/block-editor').isNavigationMode();
  }, []);

  var _useDispatch = useDispatch('core/block-editor'),
      setNavigationMode = _useDispatch.setNavigationMode;

  var isMediumViewport = useViewportMatch('medium');

  if (!isMediumViewport) {
    return null;
  }

  var onSwitchMode = function onSwitchMode(mode) {
    setNavigationMode(mode === 'edit' ? false : true);
  };

  return createElement(Dropdown, {
    renderToggle: function renderToggle(_ref) {
      var isOpen = _ref.isOpen,
          onToggle = _ref.onToggle;
      return createElement(Button, {
        icon: isNavigationTool ? selectIcon : editIcon,
        "aria-expanded": isOpen,
        onClick: onToggle,
        label: __('Tools')
      });
    },
    position: "bottom right",
    renderContent: function renderContent() {
      return createElement(Fragment, null, createElement(NavigableMenu, {
        role: "menu",
        "aria-label": __('Tools')
      }, createElement(MenuItemsChoice, {
        value: isNavigationTool ? 'select' : 'edit',
        onSelect: onSwitchMode,
        choices: [{
          value: 'edit',
          label: createElement(Fragment, null, editIcon, __('Edit'))
        }, {
          value: 'select',
          label: createElement(Fragment, null, selectIcon, __('Select'))
        }]
      })), createElement("div", {
        className: "block-editor-tool-selector__help"
      }, __('Tools offer different interactions for block selection & editing. To select, press Escape, to go back to editing, press Enter.')));
    }
  });
}

export default ToolSelector;
//# sourceMappingURL=index.js.map