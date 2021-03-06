import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { has, get } from 'lodash';
/**
 * WordPress dependencies
 */

import { addFilter } from '@wordpress/hooks';
import { hasBlockSupport } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Platform } from '@wordpress/element';
/**
 * Internal dependencies
 */

import InspectorControls from '../components/inspector-controls';
import { COLOR_SUPPORT_KEY, ColorEdit } from './color';
import { LINE_HEIGHT_SUPPORT_KEY, LineHeightEdit } from './line-height';
import { FONT_SIZE_SUPPORT_KEY, FontSizeEdit } from './font-size';
var styleSupportKeys = [COLOR_SUPPORT_KEY, LINE_HEIGHT_SUPPORT_KEY, FONT_SIZE_SUPPORT_KEY];
var typographySupportKeys = [LINE_HEIGHT_SUPPORT_KEY, FONT_SIZE_SUPPORT_KEY];

var hasStyleSupport = function hasStyleSupport(blockType) {
  return styleSupportKeys.some(function (key) {
    return hasBlockSupport(blockType, key);
  });
};
/**
 * Returns the inline styles to add depending on the style object
 *
 * @param  {Object} styles Styles configuration
 * @return {Object}        Flattened CSS variables declaration
 */


export function getInlineStyles() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mappings = {
    lineHeight: ['typography', 'lineHeight'],
    fontSize: ['typography', 'fontSize'],
    background: ['color', 'gradient'],
    backgroundColor: ['color', 'background'],
    color: ['color', 'text']
  };
  var output = {};
  Object.entries(mappings).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        styleKey = _ref2[0],
        objectKey = _ref2[1];

    if (has(styles, objectKey)) {
      output[styleKey] = get(styles, objectKey);
    }
  });
  return output;
}
/**
 * Filters registered block settings, extending attributes to include `style` attribute.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */

function addAttribute(settings) {
  if (!hasStyleSupport(settings)) {
    return settings;
  } // allow blocks to specify their own attribute definition with default values if needed.


  if (!settings.attributes.style) {
    Object.assign(settings.attributes, {
      style: {
        type: 'object'
      }
    });
  }

  return settings;
}
/**
 * Override props assigned to save component to inject the CSS variables definition.
 *
 * @param  {Object} props      Additional props applied to save element
 * @param  {Object} blockType  Block type
 * @param  {Object} attributes Block attributes
 * @return {Object}            Filtered props applied to save element
 */


export function addSaveProps(props, blockType, attributes) {
  if (!hasStyleSupport(blockType)) {
    return props;
  }

  var style = attributes.style;
  props.style = _objectSpread({}, getInlineStyles(style), {}, props.style);
  return props;
}
/**
 * Filters registered block settings to extand the block edit wrapper
 * to apply the desired styles and classnames properly.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */

export function addEditProps(settings) {
  if (!hasStyleSupport(settings)) {
    return settings;
  }

  var existingGetEditWrapperProps = settings.getEditWrapperProps;

  settings.getEditWrapperProps = function (attributes) {
    var props = {};

    if (existingGetEditWrapperProps) {
      props = existingGetEditWrapperProps(attributes);
    }

    return addSaveProps(props, settings, attributes);
  };

  return settings;
}
/**
 * Override the default edit UI to include new inspector controls for
 * all the custom styles configs.
 *
 * @param  {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */

export var withBlockControls = createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    var blockName = props.name;
    var hasTypographySupport = typographySupportKeys.some(function (key) {
      return hasBlockSupport(blockName, key);
    });
    return [Platform.OS === 'web' && hasTypographySupport && createElement(InspectorControls, {
      key: "typography"
    }, createElement(PanelBody, {
      title: __('Typography')
    }, createElement(FontSizeEdit, props), createElement(LineHeightEdit, props))), createElement(ColorEdit, _extends({
      key: "colors"
    }, props)), createElement(BlockEdit, _extends({
      key: "edit"
    }, props))];
  };
}, 'withToolbarControls');
addFilter('blocks.registerBlockType', 'core/style/addAttribute', addAttribute);
addFilter('blocks.getSaveContent.extraProps', 'core/style/addSaveProps', addSaveProps);
addFilter('blocks.registerBlockType', 'core/style/addEditProps', addEditProps);
addFilter('editor.BlockEdit', 'core/style/with-block-controls', withBlockControls);
//# sourceMappingURL=style.js.map