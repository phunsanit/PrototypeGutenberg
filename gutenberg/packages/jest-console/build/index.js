"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _lodash = require("lodash");

require("./matchers");

var _supportedMatchers = _interopRequireDefault(require("./supported-matchers"));

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Sets spy on the console object's method to make it possible to fail test when method called without assertion.
 *
 * @param {string} matcherName Name of Jest matcher.
 * @param {string} methodName Name of console method.
 */
var setConsoleMethodSpy = function setConsoleMethodSpy(matcherName, methodName) {
  var spy = jest.spyOn(console, methodName).mockName("console.".concat(methodName));
  /**
   * Resets the spy to its initial state.
   */

  function resetSpy() {
    spy.mockReset();
    spy.assertionsNumber = 0;
  }
  /**
   * Verifies that the spy has only been called if expected.
   */


  function assertExpectedCalls() {
    if (spy.assertionsNumber === 0 && spy.mock.calls.length > 0) {
      expect(console).not[matcherName]();
    }
  }

  beforeAll(resetSpy);
  beforeEach(function () {
    assertExpectedCalls();
    resetSpy();
  });
  afterEach(assertExpectedCalls);
};

(0, _lodash.forEach)(_supportedMatchers.default, setConsoleMethodSpy);
//# sourceMappingURL=index.js.map