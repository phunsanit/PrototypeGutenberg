import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useState, forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { inputControlActionTypes, composeStateReducers } from '../input-control/state';
import { Root, ValueInput } from './styles/unit-control-styles';
import UnitSelectControl from './unit-select-control';
import { CSS_UNITS, getParsedValue, getValidParsedUnit } from './utils';

function UnitControl(_ref, ref) {
  var _ref$__unstableStateR = _ref.__unstableStateReducer,
      stateReducer = _ref$__unstableStateR === void 0 ? function (state) {
    return state;
  } : _ref$__unstableStateR,
      _ref$autoComplete = _ref.autoComplete,
      autoComplete = _ref$autoComplete === void 0 ? 'off' : _ref$autoComplete,
      className = _ref.className,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$disableUnits = _ref.disableUnits,
      disableUnits = _ref$disableUnits === void 0 ? false : _ref$disableUnits,
      _ref$isPressEnterToCh = _ref.isPressEnterToChange,
      isPressEnterToChange = _ref$isPressEnterToCh === void 0 ? false : _ref$isPressEnterToCh,
      _ref$isResetValueOnUn = _ref.isResetValueOnUnitChange,
      isResetValueOnUnitChange = _ref$isResetValueOnUn === void 0 ? false : _ref$isResetValueOnUn,
      _ref$isUnitSelectTabb = _ref.isUnitSelectTabbable,
      isUnitSelectTabbable = _ref$isUnitSelectTabb === void 0 ? false : _ref$isUnitSelectTabb,
      label = _ref.label,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$onUnitChange = _ref.onUnitChange,
      onUnitChange = _ref$onUnitChange === void 0 ? noop : _ref$onUnitChange,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size,
      style = _ref.style,
      unitProp = _ref.unit,
      _ref$units = _ref.units,
      units = _ref$units === void 0 ? CSS_UNITS : _ref$units,
      valueProp = _ref.value,
      props = _objectWithoutProperties(_ref, ["__unstableStateReducer", "autoComplete", "className", "disabled", "disableUnits", "isPressEnterToChange", "isResetValueOnUnitChange", "isUnitSelectTabbable", "label", "onChange", "onUnitChange", "size", "style", "unit", "units", "value"]);

  var _getParsedValue = getParsedValue(valueProp, unitProp, units),
      _getParsedValue2 = _slicedToArray(_getParsedValue, 2),
      value = _getParsedValue2[0],
      initialUnit = _getParsedValue2[1];

  var _useState = useState(initialUnit),
      _useState2 = _slicedToArray(_useState, 2),
      unit = _useState2[0],
      setUnit = _useState2[1];

  var classes = classnames('components-unit-control', className);

  var handleOnChange = function handleOnChange(next, changeProps) {
    /**
     * Customizing the onChange callback.
     * This allows as to broadcast a combined value+unit to onChange.
     */
    var _getValidParsedUnit = getValidParsedUnit(next, units, value, unit),
        _getValidParsedUnit2 = _slicedToArray(_getValidParsedUnit, 2),
        parsedValue = _getValidParsedUnit2[0],
        parsedUnit = _getValidParsedUnit2[1];

    var nextValue = "".concat(parsedValue).concat(parsedUnit);
    onChange(nextValue, changeProps);
  };

  var handleOnUnitChange = function handleOnUnitChange(next, changeProps) {
    var data = changeProps.data;
    var nextValue = "".concat(value).concat(next);

    if (isResetValueOnUnitChange && (data === null || data === void 0 ? void 0 : data.default) !== undefined) {
      nextValue = "".concat(data.default).concat(next);
    }

    onChange(nextValue, changeProps);
    onUnitChange(next, changeProps);
    setUnit(next);
  };
  /**
   * "Middleware" function that intercepts updates from InputControl.
   * This allows us to tap into actions to transform the (next) state for
   * InputControl.
   *
   * @param {Object} state State from InputControl
   * @param {Object} action Action triggering state change
   * @return {Object} The updated state to apply to InputControl
   */


  var unitControlStateReducer = function unitControlStateReducer(state, action) {
    var type = action.type,
        payload = action.payload;
    var event = payload === null || payload === void 0 ? void 0 : payload.event;
    /**
     * Customizes the commit interaction.
     *
     * This occurs when pressing ENTER to fire a change.
     * By intercepting the state change, we can parse the incoming
     * value to determine if the unit needs to be updated.
     */

    if (type === inputControlActionTypes.COMMIT) {
      var _event$target;

      var valueToParse = event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value;

      var _getValidParsedUnit3 = getValidParsedUnit(valueToParse, units, value, unit),
          _getValidParsedUnit4 = _slicedToArray(_getValidParsedUnit3, 2),
          parsedValue = _getValidParsedUnit4[0],
          parsedUnit = _getValidParsedUnit4[1];

      state.value = parsedValue; // Update unit if the incoming parsed unit is different.

      if (unit !== parsedUnit) {
        handleOnUnitChange(parsedUnit, {
          event: event
        });
      }
    }

    return state;
  };

  var inputSuffix = !disableUnits ? createElement(UnitSelectControl, {
    disabled: disabled,
    isTabbable: isUnitSelectTabbable,
    options: units,
    onChange: handleOnUnitChange,
    size: size,
    value: unit
  }) : null;
  return createElement(Root, {
    className: "components-unit-control-wrapper",
    style: style
  }, createElement(ValueInput, _extends({
    "aria-label": label,
    type: isPressEnterToChange ? 'text' : 'number'
  }, props, {
    autoComplete: autoComplete,
    className: classes,
    disabled: disabled,
    disableUnits: disableUnits,
    isPressEnterToChange: isPressEnterToChange,
    label: label,
    onChange: handleOnChange,
    ref: ref,
    size: size,
    suffix: inputSuffix,
    value: value,
    __unstableStateReducer: composeStateReducers(unitControlStateReducer, stateReducer)
  })));
}

var ForwardedUnitControl = forwardRef(UnitControl);
export default ForwardedUnitControl;
//# sourceMappingURL=index.js.map