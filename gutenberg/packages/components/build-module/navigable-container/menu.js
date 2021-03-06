import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { forwardRef } from '@wordpress/element';
import { UP, DOWN, LEFT, RIGHT } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import NavigableContainer from './container';
export function NavigableMenu(_ref, ref) {
  var _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'menu' : _ref$role,
      _ref$orientation = _ref.orientation,
      orientation = _ref$orientation === void 0 ? 'vertical' : _ref$orientation,
      rest = _objectWithoutProperties(_ref, ["role", "orientation"]);

  var eventToOffset = function eventToOffset(evt) {
    var keyCode = evt.keyCode;
    var next = [DOWN];
    var previous = [UP];

    if (orientation === 'horizontal') {
      next = [RIGHT];
      previous = [LEFT];
    }

    if (orientation === 'both') {
      next = [RIGHT, DOWN];
      previous = [LEFT, UP];
    }

    if (includes(next, keyCode)) {
      return 1;
    } else if (includes(previous, keyCode)) {
      return -1;
    }
  };

  return createElement(NavigableContainer, _extends({
    ref: ref,
    stopNavigationEvents: true,
    onlyBrowserTabstops: false,
    role: role,
    "aria-orientation": role === 'presentation' ? null : orientation,
    eventToOffset: eventToOffset
  }, rest));
}
export default forwardRef(NavigableMenu);
//# sourceMappingURL=menu.js.map