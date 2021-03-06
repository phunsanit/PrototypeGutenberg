import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { getColorObjectByColorValue, getColorObjectByAttributeValues, getGradientValueBySlug, getGradientSlugByValue, __experimentalPanelColorGradientSettings as PanelColorGradientSettings } from '@wordpress/block-editor';

function OverlayColorSettings(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;

  var _useSelect = useSelect(function (select) {
    return select('core/block-editor').getSettings();
  }, []),
      colors = _useSelect.colors,
      gradients = _useSelect.gradients;

  var overlayColor = attributes.overlayColor,
      customOverlayColor = attributes.customOverlayColor,
      gradient = attributes.gradient,
      customGradient = attributes.customGradient;
  var gradientValue = customGradient || getGradientValueBySlug(gradients, gradient);
  var colorValue = getColorObjectByAttributeValues(colors, overlayColor, customOverlayColor).color;

  var setOverlayAttribute = function setOverlayAttribute(attributeName, value) {
    setAttributes(_defineProperty({
      // clear all related attributes (only one should be set)
      overlayColor: undefined,
      customOverlayColor: undefined,
      gradient: undefined,
      customGradient: undefined
    }, attributeName, value));
  };

  var onColorChange = function onColorChange(value) {
    // do nothing for falsy values
    if (!value) {
      return;
    }

    var colorObject = getColorObjectByColorValue(colors, value);

    if (colorObject === null || colorObject === void 0 ? void 0 : colorObject.slug) {
      setOverlayAttribute('overlayColor', colorObject.slug);
    } else {
      setOverlayAttribute('customOverlayColor', value);
    }
  };

  var onGradientChange = function onGradientChange(value) {
    // do nothing for falsy values
    if (!value) {
      return;
    }

    var slug = getGradientSlugByValue(gradients, value);

    if (slug) {
      setOverlayAttribute('gradient', slug);
    } else {
      setOverlayAttribute('customGradient', value);
    }
  };

  return createElement(PanelColorGradientSettings, {
    title: __('Color Settings'),
    initialOpen: false,
    settings: [{
      label: __('Overlay Color'),
      onColorChange: onColorChange,
      colorValue: colorValue,
      gradientValue: gradientValue,
      onGradientChange: onGradientChange
    }]
  });
}

export default OverlayColorSettings;
//# sourceMappingURL=overlay-color-settings.native.js.map