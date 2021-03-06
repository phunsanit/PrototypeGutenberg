"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useControlledState = useControlledState;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _element = require("@wordpress/element");

/**
 * WordPress dependencies
 */

/**
 * Custom hooks for "controlled" components to track and consolidate internal
 * state and incoming values. This is useful for components that render
 * `input`, `textarea`, or `select` HTML elements.
 *
 * https://reactjs.org/docs/forms.html#controlled-components
 *
 * At first, a component using useControlledState receives an initial prop
 * value, which is used as initial internal state.
 *
 * This internal state can be maintained and updated without
 * relying on new incoming prop values.
 *
 * Unlike the basic useState hook, useControlledState's state can
 * be updated if a new incoming prop value is changed.
 *
 * @param {any} initialState The initial state value.
 * @return {[*, Function]} The controlled value and the value setter.
 */
function useControlledState(initialState) {
  var _useState = (0, _element.useState)(initialState),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var lastInitialStateRef = (0, _element.useRef)(initialState);
  (0, _element.useEffect)(function () {
    // Update the internal state if the incoming value changes.
    if (initialState !== lastInitialStateRef.current) {
      setState(initialState);
      lastInitialStateRef.current = initialState;
    }
  }, [initialState]);
  return [state, setState];
}
//# sourceMappingURL=hooks.js.map