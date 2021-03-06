import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { flatMap } from 'lodash';
/**
 * WordPress dependencies
 */

import { useContext } from '@wordpress/element';
/**
 * Internal dependencies
 */

import ToolbarButton from '../toolbar-button';
import ToolbarGroupContainer from './toolbar-group-container';
import ToolbarGroupCollapsed from './toolbar-group-collapsed';
import ToolbarContext from '../toolbar-context';
/**
 * Renders a collapsible group of controls
 *
 * The `controls` prop accepts an array of sets. A set is an array of controls.
 * Controls have the following shape:
 *
 * ```
 * {
 *   icon: string,
 *   title: string,
 *   subscript: string,
 *   onClick: Function,
 *   isActive: boolean,
 *   isDisabled: boolean
 * }
 * ```
 *
 * For convenience it is also possible to pass only an array of controls. It is
 * then assumed this is the only set.
 *
 * Either `controls` or `children` is required, otherwise this components
 * renders nothing.
 *
 * @param {Object}                props               Component props.
 * @param {Array}                 [props.controls]    The controls to render in this toolbar.
 * @param {WPElement}             [props.children]    Any other things to render inside the toolbar besides the controls.
 * @param {string}                [props.className]   Class to set on the container div.
 * @param {boolean}               [props.isCollapsed] Turns ToolbarGroup into a dropdown menu.
 * @param {WPBlockTypeIconRender} [props.icon]        The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element.
 * @param {string}                [props.label]       The menu item text.
 */

function ToolbarGroup(_ref) {
  var _ref$controls = _ref.controls,
      controls = _ref$controls === void 0 ? [] : _ref$controls,
      children = _ref.children,
      className = _ref.className,
      isCollapsed = _ref.isCollapsed,
      title = _ref.title,
      props = _objectWithoutProperties(_ref, ["controls", "children", "className", "isCollapsed", "title"]);

  // It'll contain state if `ToolbarGroup` is being used within
  // `<Toolbar accessibilityLabel="label" />`
  var accessibleToolbarState = useContext(ToolbarContext);

  if ((!controls || !controls.length) && !children) {
    return null;
  }

  var finalClassName = classnames( // Unfortunately, there's legacy code referencing to `.components-toolbar`
  // So we can't get rid of it
  accessibleToolbarState ? 'components-toolbar-group' : 'components-toolbar', className); // Normalize controls to nested array of objects (sets of controls)

  var controlSets = controls;

  if (!Array.isArray(controlSets[0])) {
    controlSets = [controlSets];
  }

  if (isCollapsed) {
    return createElement(ToolbarGroupCollapsed, _extends({
      label: title,
      controls: controlSets,
      className: finalClassName,
      children: children
    }, props));
  }

  return createElement(ToolbarGroupContainer, _extends({
    className: finalClassName
  }, props), flatMap(controlSets, function (controlSet, indexOfSet) {
    return controlSet.map(function (control, indexOfControl) {
      return createElement(ToolbarButton, _extends({
        key: [indexOfSet, indexOfControl].join(),
        containerClassName: indexOfSet > 0 && indexOfControl === 0 ? 'has-left-divider' : null
      }, control));
    });
  }), children);
}

export default ToolbarGroup;
//# sourceMappingURL=index.js.map