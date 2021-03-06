"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Circle", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Circle;
  }
});
Object.defineProperty(exports, "G", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.G;
  }
});
Object.defineProperty(exports, "Path", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Path;
  }
});
Object.defineProperty(exports, "Polygon", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Polygon;
  }
});
Object.defineProperty(exports, "Rect", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Rect;
  }
});
Object.defineProperty(exports, "Defs", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Defs;
  }
});
Object.defineProperty(exports, "RadialGradient", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.RadialGradient;
  }
});
Object.defineProperty(exports, "LinearGradient", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.LinearGradient;
  }
});
Object.defineProperty(exports, "Stop", {
  enumerable: true,
  get: function get() {
    return _reactNativeSvg.Stop;
  }
});
exports.SVG = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _reactNativeSvg = require("react-native-svg");

var _style = _interopRequireDefault(require("./style.scss"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SVG = function SVG(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      isPressed = _ref.isPressed,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "isPressed"]);
  var colorScheme = props.colorScheme || 'light';
  var stylesFromClasses = className.split(' ').map(function (element) {
    return _style.default[element];
  }).filter(Boolean);
  var defaultStyle = isPressed ? _style.default['is-pressed'] : _style.default['components-toolbar__control-' + colorScheme];
  var styleValues = Object.assign.apply(Object, [{}, defaultStyle, props.style].concat((0, _toConsumableArray2.default)(stylesFromClasses)));

  var appliedProps = _objectSpread({}, props, {
    style: styleValues
  });

  return (0, _element.createElement)(_reactNativeSvg.Svg //We want to re-render when style color is changed
  , (0, _extends2.default)({
    key: appliedProps.style.color,
    height: "100%",
    width: "100%"
  }, appliedProps));
};

exports.SVG = SVG;
//# sourceMappingURL=index.native.js.map