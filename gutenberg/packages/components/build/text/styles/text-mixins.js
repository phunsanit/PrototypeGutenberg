"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.text = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _fontFamily = require("./font-family");

var _emotionCss = _interopRequireDefault(require("./emotion-css"));

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t", "\n\t", "\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t\t\t\t", "\n\t\t\t"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var fontWeightNormal = "font-weight: 400;";
var fontWeightSemibold = "font-weight: 600;";
var title = "\n  ".concat(fontWeightNormal, "\n");
var titleLarge = "\n\tfont-size: 32px;\n\tline-height: 40px;\n";
var titleMedium = "\n\tfont-size: 24px;\n\tline-height: 32px;\n";
var titleSmall = "\n\tfont-size: 20px;\n\tline-height: 28px;\n";
var subtitle = "\n\t".concat(fontWeightSemibold, "\n\tfont-size: 14px;\n\tline-height: 20px;\n");
var subtitleLarge = "\n\tfont-size: 16px;\n\tline-height: 24px;\n";
var subtitleSmall = "\n\tfont-size: 14px;\n\tline-height: 20px;\n";
var body = "\n\t".concat(fontWeightNormal, "\n");
var bodyLarge = "\n\tfont-size: 16px;\n\tline-height: 24px;\n";
var bodySmall = "\n\tfont-size: 14px;\n\tline-height: 20px;\n";
var button = "\n  ".concat(fontWeightSemibold, "\n  font-size: 14px;\n  line-height: 20px;\n");
var caption = "\n\t".concat(fontWeightNormal, "\n\tfont-size: 12px;\n\tline-height: 16px;\n");
var label = "\n\t".concat(fontWeightSemibold, "\n\tfont-size: 12px;\n\tline-height: 16px;\n");
/**
 * @typedef {'title.large'|'title.medium'|'title.small'|'subtitle'|'subtitle.small'|'body'|'body.large'|'body.small'|'button'|'caption'|'label'} TextVariant
 */

/**
 * @param {TextVariant} variantName
 */

var variant = function variant() {
  var variantName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

  switch (variantName) {
    case 'title.large':
      return (0, _emotionCss.default)(_templateObject(), title, titleLarge);

    case 'title.medium':
      return (0, _emotionCss.default)(_templateObject2(), title, titleMedium);

    case 'title.small':
      return (0, _emotionCss.default)(_templateObject3(), title, titleSmall);

    case 'subtitle':
      return (0, _emotionCss.default)(_templateObject4(), subtitle, subtitleLarge);

    case 'subtitle.small':
      return (0, _emotionCss.default)(_templateObject5(), subtitle, subtitleSmall);

    case 'body':
      return (0, _emotionCss.default)(_templateObject6(), body);

    case 'body.large':
      return (0, _emotionCss.default)(_templateObject7(), body, bodyLarge);

    case 'body.small':
      return (0, _emotionCss.default)(_templateObject8(), body, bodySmall);

    case 'button':
      return button;

    case 'caption':
      return caption;

    case 'label':
      return label;
  }
};
/**
 * @typedef {Object} TextProps
 * @property {TextVariant} variant one of TextVariant to be used
 */

/**
 * @param {TextProps} props
 */


var text = function text(props) {
  return (0, _emotionCss.default)(_templateObject9(), _fontFamily.fontFamily, variant(props.variant));
};

exports.text = text;
//# sourceMappingURL=text-mixins.js.map