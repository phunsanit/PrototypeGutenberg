"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getColorAndStyleProps;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _blockEditor = require("@wordpress/block-editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
// The code in this file is copied entirely from the "color" and "style" support flags
// The flag can't be used at the moment because of the extra wrapper around
// the button block markup.
function getColorAndStyleProps(attributes) {
  var _style$color, _style$color2, _style$color3, _style$color4, _classnames, _style$color5, _style$color6, _style$color7, _style$color8, _style$color9, _style$color10;

  // I'd have prefered to avoid the "style" attribute usage here
  var backgroundColor = attributes.backgroundColor,
      textColor = attributes.textColor,
      gradient = attributes.gradient,
      style = attributes.style;
  var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
  var gradientClass = (0, _blockEditor.__experimentalGetGradientClass)(gradient);
  var textClass = (0, _blockEditor.getColorClassName)('color', textColor);
  var className = (0, _classnames2.default)(textClass, gradientClass, (_classnames = {}, (0, _defineProperty2.default)(_classnames, backgroundClass, !(style === null || style === void 0 ? void 0 : (_style$color = style.color) === null || _style$color === void 0 ? void 0 : _style$color.gradient) && !!backgroundClass), (0, _defineProperty2.default)(_classnames, 'has-text-color', textColor || (style === null || style === void 0 ? void 0 : (_style$color2 = style.color) === null || _style$color2 === void 0 ? void 0 : _style$color2.text)), (0, _defineProperty2.default)(_classnames, 'has-background', backgroundColor || (style === null || style === void 0 ? void 0 : (_style$color3 = style.color) === null || _style$color3 === void 0 ? void 0 : _style$color3.background) || gradient || (style === null || style === void 0 ? void 0 : (_style$color4 = style.color) === null || _style$color4 === void 0 ? void 0 : _style$color4.gradient)), _classnames));
  var styleProp = (style === null || style === void 0 ? void 0 : (_style$color5 = style.color) === null || _style$color5 === void 0 ? void 0 : _style$color5.background) || (style === null || style === void 0 ? void 0 : (_style$color6 = style.color) === null || _style$color6 === void 0 ? void 0 : _style$color6.text) || (style === null || style === void 0 ? void 0 : (_style$color7 = style.color) === null || _style$color7 === void 0 ? void 0 : _style$color7.gradient) ? {
    background: (style === null || style === void 0 ? void 0 : (_style$color8 = style.color) === null || _style$color8 === void 0 ? void 0 : _style$color8.gradient) ? style.color.gradient : undefined,
    backgroundColor: (style === null || style === void 0 ? void 0 : (_style$color9 = style.color) === null || _style$color9 === void 0 ? void 0 : _style$color9.background) ? style.color.background : undefined,
    color: (style === null || style === void 0 ? void 0 : (_style$color10 = style.color) === null || _style$color10 === void 0 ? void 0 : _style$color10.text) ? style.color.text : undefined
  } : {};
  return {
    className: !!className ? className : undefined,
    style: styleProp
  };
}
//# sourceMappingURL=color-props.js.map