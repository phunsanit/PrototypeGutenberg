"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _jestMatcherUtils = require("jest-matcher-utils");

var _lodash = require("lodash");

var _supportedMatchers = _interopRequireDefault(require("./supported-matchers"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createToHaveBeenCalledMatcher = function createToHaveBeenCalledMatcher(matcherName, methodName) {
  return function (received) {
    var spy = received[methodName];
    var calls = spy.mock.calls;
    var pass = calls.length > 0;
    var message = pass ? function () {
      return (0, _jestMatcherUtils.matcherHint)(".not".concat(matcherName), spy.getMockName()) + '\n\n' + 'Expected mock function not to be called but it was called with:\n' + calls.map(_jestMatcherUtils.printReceived);
    } : function () {
      return (0, _jestMatcherUtils.matcherHint)(matcherName, spy.getMockName()) + '\n\n' + 'Expected mock function to be called.';
    };
    spy.assertionsNumber += 1;
    return {
      message: message,
      pass: pass
    };
  };
};

var createToHaveBeenCalledWith = function createToHaveBeenCalledWith(matcherName, methodName) {
  return function (received) {
    for (var _len = arguments.length, expected = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      expected[_key - 1] = arguments[_key];
    }

    var spy = received[methodName];
    var calls = spy.mock.calls;
    var pass = (0, _lodash.some)(calls, function (objects) {
      return (0, _lodash.isEqual)(objects, expected);
    });
    var message = pass ? function () {
      return (0, _jestMatcherUtils.matcherHint)(".not".concat(matcherName), spy.getMockName()) + '\n\n' + 'Expected mock function not to be called with:\n' + (0, _jestMatcherUtils.printExpected)(expected);
    } : function () {
      return (0, _jestMatcherUtils.matcherHint)(matcherName, spy.getMockName()) + '\n\n' + 'Expected mock function to be called with:\n' + (0, _jestMatcherUtils.printExpected)(expected) + '\n' + 'but it was called with:\n' + calls.map(_jestMatcherUtils.printReceived);
    };
    spy.assertionsNumber += 1;
    return {
      message: message,
      pass: pass
    };
  };
};

expect.extend((0, _lodash.reduce)(_supportedMatchers.default, function (result, matcherName, methodName) {
  var _objectSpread2;

  var matcherNameWith = "".concat(matcherName, "With");
  return _objectSpread({}, result, (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, matcherName, createToHaveBeenCalledMatcher(".".concat(matcherName), methodName)), (0, _defineProperty2.default)(_objectSpread2, matcherNameWith, createToHaveBeenCalledWith(".".concat(matcherNameWith), methodName)), _objectSpread2));
}, {}));
//# sourceMappingURL=matchers.js.map