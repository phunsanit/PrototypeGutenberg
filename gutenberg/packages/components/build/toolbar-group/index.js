"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _toolbarButton = _interopRequireDefault(require("../toolbar-button"));

var _toolbarGroupContainer = _interopRequireDefault(require("./toolbar-group-container"));

var _toolbarGroupCollapsed = _interopRequireDefault(require("./toolbar-group-collapsed"));

var _toolbarContext = _interopRequireDefault(require("../toolbar-context"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

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
      props = (0, _objectWithoutProperties2.default)(_ref, ["controls", "children", "className", "isCollapsed", "title"]);
  // It'll contain state if `ToolbarGroup` is being used within
  // `<Toolbar accessibilityLabel="label" />`
  var accessibleToolbarState = (0, _element.useContext)(_toolbarContext.default);

  if ((!controls || !controls.length) && !children) {
    return null;
  }

  var finalClassName = (0, _classnames.default)( // Unfortunately, there's legacy code referencing to `.components-toolbar`
  // So we can't get rid of it
  accessibleToolbarState ? 'components-toolbar-group' : 'components-toolbar', className); // Normalize controls to nested array of objects (sets of controls)

  var controlSets = controls;

  if (!Array.isArray(controlSets[0])) {
    controlSets = [controlSets];
  }

  if (isCollapsed) {
    return (0, _element.createElement)(_toolbarGroupCollapsed.default, (0, _extends2.default)({
      label: title,
      controls: controlSets,
      className: finalClassName,
      children: children
    }, props));
  }

  return (0, _element.createElement)(_toolbarGroupContainer.default, (0, _extends2.default)({
    className: finalClassName
  }, props), (0, _lodash.flatMap)(controlSets, function (controlSet, indexOfSet) {
    return controlSet.map(function (control, indexOfControl) {
      return (0, _element.createElement)(_toolbarButton.default, (0, _extends2.default)({
        key: [indexOfSet, indexOfControl].join(),
        containerClassName: indexOfSet > 0 && indexOfControl === 0 ? 'has-left-divider' : null
      }, control));
    });
  }), children);
}

var _default = ToolbarGroup;
exports.default = _default;
//# sourceMappingURL=index.js.map