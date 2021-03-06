"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _element = require("@wordpress/element");

var _primitives = require("@wordpress/primitives");

var _dashicon = _interopRequireDefault(require("../dashicon"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Icon(_ref) {
  var _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? null : _ref$icon,
      size = _ref.size,
      additionalProps = (0, _objectWithoutProperties2.default)(_ref, ["icon", "size"]);
  // Dashicons should be 20x20 by default.
  var dashiconSize = size || 20;

  if ('string' === typeof icon) {
    return (0, _element.createElement)(_dashicon.default, (0, _extends2.default)({
      icon: icon,
      size: dashiconSize
    }, additionalProps));
  }

  if (icon && _dashicon.default === icon.type) {
    return (0, _element.cloneElement)(icon, _objectSpread({
      size: dashiconSize
    }, additionalProps));
  } // Icons should be 24x24 by default.


  var iconSize = size || 24;

  if ('function' === typeof icon) {
    if (icon.prototype instanceof _element.Component) {
      return (0, _element.createElement)(icon, _objectSpread({
        size: iconSize
      }, additionalProps));
    }

    return icon(_objectSpread({
      size: iconSize
    }, additionalProps));
  }

  if (icon && (icon.type === 'svg' || icon.type === _primitives.SVG)) {
    var appliedProps = _objectSpread({
      width: iconSize,
      height: iconSize
    }, icon.props, {}, additionalProps);

    return (0, _element.createElement)(_primitives.SVG, appliedProps);
  }

  if ((0, _element.isValidElement)(icon)) {
    return (0, _element.cloneElement)(icon, _objectSpread({
      size: iconSize
    }, additionalProps));
  }

  return icon;
}

var _default = Icon;
exports.default = _default;
//# sourceMappingURL=index.js.map