import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { ToolbarItem as BaseToolbarItem } from 'reakit/Toolbar';
/**
 * WordPress dependencies
 */

import { forwardRef, useContext } from '@wordpress/element';
import warning from '@wordpress/warning';
/**
 * Internal dependencies
 */

import ToolbarContext from '../toolbar-context';

function ToolbarItem(_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  var accessibleToolbarState = useContext(ToolbarContext);

  if (typeof children !== 'function') {
    typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production" ? warning('`ToolbarItem` is a generic headless component that accepts only function children props') : void 0;
    return null;
  }

  var allProps = _objectSpread({}, props, {
    ref: ref,
    'data-experimental-toolbar-item': true
  });

  if (!accessibleToolbarState) {
    return children(allProps);
  }

  return createElement(BaseToolbarItem, _extends({}, accessibleToolbarState, allProps), children);
}

export default forwardRef(ToolbarItem);
//# sourceMappingURL=index.js.map