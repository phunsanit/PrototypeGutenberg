import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { useSelect } from 'downshift';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Icon, check, chevronDown } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import { Button, VisuallyHidden } from '../';

var itemToString = function itemToString(item) {
  return item && item.name;
}; // This is needed so that in Windows, where
// the menu does not necessarily open on
// key up/down, you can still switch between
// options with the menu closed.


var stateReducer = function stateReducer(_ref, _ref2) {
  var selectedItem = _ref.selectedItem;
  var type = _ref2.type,
      changes = _ref2.changes,
      items = _ref2.props.items;

  switch (type) {
    case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown:
      // If we already have a selected item, try to select the next one,
      // without circular navigation. Otherwise, select the first item.
      return {
        selectedItem: items[selectedItem ? Math.min(items.indexOf(selectedItem) + 1, items.length - 1) : 0]
      };

    case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp:
      // If we already have a selected item, try to select the previous one,
      // without circular navigation. Otherwise, select the last item.
      return {
        selectedItem: items[selectedItem ? Math.max(items.indexOf(selectedItem) - 1, 0) : items.length - 1]
      };

    default:
      return changes;
  }
};

export default function CustomSelectControl(_ref3) {
  var className = _ref3.className,
      hideLabelFromVision = _ref3.hideLabelFromVision,
      label = _ref3.label,
      items = _ref3.options,
      onSelectedItemChange = _ref3.onChange,
      _selectedItem = _ref3.value;

  var _useSelect = useSelect({
    initialSelectedItem: items[0],
    items: items,
    itemToString: itemToString,
    onSelectedItemChange: onSelectedItemChange,
    selectedItem: _selectedItem,
    stateReducer: stateReducer
  }),
      getLabelProps = _useSelect.getLabelProps,
      getToggleButtonProps = _useSelect.getToggleButtonProps,
      getMenuProps = _useSelect.getMenuProps,
      getItemProps = _useSelect.getItemProps,
      isOpen = _useSelect.isOpen,
      highlightedIndex = _useSelect.highlightedIndex,
      selectedItem = _useSelect.selectedItem;

  var menuProps = getMenuProps({
    className: 'components-custom-select-control__menu',
    'aria-hidden': !isOpen
  }); // We need this here, because the null active descendant is not
  // fully ARIA compliant.

  if (menuProps['aria-activedescendant'] && menuProps['aria-activedescendant'].slice(0, 'downshift-null'.length) === 'downshift-null') {
    delete menuProps['aria-activedescendant'];
  }

  return createElement("div", {
    className: classnames('components-custom-select-control', className)
  }, hideLabelFromVision ? createElement(VisuallyHidden, _extends({
    as: "label"
  }, getLabelProps()), label) :
  /* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
  createElement("label", getLabelProps({
    className: 'components-custom-select-control__label'
  }), label), createElement(Button, getToggleButtonProps({
    // This is needed because some speech recognition software don't support `aria-labelledby`.
    'aria-label': label,
    'aria-labelledby': undefined,
    className: 'components-custom-select-control__button',
    isSmall: true
  }), itemToString(selectedItem), createElement(Icon, {
    icon: chevronDown,
    className: "components-custom-select-control__button-icon"
  })), createElement("ul", menuProps, isOpen && items.map(function (item, index) {
    return (// eslint-disable-next-line react/jsx-key
      createElement("li", getItemProps({
        item: item,
        index: index,
        key: item.key,
        className: classnames('components-custom-select-control__item', {
          'is-highlighted': index === highlightedIndex
        }),
        style: item.style
      }), item === selectedItem && createElement(Icon, {
        icon: check,
        className: "components-custom-select-control__item-icon"
      }), item.name)
    );
  })));
}
//# sourceMappingURL=index.js.map