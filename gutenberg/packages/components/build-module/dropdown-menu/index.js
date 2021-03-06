import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import classnames from 'classnames';
import { flatMap, isEmpty, isFunction } from 'lodash';
/**
 * WordPress dependencies
 */

import { DOWN } from '@wordpress/keycodes';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */

import Button from '../button';
import Dropdown from '../dropdown';
import { NavigableMenu } from '../navigable-container';

function mergeProps() {
  var defaultProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var mergedProps = _objectSpread({}, defaultProps, {}, props);

  if (props.className && defaultProps.className) {
    mergedProps.className = classnames(props.className, defaultProps.className);
  }

  return mergedProps;
}

function DropdownMenu(_ref) {
  var children = _ref.children,
      className = _ref.className,
      controls = _ref.controls,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? 'menu' : _ref$icon,
      label = _ref.label,
      popoverProps = _ref.popoverProps,
      toggleProps = _ref.toggleProps,
      menuProps = _ref.menuProps,
      menuLabel = _ref.menuLabel,
      position = _ref.position,
      noIcons = _ref.noIcons;

  if (menuLabel) {
    deprecated('`menuLabel` prop in `DropdownComponent`', {
      alternative: '`menuProps` object and its `aria-label` property',
      plugin: 'Gutenberg'
    });
  }

  if (position) {
    deprecated('`position` prop in `DropdownComponent`', {
      alternative: '`popoverProps` object and its `position` property',
      plugin: 'Gutenberg'
    });
  }

  if (isEmpty(controls) && !isFunction(children)) {
    return null;
  } // Normalize controls to nested array of objects (sets of controls)


  var controlSets;

  if (!isEmpty(controls)) {
    controlSets = controls;

    if (!Array.isArray(controlSets[0])) {
      controlSets = [controlSets];
    }
  }

  var mergedPopoverProps = mergeProps({
    className: 'components-dropdown-menu__popover',
    position: position
  }, popoverProps);
  return createElement(Dropdown, {
    className: classnames('components-dropdown-menu', className),
    popoverProps: mergedPopoverProps,
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;

      var openOnArrowDown = function openOnArrowDown(event) {
        if (!isOpen && event.keyCode === DOWN) {
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        }
      };

      var mergedToggleProps = mergeProps({
        className: classnames('components-dropdown-menu__toggle', {
          'is-opened': isOpen
        })
      }, toggleProps);
      return createElement(Button, _extends({}, mergedToggleProps, {
        icon: icon,
        onClick: function onClick(event) {
          onToggle(event);

          if (mergedToggleProps.onClick) {
            mergedToggleProps.onClick(event);
          }
        },
        onKeyDown: function onKeyDown(event) {
          openOnArrowDown(event);

          if (mergedToggleProps.onKeyDown) {
            mergedToggleProps.onKeyDown(event);
          }
        },
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        label: label,
        showTooltip: true
      }), mergedToggleProps.children);
    },
    renderContent: function renderContent(props) {
      var mergedMenuProps = mergeProps({
        'aria-label': menuLabel || label,
        className: classnames('components-dropdown-menu__menu', {
          'no-icons': noIcons
        })
      }, menuProps);
      return createElement(NavigableMenu, _extends({}, mergedMenuProps, {
        role: "menu"
      }), isFunction(children) ? children(props) : null, flatMap(controlSets, function (controlSet, indexOfSet) {
        return controlSet.map(function (control, indexOfControl) {
          return createElement(Button, {
            key: [indexOfSet, indexOfControl].join(),
            onClick: function onClick(event) {
              event.stopPropagation();
              props.onClose();

              if (control.onClick) {
                control.onClick();
              }
            },
            className: classnames('components-dropdown-menu__menu-item', {
              'has-separator': indexOfSet > 0 && indexOfControl === 0,
              'is-active': control.isActive
            }),
            icon: control.icon,
            "aria-checked": control.role === 'menuitemcheckbox' || control.role === 'menuitemradio' ? control.isActive : undefined,
            role: control.role === 'menuitemcheckbox' || control.role === 'menuitemradio' ? control.role : 'menuitem',
            disabled: control.isDisabled
          }, control.title);
        });
      }));
    }
  });
}

export default DropdownMenu;
//# sourceMappingURL=index.js.map