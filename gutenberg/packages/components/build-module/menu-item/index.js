import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isString } from 'lodash';
/**
 * WordPress dependencies
 */

import { cloneElement, forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Shortcut from '../shortcut';
import Button from '../button';
/**
 * Renders a generic menu item for use inside the more menu.
 *
 * @param {Object} ref Ref
 *
 * @return {WPComponent} The component to be rendered.
 */

export function MenuItem(_ref, ref) {
  var children = _ref.children,
      info = _ref.info,
      className = _ref.className,
      icon = _ref.icon,
      shortcut = _ref.shortcut,
      isSelected = _ref.isSelected,
      _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'menuitem' : _ref$role,
      props = _objectWithoutProperties(_ref, ["children", "info", "className", "icon", "shortcut", "isSelected", "role"]);

  className = classnames('components-menu-item__button', className);

  if (info) {
    children = createElement("span", {
      className: "components-menu-item__info-wrapper"
    }, children, createElement("span", {
      className: "components-menu-item__info"
    }, info));
  }

  if (icon && !isString(icon)) {
    icon = cloneElement(icon, {
      className: 'components-menu-items__item-icon'
    });
  }

  return createElement(Button, _extends({
    ref: ref,
    icon: icon // Make sure aria-checked matches spec https://www.w3.org/TR/wai-aria-1.1/#aria-checked
    ,
    "aria-checked": role === 'menuitemcheckbox' || role === 'menuitemradio' ? isSelected : undefined,
    role: role,
    className: className
  }, props), children, createElement(Shortcut, {
    className: "components-menu-item__shortcut",
    shortcut: shortcut
  }));
}
export default forwardRef(MenuItem);
//# sourceMappingURL=index.js.map