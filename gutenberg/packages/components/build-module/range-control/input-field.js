import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { ENTER } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import { useControlledState } from '../utils/hooks';
import { InputNumber } from './styles/range-control-styles';
export default function InputField(_ref) {
  var label = _ref.label,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? noop : _ref$onBlur,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$onReset = _ref.onReset,
      onReset = _ref$onReset === void 0 ? noop : _ref$onReset,
      _ref$onKeyDown = _ref.onKeyDown,
      onKeyDown = _ref$onKeyDown === void 0 ? noop : _ref$onKeyDown,
      valueProp = _ref.value,
      props = _objectWithoutProperties(_ref, ["label", "onBlur", "onChange", "onReset", "onKeyDown", "value"]);

  /**
   * This component stores an internal (input) value state, derived from
   * the incoming value prop.
   *
   * This allows for the <input /> to be updated independently before the
   * value is applied and propagated. This independent updating action is
   * necessary to accommodate individual keystroke values that may not
   * be considered "valid" (e.g. within the min - max range).
   */
  var _useControlledState = useControlledState(valueProp),
      _useControlledState2 = _slicedToArray(_useControlledState, 2),
      value = _useControlledState2[0],
      setValue = _useControlledState2[1];

  var handleOnReset = function handleOnReset(event) {
    onReset(event);
    setValue('');
  };

  var handleOnCommit = function handleOnCommit(event) {
    var nextValue = parseFloat(event.target.value);

    if (isNaN(nextValue)) {
      handleOnReset();
      return;
    } // Only propagate the event if the value is valid.


    if (event.target.checkValidity && !event.target.checkValidity()) {
      // Otherwise... reset to initial value
      setValue(valueProp);
      return;
    }

    onChange(event);
  };

  var handleOnBlur = function handleOnBlur(event) {
    onBlur(event);
    handleOnCommit(event);
  };

  var handleOnChange = function handleOnChange(event) {
    setValue(event.target.value);
    /**
     * Prevent submitting if changes are invalid.
     * This only applies to values being entered via KEY_DOWN.
     *
     * Pressing the up/down arrows of the HTML input also triggers a
     * change event. However, those values will be (pre)validated by the
     * HTML input.
     */

    if (event.target.checkValidity && !event.target.checkValidity()) {
      return;
    }

    handleOnCommit(event);
  };

  var handleOnKeyDown = function handleOnKeyDown(event) {
    var keyCode = event.keyCode;
    onKeyDown(event);

    if (keyCode === ENTER) {
      event.preventDefault();
      handleOnCommit(event);
    }
  };

  return createElement(InputNumber, _extends({
    "aria-label": label,
    className: "components-range-control__number",
    inputMode: "decimal",
    onBlur: handleOnBlur,
    onChange: handleOnChange,
    onKeyDown: handleOnKeyDown,
    type: "number",
    value: value
  }, props));
}
//# sourceMappingURL=input-field.js.map