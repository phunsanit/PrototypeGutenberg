import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { textColor } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import Button from '../button';
import RangeControl from '../range-control';
import CustomSelectControl from '../custom-select-control';
import VisuallyHidden from '../visually-hidden';
var DEFAULT_FONT_SIZE = 'default';
var CUSTOM_FONT_SIZE = 'custom';

function getSelectValueFromFontSize(fontSizes, value) {
  if (value) {
    var fontSizeValue = fontSizes.find(function (font) {
      return font.size === Number(value);
    });
    return fontSizeValue ? fontSizeValue.slug : CUSTOM_FONT_SIZE;
  }

  return DEFAULT_FONT_SIZE;
}

function getSelectOptions(optionsArray, disableCustomFontSizes) {
  optionsArray = [{
    slug: DEFAULT_FONT_SIZE,
    name: __('Default')
  }].concat(_toConsumableArray(optionsArray), _toConsumableArray(disableCustomFontSizes ? [] : [{
    slug: CUSTOM_FONT_SIZE,
    name: __('Custom')
  }]));
  return optionsArray.map(function (option) {
    return {
      key: option.slug,
      name: option.name,
      style: {
        fontSize: option.size
      }
    };
  });
}

export default function FontSizePicker(_ref) {
  var fallbackFontSize = _ref.fallbackFontSize,
      _ref$fontSizes = _ref.fontSizes,
      fontSizes = _ref$fontSizes === void 0 ? [] : _ref$fontSizes,
      _ref$disableCustomFon = _ref.disableCustomFontSizes,
      disableCustomFontSizes = _ref$disableCustomFon === void 0 ? false : _ref$disableCustomFon,
      _onChange = _ref.onChange,
      value = _ref.value,
      _ref$withSlider = _ref.withSlider,
      withSlider = _ref$withSlider === void 0 ? false : _ref$withSlider;
  var instanceId = useInstanceId(FontSizePicker);

  if (disableCustomFontSizes && !fontSizes.length) {
    return null;
  }

  var options = getSelectOptions(fontSizes, disableCustomFontSizes);
  var selectedFontSizeSlug = getSelectValueFromFontSize(fontSizes, value);
  var fontSizePickerNumberId = "components-font-size-picker__number#".concat(instanceId);
  return createElement("fieldset", {
    className: "components-font-size-picker"
  }, createElement(VisuallyHidden, {
    as: "legend"
  }, __('Font size')), createElement("div", {
    className: "components-font-size-picker__controls"
  }, fontSizes.length > 0 && createElement(CustomSelectControl, {
    className: 'components-font-size-picker__select',
    label: __('Preset size'),
    options: options,
    value: options.find(function (option) {
      return option.key === selectedFontSizeSlug;
    }),
    onChange: function onChange(_ref2) {
      var selectedItem = _ref2.selectedItem;
      var selectedValue = selectedItem.style && selectedItem.style.fontSize;

      _onChange(Number(selectedValue));
    }
  }), !withSlider && !disableCustomFontSizes && createElement("div", {
    className: "components-font-size-picker__number-container"
  }, createElement("label", {
    htmlFor: fontSizePickerNumberId
  }, __('Custom')), createElement("input", {
    id: fontSizePickerNumberId,
    className: "components-font-size-picker__number",
    type: "number",
    min: 1,
    onChange: function onChange(event) {
      _onChange(Number(event.target.value));
    },
    "aria-label": __('Custom'),
    value: value || ''
  })), createElement(Button, {
    className: "components-color-palette__clear",
    disabled: value === undefined,
    onClick: function onClick() {
      _onChange(undefined);
    },
    isSmall: true,
    isSecondary: true
  }, __('Reset'))), withSlider && createElement(RangeControl, {
    className: "components-font-size-picker__custom-input",
    label: __('Custom Size'),
    value: value || '',
    initialPosition: fallbackFontSize,
    onChange: function onChange(newValue) {
      _onChange(newValue);
    },
    min: 12,
    max: 100,
    beforeIcon: textColor,
    afterIcon: textColor
  }));
}
//# sourceMappingURL=index.js.map