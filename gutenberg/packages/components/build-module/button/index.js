import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isArray } from 'lodash';
/**
 * WordPress dependencies
 */

import deprecated from '@wordpress/deprecated';
import { forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Tooltip from '../tooltip';
import Icon from '../icon';
var disabledEventsOnDisabledButton = ['onMouseDown', 'onClick'];
export function Button(props, ref) {
  var href = props.href,
      target = props.target,
      isPrimary = props.isPrimary,
      isLarge = props.isLarge,
      isSmall = props.isSmall,
      isTertiary = props.isTertiary,
      isPressed = props.isPressed,
      isBusy = props.isBusy,
      isDefault = props.isDefault,
      isSecondary = props.isSecondary,
      isLink = props.isLink,
      isDestructive = props.isDestructive,
      className = props.className,
      disabled = props.disabled,
      icon = props.icon,
      iconSize = props.iconSize,
      showTooltip = props.showTooltip,
      tooltipPosition = props.tooltipPosition,
      shortcut = props.shortcut,
      label = props.label,
      children = props.children,
      isFocusable = props.__experimentalIsFocusable,
      additionalProps = _objectWithoutProperties(props, ["href", "target", "isPrimary", "isLarge", "isSmall", "isTertiary", "isPressed", "isBusy", "isDefault", "isSecondary", "isLink", "isDestructive", "className", "disabled", "icon", "iconSize", "showTooltip", "tooltipPosition", "shortcut", "label", "children", "__experimentalIsFocusable"]);

  if (isDefault) {
    deprecated('Button isDefault prop', {
      alternative: 'isSecondary'
    });
  }

  var classes = classnames('components-button', className, {
    'is-secondary': isDefault || isSecondary,
    'is-primary': isPrimary,
    'is-large': isLarge,
    'is-small': isSmall,
    'is-tertiary': isTertiary,
    'is-pressed': isPressed,
    'is-busy': isBusy,
    'is-link': isLink,
    'is-destructive': isDestructive,
    'has-text': !!icon && !!children,
    'has-icon': !!icon
  });
  var trulyDisabled = disabled && !isFocusable;
  var Tag = href !== undefined && !trulyDisabled ? 'a' : 'button';
  var tagProps = Tag === 'a' ? {
    href: href,
    target: target
  } : {
    type: 'button',
    disabled: trulyDisabled,
    'aria-pressed': isPressed
  };

  if (disabled && isFocusable) {
    // In this case, the button will be disabled, but still focusable and
    // perceivable by screen reader users.
    tagProps['aria-disabled'] = true;

    var _iterator = _createForOfIteratorHelper(disabledEventsOnDisabledButton),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var disabledEvent = _step.value;

        additionalProps[disabledEvent] = function (event) {
          event.stopPropagation();
          event.preventDefault();
        };
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } // Should show the tooltip if...


  var shouldShowTooltip = !trulyDisabled && ( // an explicit tooltip is passed or...
  showTooltip && label || // there's a shortcut or...
  shortcut || // there's a label and...
  !!label && ( // the children are empty and...
  !children || isArray(children) && !children.length) && // the tooltip is not explicitly disabled.
  false !== showTooltip);
  var element = createElement(Tag, _extends({}, tagProps, additionalProps, {
    className: classes,
    "aria-label": additionalProps['aria-label'] || label,
    ref: ref
  }), icon && createElement(Icon, {
    icon: icon,
    size: iconSize
  }), children);

  if (!shouldShowTooltip) {
    return element;
  }

  return createElement(Tooltip, {
    text: label,
    shortcut: shortcut,
    position: tooltipPosition
  }, element);
}
export default forwardRef(Button);
//# sourceMappingURL=index.js.map