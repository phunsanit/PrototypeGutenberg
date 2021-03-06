import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { isEqual, reduce, some } from 'lodash';
/**
 * Internal dependencies
 */

import supportedMatchers from './supported-matchers';

var createToHaveBeenCalledMatcher = function createToHaveBeenCalledMatcher(matcherName, methodName) {
  return function (received) {
    var spy = received[methodName];
    var calls = spy.mock.calls;
    var pass = calls.length > 0;
    var message = pass ? function () {
      return matcherHint(".not".concat(matcherName), spy.getMockName()) + '\n\n' + 'Expected mock function not to be called but it was called with:\n' + calls.map(printReceived);
    } : function () {
      return matcherHint(matcherName, spy.getMockName()) + '\n\n' + 'Expected mock function to be called.';
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
    var pass = some(calls, function (objects) {
      return isEqual(objects, expected);
    });
    var message = pass ? function () {
      return matcherHint(".not".concat(matcherName), spy.getMockName()) + '\n\n' + 'Expected mock function not to be called with:\n' + printExpected(expected);
    } : function () {
      return matcherHint(matcherName, spy.getMockName()) + '\n\n' + 'Expected mock function to be called with:\n' + printExpected(expected) + '\n' + 'but it was called with:\n' + calls.map(printReceived);
    };
    spy.assertionsNumber += 1;
    return {
      message: message,
      pass: pass
    };
  };
};

expect.extend(reduce(supportedMatchers, function (result, matcherName, methodName) {
  var _objectSpread2;

  var matcherNameWith = "".concat(matcherName, "With");
  return _objectSpread({}, result, (_objectSpread2 = {}, _defineProperty(_objectSpread2, matcherName, createToHaveBeenCalledMatcher(".".concat(matcherName), methodName)), _defineProperty(_objectSpread2, matcherNameWith, createToHaveBeenCalledWith(".".concat(matcherNameWith), methodName)), _objectSpread2));
}, {}));
//# sourceMappingURL=matchers.js.map