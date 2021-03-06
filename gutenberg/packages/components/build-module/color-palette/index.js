import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { map } from 'lodash';
import tinycolor from 'tinycolor2';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { useCallback, useMemo } from '@wordpress/element';
/**
 * Internal dependencies
 */

import ColorPicker from '../color-picker';
import CircularOptionPicker from '../circular-option-picker';
export default function ColorPalette(_ref) {
  var _ref$clearable = _ref.clearable,
      clearable = _ref$clearable === void 0 ? true : _ref$clearable,
      className = _ref.className,
      colors = _ref.colors,
      _ref$disableCustomCol = _ref.disableCustomColors,
      disableCustomColors = _ref$disableCustomCol === void 0 ? false : _ref$disableCustomCol,
      onChange = _ref.onChange,
      value = _ref.value;
  var clearColor = useCallback(function () {
    return onChange(undefined);
  }, [onChange]);
  var colorOptions = useMemo(function () {
    return map(colors, function (_ref2) {
      var color = _ref2.color,
          name = _ref2.name;
      return createElement(CircularOptionPicker.Option, {
        key: color,
        isSelected: value === color,
        selectedIconProps: value === color ? {
          fill: tinycolor.mostReadable(color, ['#000', '#fff']).toHexString()
        } : {},
        tooltipText: name || // translators: %s: color hex code e.g: "#f00".
        sprintf(__('Color code: %s'), color),
        style: {
          backgroundColor: color,
          color: color
        },
        onClick: value === color ? clearColor : function () {
          return onChange(color);
        },
        "aria-label": name ? // translators: %s: The name of the color e.g: "vivid red".
        sprintf(__('Color: %s'), name) : // translators: %s: color hex code e.g: "#f00".
        sprintf(__('Color code: %s'), color)
      });
    });
  }, [colors, value, onChange, clearColor]);
  var renderCustomColorPicker = useCallback(function () {
    return createElement(ColorPicker, {
      color: value,
      onChangeComplete: function onChangeComplete(color) {
        return onChange(color.hex);
      },
      disableAlpha: true
    });
  }, [value]);
  return createElement(CircularOptionPicker, {
    className: className,
    options: colorOptions,
    actions: createElement(Fragment, null, !disableCustomColors && createElement(CircularOptionPicker.DropdownLinkAction, {
      dropdownProps: {
        renderContent: renderCustomColorPicker,
        contentClassName: 'components-color-palette__picker'
      },
      buttonProps: {
        'aria-label': __('Custom color picker')
      },
      linkText: __('Custom color')
    }), !!clearable && createElement(CircularOptionPicker.ButtonAction, {
      onClick: clearColor
    }, __('Clear')))
  });
}
//# sourceMappingURL=index.js.map