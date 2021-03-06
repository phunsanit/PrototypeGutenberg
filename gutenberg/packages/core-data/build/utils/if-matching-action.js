"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A higher-order reducer creator which invokes the original reducer only if
 * the dispatching action matches the given predicate, **OR** if state is
 * initializing (undefined).
 *
 * @param {Function} isMatch Function predicate for allowing reducer call.
 *
 * @return {Function} Higher-order reducer.
 */
var ifMatchingAction = function ifMatchingAction(isMatch) {
  return function (reducer) {
    return function (state, action) {
      if (state === undefined || isMatch(action)) {
        return reducer(state, action);
      }

      return state;
    };
  };
};

var _default = ifMatchingAction;
exports.default = _default;
//# sourceMappingURL=if-matching-action.js.map