import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { cloneElement, createElement, Component, isValidElement } from '@wordpress/element';
import { SVG } from '@wordpress/primitives';
/**
 * Internal dependencies
 */

import Dashicon from '../dashicon';

function Icon(_ref) {
  var _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? null : _ref$icon,
      size = _ref.size,
      additionalProps = _objectWithoutProperties(_ref, ["icon", "size"]);

  // Dashicons should be 20x20 by default.
  var dashiconSize = size || 20;

  if ('string' === typeof icon) {
    return createElement(Dashicon, _extends({
      icon: icon,
      size: dashiconSize
    }, additionalProps));
  }

  if (icon && Dashicon === icon.type) {
    return cloneElement(icon, _objectSpread({
      size: dashiconSize
    }, additionalProps));
  } // Icons should be 24x24 by default.


  var iconSize = size || 24;

  if ('function' === typeof icon) {
    if (icon.prototype instanceof Component) {
      return createElement(icon, _objectSpread({
        size: iconSize
      }, additionalProps));
    }

    return icon(_objectSpread({
      size: iconSize
    }, additionalProps));
  }

  if (icon && (icon.type === 'svg' || icon.type === SVG)) {
    var appliedProps = _objectSpread({
      width: iconSize,
      height: iconSize
    }, icon.props, {}, additionalProps);

    return createElement(SVG, appliedProps);
  }

  if (isValidElement(icon)) {
    return cloneElement(icon, _objectSpread({
      size: iconSize
    }, additionalProps));
  }

  return icon;
}

export default Icon;
//# sourceMappingURL=index.js.map