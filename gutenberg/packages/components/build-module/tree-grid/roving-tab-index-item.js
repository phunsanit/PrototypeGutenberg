import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { useRovingTabIndexContext } from './roving-tab-index-context';
export default function RovingTabIndexItem(_ref) {
  var children = _ref.children,
      Component = _ref.as,
      props = _objectWithoutProperties(_ref, ["children", "as"]);

  var ref = useRef();

  var _useRovingTabIndexCon = useRovingTabIndexContext(),
      lastFocusedElement = _useRovingTabIndexCon.lastFocusedElement,
      setLastFocusedElement = _useRovingTabIndexCon.setLastFocusedElement;

  var tabIndex;

  if (lastFocusedElement) {
    tabIndex = lastFocusedElement === ref.current ? 0 : -1;
  }

  var onFocus = function onFocus(event) {
    return setLastFocusedElement(event.target);
  };

  var allProps = _objectSpread({
    ref: ref,
    tabIndex: tabIndex,
    onFocus: onFocus
  }, props);

  if (typeof children === 'function') {
    return children(allProps);
  }

  return createElement(Component, allProps, children);
}
//# sourceMappingURL=roving-tab-index-item.js.map