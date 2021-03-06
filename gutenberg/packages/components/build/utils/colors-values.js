"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.COLORS = exports.UI = exports.ALERT = exports.BLUE = exports.LIGHT_OPACITY_LIGHT = exports.LIGHT_GRAY = exports.DARK_OPACITY_LIGHT = exports.DARK_OPACITY = exports.DARK_GRAY = exports.G2 = exports.BASE = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _colors = require("./colors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BASE = {
  black: '#000',
  white: '#fff'
};
/**
 * TODO: Continue to update values as "G2" design evolves.
 *
 * "G2" refers to the movement to advance the interface of the block editor.
 * https://github.com/WordPress/gutenberg/issues/18667
 */

exports.BASE = BASE;
var G2 = {
  blue: {
    medium: {
      focus: '#007cba',
      focusDark: '#fff'
    }
  },
  darkGray: {
    primary: '#1e1e1e'
  },
  mediumGray: {
    text: '#757575'
  },
  lightGray: {
    ui: '#949494',
    secondary: '#ccc',
    tertiary: '#e7e8e9'
  }
};
exports.G2 = G2;
var DARK_GRAY = {
  900: '#191e23',
  800: '#23282d',
  700: '#32373c',
  600: '#40464d',
  500: '#555d66',
  // Use this most of the time for dark items.
  400: '#606a73',
  300: '#6c7781',
  // Lightest gray that can be used for AA text contrast.
  200: '#7e8993',
  150: '#8d96a0',
  // Lightest gray that can be used for AA non-text contrast.
  100: '#8f98a1'
};
exports.DARK_GRAY = DARK_GRAY;
var DARK_OPACITY = {
  900: (0, _colors.rgba)('#000510', 0.9),
  800: (0, _colors.rgba)('#00000a', 0.85),
  700: (0, _colors.rgba)('#06060b', 0.8),
  600: (0, _colors.rgba)('#000913', 0.75),
  500: (0, _colors.rgba)('#0a1829', 0.7),
  400: (0, _colors.rgba)('#0a1829', 0.65),
  300: (0, _colors.rgba)('#0e1c2e', 0.62),
  200: (0, _colors.rgba)('#162435', 0.55),
  100: (0, _colors.rgba)('#223443', 0.5),
  backgroundFill: (0, _colors.rgba)(DARK_GRAY[700], 0.7)
};
exports.DARK_OPACITY = DARK_OPACITY;
var DARK_OPACITY_LIGHT = {
  900: (0, _colors.rgba)('#304455', 0.45),
  800: (0, _colors.rgba)('#425863', 0.4),
  700: (0, _colors.rgba)('#667886', 0.35),
  600: (0, _colors.rgba)('#7b86a2', 0.3),
  500: (0, _colors.rgba)('#9197a2', 0.25),
  400: (0, _colors.rgba)('#95959c', 0.2),
  300: (0, _colors.rgba)('#829493', 0.15),
  200: (0, _colors.rgba)('#8b8b96', 0.1),
  100: (0, _colors.rgba)('#747474', 0.05)
};
exports.DARK_OPACITY_LIGHT = DARK_OPACITY_LIGHT;
var LIGHT_GRAY = {
  900: '#a2aab2',
  800: '#b5bcc2',
  700: '#ccd0d4',
  600: '#d7dade',
  500: '#e2e4e7',
  // Good for "grayed" items and borders.
  400: '#e8eaeb',
  // Good for "readonly" input fields and special text selection.
  300: '#edeff0',
  200: '#f3f4f5',
  100: '#f8f9f9'
};
exports.LIGHT_GRAY = LIGHT_GRAY;
var LIGHT_OPACITY_LIGHT = {
  900: (0, _colors.rgba)(BASE.white, 0.5),
  800: (0, _colors.rgba)(BASE.white, 0.45),
  700: (0, _colors.rgba)(BASE.white, 0.4),
  600: (0, _colors.rgba)(BASE.white, 0.35),
  500: (0, _colors.rgba)(BASE.white, 0.3),
  400: (0, _colors.rgba)(BASE.white, 0.25),
  300: (0, _colors.rgba)(BASE.white, 0.2),
  200: (0, _colors.rgba)(BASE.white, 0.15),
  100: (0, _colors.rgba)(BASE.white, 0.1),
  backgroundFill: (0, _colors.rgba)(LIGHT_GRAY[300], 0.8)
}; // Additional colors.
// Some are from https://make.wordpress.org/design/handbook/foundations/colors/.

exports.LIGHT_OPACITY_LIGHT = LIGHT_OPACITY_LIGHT;
var BLUE = {
  wordpress: {
    700: '#00669b'
  },
  dark: {
    900: '#0071a1'
  },
  medium: {
    900: '#006589',
    800: '#00739c',
    700: '#007fac',
    600: '#008dbe',
    500: '#00a0d2',
    400: '#33b3db',
    300: '#66c6e4',
    200: '#bfe7f3',
    100: '#e5f5fa',
    highlight: '#b3e7fe',
    focus: '#007cba'
  }
};
exports.BLUE = BLUE;
var ALERT = {
  yellow: '#f0b849',
  red: '#d94f4f',
  green: '#4ab866'
}; // Namespaced values for raw colors hex codes

exports.ALERT = ALERT;
var UI = {
  background: BASE.white,
  backgroundDisabled: LIGHT_GRAY[200],
  brand: BLUE.wordpress[700],
  border: BASE.black,
  borderFocus: BLUE.medium.focus,
  borderDisabled: DARK_GRAY[700],
  borderLight: LIGHT_GRAY[600],
  label: DARK_GRAY[500],
  textDisabled: DARK_GRAY[150]
};
exports.UI = UI;

var COLORS = _objectSpread({}, BASE, {
  darkGray: (0, _lodash.merge)({}, DARK_GRAY, G2.darkGray),
  darkOpacity: DARK_OPACITY,
  darkOpacityLight: DARK_OPACITY_LIGHT,
  mediumGray: G2.mediumGray,
  lightGray: (0, _lodash.merge)({}, LIGHT_GRAY, G2.lightGray),
  lightGrayLight: LIGHT_OPACITY_LIGHT,
  blue: (0, _lodash.merge)({}, BLUE, G2.blue),
  alert: ALERT,
  ui: UI
});

exports.COLORS = COLORS;
var _default = COLORS;
exports.default = _default;
//# sourceMappingURL=colors-values.js.map