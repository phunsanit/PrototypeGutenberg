import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useState, useMemo } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { RovingTabIndexProvider } from './roving-tab-index-context';
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/components/src/roving-tab-index/README.md
 */

export default function RovingTabIndex(_ref) {
  var children = _ref.children;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      lastFocusedElement = _useState2[0],
      setLastFocusedElement = _useState2[1]; // Use `useMemo` to avoid creation of a new object for the providerValue
  // on every render. Only create a new object when the `lastFocusedElement`
  // value changes.


  var providerValue = useMemo(function () {
    return {
      lastFocusedElement: lastFocusedElement,
      setLastFocusedElement: setLastFocusedElement
    };
  }, [lastFocusedElement]);
  return createElement(RovingTabIndexProvider, {
    value: providerValue
  }, children);
}
//# sourceMappingURL=roving-tab-index.js.map