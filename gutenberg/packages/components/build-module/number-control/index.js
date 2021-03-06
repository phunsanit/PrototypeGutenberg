import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { clamp } from 'lodash';
import classNames from 'classnames';
/**
 * WordPress dependencies
 */

import { forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { Input } from './styles/number-control-styles';
import { add, getValue, roundClamp, subtract } from './utils';
import { isValueEmpty } from '../input-control/utils';
import { inputControlActionTypes, composeStateReducers } from '../input-control/state';
import { useRTL } from '../utils/style-mixins';
export function NumberControl(_ref, ref) {
  var _ref$__unstableStateR = _ref.__unstableStateReducer,
      stateReducer = _ref$__unstableStateR === void 0 ? function (state) {
    return state;
  } : _ref$__unstableStateR,
      className = _ref.className,
      _ref$dragDirection = _ref.dragDirection,
      dragDirection = _ref$dragDirection === void 0 ? 'n' : _ref$dragDirection,
      _ref$hideHTMLArrows = _ref.hideHTMLArrows,
      hideHTMLArrows = _ref$hideHTMLArrows === void 0 ? false : _ref$hideHTMLArrows,
      _ref$isDragEnabled = _ref.isDragEnabled,
      isDragEnabled = _ref$isDragEnabled === void 0 ? true : _ref$isDragEnabled,
      _ref$isShiftStepEnabl = _ref.isShiftStepEnabled,
      isShiftStepEnabled = _ref$isShiftStepEnabl === void 0 ? true : _ref$isShiftStepEnabl,
      label = _ref.label,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? Infinity : _ref$max,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? -Infinity : _ref$min,
      _ref$shiftStep = _ref.shiftStep,
      shiftStep = _ref$shiftStep === void 0 ? 10 : _ref$shiftStep,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      _ref$type = _ref.type,
      typeProp = _ref$type === void 0 ? 'number' : _ref$type,
      valueProp = _ref.value,
      props = _objectWithoutProperties(_ref, ["__unstableStateReducer", "className", "dragDirection", "hideHTMLArrows", "isDragEnabled", "isShiftStepEnabled", "label", "max", "min", "shiftStep", "step", "type", "value"]);

  var initialValue = getValue(valueProp, min, max);
  var baseValue = clamp(0, min, max);
  var isRtl = useRTL();
  var autoComplete = typeProp === 'number' ? 'off' : null;
  var classes = classNames('components-number-control', className);
  /**
   * "Middleware" function that intercepts updates from InputControl.
   * This allows us to tap into actions to transform the (next) state for
   * InputControl.
   *
   * @param {Object} state State from InputControl
   * @param {Object} action Action triggering state change
   * @return {Object} The updated state to apply to InputControl
   */

  var numberControlStateReducer = function numberControlStateReducer(state, action) {
    var type = action.type,
        payload = action.payload;
    var event = payload === null || payload === void 0 ? void 0 : payload.event;
    var currentValue = state.value;
    /**
     * Handles custom UP and DOWN Keyboard events
     */

    if (type === inputControlActionTypes.PRESS_UP || type === inputControlActionTypes.PRESS_DOWN) {
      var enableShift = event.shiftKey && isShiftStepEnabled;
      var incrementalValue = enableShift ? parseFloat(shiftStep) : parseFloat(step);
      var nextValue = isValueEmpty(currentValue) ? baseValue : currentValue;

      if (event === null || event === void 0 ? void 0 : event.preventDefault) {
        event.preventDefault();
      }

      if (type === inputControlActionTypes.PRESS_UP) {
        nextValue = add(nextValue, incrementalValue);
      }

      if (type === inputControlActionTypes.PRESS_DOWN) {
        nextValue = subtract(nextValue, incrementalValue);
      }

      nextValue = roundClamp(nextValue, min, max, incrementalValue);
      state.value = nextValue;
    }
    /**
     * Handles drag to update events
     */


    if (type === inputControlActionTypes.DRAG && isDragEnabled) {
      var delta = payload.delta,
          shiftKey = payload.shiftKey;

      var _delta = _slicedToArray(delta, 2),
          x = _delta[0],
          y = _delta[1];

      var modifier = shiftKey ? shiftStep : 1;
      var directionModifier;
      var directionBaseValue;

      switch (dragDirection) {
        case 'n':
          directionBaseValue = y;
          directionModifier = -1;
          break;

        case 'e':
          directionBaseValue = x;
          directionModifier = isRtl ? -1 : 1;
          break;

        case 's':
          directionBaseValue = y;
          directionModifier = 1;
          break;

        case 'w':
          directionBaseValue = x;
          directionModifier = isRtl ? 1 : -1;
          break;
      }

      var distance = directionBaseValue * modifier * directionModifier;

      var _nextValue;

      if (distance !== 0) {
        _nextValue = roundClamp(add(currentValue, distance), min, max, modifier);
        state.value = _nextValue;
      }
    }
    /**
     * Handles ENTER key press and submit
     */


    if (type === inputControlActionTypes.PRESS_ENTER || type === inputControlActionTypes.SUBMIT) {
      state.value = roundClamp(currentValue, min, max);
    }

    return state;
  };

  return createElement(Input, _extends({
    autoComplete: autoComplete,
    inputMode: "numeric"
  }, props, {
    className: classes,
    dragDirection: dragDirection,
    hideHTMLArrows: hideHTMLArrows,
    isDragEnabled: isDragEnabled,
    label: label,
    max: max,
    min: min,
    ref: ref,
    type: typeProp,
    value: initialValue,
    __unstableStateReducer: composeStateReducers(numberControlStateReducer, stateReducer)
  }));
}
export default forwardRef(NumberControl);
//# sourceMappingURL=index.js.map