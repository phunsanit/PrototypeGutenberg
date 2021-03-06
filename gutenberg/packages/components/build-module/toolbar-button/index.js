import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useContext } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Button from '../button';
import ToolbarItem from '../toolbar-item';
import ToolbarContext from '../toolbar-context';
import ToolbarButtonContainer from './toolbar-button-container';

function ToolbarButton(_ref) {
  var containerClassName = _ref.containerClassName,
      className = _ref.className,
      extraProps = _ref.extraProps,
      children = _ref.children,
      title = _ref.title,
      isActive = _ref.isActive,
      isDisabled = _ref.isDisabled,
      props = _objectWithoutProperties(_ref, ["containerClassName", "className", "extraProps", "children", "title", "isActive", "isDisabled"]);

  var accessibleToolbarState = useContext(ToolbarContext);

  if (!accessibleToolbarState) {
    // This should be deprecated when <Toolbar __experimentalAccessibilityLabel="label">
    // becomes stable.
    return createElement(ToolbarButtonContainer, {
      className: containerClassName
    }, createElement(Button, _extends({
      icon: props.icon,
      label: title,
      shortcut: props.shortcut,
      "data-subscript": props.subscript,
      onClick: function onClick(event) {
        event.stopPropagation();

        if (props.onClick) {
          props.onClick(event);
        }
      },
      className: classnames('components-toolbar__control', className),
      isPressed: isActive,
      disabled: isDisabled,
      "data-experimental-toolbar-item": true
    }, extraProps), children));
  } // ToobarItem will pass all props to the render prop child, which will pass
  // all props to Button. This means that ToolbarButton has the same API as
  // Button.


  return createElement(ToolbarItem, _extends({
    className: classnames('components-toolbar-button', className)
  }, props), function (toolbarItemProps) {
    return createElement(Button, _extends({
      label: title,
      isPressed: isActive,
      disabled: isDisabled
    }, toolbarItemProps), children);
  });
}

export default ToolbarButton;
//# sourceMappingURL=index.js.map