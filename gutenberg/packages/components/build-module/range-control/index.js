import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { clamp, isFinite, noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useRef, useState, forwardRef } from '@wordpress/element';
import { compose, withInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BaseControl from '../base-control';
import Button from '../button';
import Icon from '../icon';
import { color } from '../utils/colors';
import { floatClamp, useControlledRangeValue, useDebouncedHoverInteraction } from './utils';
import RangeRail from './rail';
import SimpleTooltip from './tooltip';
import { ActionRightWrapper, AfterIconWrapper, BeforeIconWrapper, InputRange, Root, Track, ThumbWrapper, Thumb, Wrapper } from './styles/range-control-styles';
import InputField from './input-field';
import { useRTL } from '../utils/rtl';
var BaseRangeControl = forwardRef(function (_ref, ref) {
  var _inputRef$current;

  var afterIcon = _ref.afterIcon,
      _ref$allowReset = _ref.allowReset,
      allowReset = _ref$allowReset === void 0 ? false : _ref$allowReset,
      beforeIcon = _ref.beforeIcon,
      className = _ref.className,
      currentInput = _ref.currentInput,
      _ref$color = _ref.color,
      colorProp = _ref$color === void 0 ? color('blue.wordpress.700') : _ref$color,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      help = _ref.help,
      instanceId = _ref.instanceId,
      initialPosition = _ref.initialPosition,
      label = _ref.label,
      _ref$marks = _ref.marks,
      marks = _ref$marks === void 0 ? false : _ref$marks,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 100 : _ref$max,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? noop : _ref$onBlur,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? noop : _ref$onFocus,
      _ref$onMouseMove = _ref.onMouseMove,
      onMouseMove = _ref$onMouseMove === void 0 ? noop : _ref$onMouseMove,
      _ref$onMouseLeave = _ref.onMouseLeave,
      onMouseLeave = _ref$onMouseLeave === void 0 ? noop : _ref$onMouseLeave,
      resetFallbackValue = _ref.resetFallbackValue,
      _ref$renderTooltipCon = _ref.renderTooltipContent,
      renderTooltipContent = _ref$renderTooltipCon === void 0 ? function (v) {
    return v;
  } : _ref$renderTooltipCon,
      showTooltipProp = _ref.showTooltip,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      valueProp = _ref.value,
      _ref$withInputField = _ref.withInputField,
      withInputField = _ref$withInputField === void 0 ? true : _ref$withInputField,
      props = _objectWithoutProperties(_ref, ["afterIcon", "allowReset", "beforeIcon", "className", "currentInput", "color", "disabled", "help", "instanceId", "initialPosition", "label", "marks", "max", "min", "onBlur", "onChange", "onFocus", "onMouseMove", "onMouseLeave", "resetFallbackValue", "renderTooltipContent", "showTooltip", "step", "value", "withInputField"]);

  var isRTL = useRTL();
  var sliderValue = valueProp !== undefined ? valueProp : initialPosition;

  var _useControlledRangeVa = useControlledRangeValue({
    min: min,
    max: max,
    value: sliderValue
  }),
      _useControlledRangeVa2 = _slicedToArray(_useControlledRangeVa, 2),
      value = _useControlledRangeVa2[0],
      setValue = _useControlledRangeVa2[1];

  var _useState = useState(showTooltipProp),
      _useState2 = _slicedToArray(_useState, 2),
      showTooltip = _useState2[0],
      setShowTooltip = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var inputRef = useRef();

  var setRef = function setRef(nodeRef) {
    inputRef.current = nodeRef;

    if (ref) {
      ref(nodeRef);
    }
  };

  var isCurrentlyFocused = (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.matches(':focus');
  var isThumbFocused = !disabled && isFocused;
  var isValueReset = value === null;
  var currentValue = value !== undefined ? value : currentInput;
  var inputSliderValue = isValueReset ? '' : currentValue;
  var rangeFillValue = isValueReset ? floatClamp(max / 2, min, max) : value;
  var calculatedFillValue = (value - min) / (max - min) * 100;
  var fillValue = isValueReset ? 50 : calculatedFillValue;
  var fillValueOffset = "".concat(clamp(fillValue, 0, 100), "%");
  var classes = classnames('components-range-control', className);
  var wrapperClasses = classnames('components-range-control__wrapper', !!marks && 'is-marked');
  var id = "inspector-range-control-".concat(instanceId);
  var describedBy = !!help ? "".concat(id, "__help") : undefined;
  var enableTooltip = showTooltipProp !== false && isFinite(value);

  var handleOnChange = function handleOnChange(event) {
    var nextValue = parseFloat(event.target.value);

    if (isNaN(nextValue)) {
      handleOnReset();
      return;
    }

    setValue(nextValue);
    onChange(nextValue);
  };

  var handleOnReset = function handleOnReset() {
    var resetValue = parseFloat(resetFallbackValue);
    var onChangeResetValue = resetValue;

    if (isNaN(resetValue)) {
      resetValue = null;
      onChangeResetValue = undefined;
    }

    setValue(resetValue);
    /**
     * Previously, this callback would always receive undefined as
     * an argument. This behavior is unexpected, specifically
     * when resetFallbackValue is defined.
     *
     * The value of undefined is not ideal. Passing it through
     * to internal <input /> elements would change it from a
     * controlled component to an uncontrolled component.
     *
     * For now, to minimize unexpected regressions, we're going to
     * preserve the undefined callback argument, except when a
     * resetFallbackValue is defined.
     */

    onChange(onChangeResetValue);
  };

  var handleShowTooltip = function handleShowTooltip() {
    return setShowTooltip(true);
  };

  var handleHideTooltip = function handleHideTooltip() {
    return setShowTooltip(false);
  };

  var handleOnBlur = function handleOnBlur(event) {
    onBlur(event);
    setIsFocused(false);
    handleHideTooltip();
  };

  var handleOnFocus = function handleOnFocus(event) {
    onFocus(event);
    setIsFocused(true);
    handleShowTooltip();
  };

  var hoverInteractions = useDebouncedHoverInteraction({
    onShow: handleShowTooltip,
    onHide: handleHideTooltip,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave
  });

  var offsetStyle = _defineProperty({}, isRTL ? 'right' : 'left', fillValueOffset);

  return createElement(BaseControl, {
    className: classes,
    label: label,
    id: id,
    help: help
  }, createElement(Root, {
    className: "components-range-control__root",
    isRTL: isRTL
  }, beforeIcon && createElement(BeforeIconWrapper, null, createElement(Icon, {
    icon: beforeIcon
  })), createElement(Wrapper, {
    className: wrapperClasses,
    color: colorProp,
    marks: !!marks
  }, createElement(InputRange, _extends({}, props, hoverInteractions, {
    "aria-describedby": describedBy,
    "aria-label": label,
    "aria-hidden": false,
    className: "components-range-control__slider",
    disabled: disabled,
    id: id,
    max: max,
    min: min,
    onBlur: handleOnBlur,
    onChange: handleOnChange,
    onFocus: handleOnFocus,
    ref: setRef,
    step: step,
    tabIndex: 0,
    type: "range",
    value: inputSliderValue
  })), createElement(RangeRail, {
    "aria-hidden": true,
    disabled: disabled,
    marks: marks,
    max: max,
    min: min,
    step: step,
    value: rangeFillValue
  }), createElement(Track, {
    "aria-hidden": true,
    className: "components-range-control__track",
    disabled: disabled,
    style: {
      width: fillValueOffset
    }
  }), createElement(ThumbWrapper, {
    style: offsetStyle
  }, createElement(Thumb, {
    "aria-hidden": true,
    isFocused: isThumbFocused
  })), enableTooltip && createElement(SimpleTooltip, {
    className: "components-range-control__tooltip",
    inputRef: inputRef,
    renderTooltipContent: renderTooltipContent,
    show: isCurrentlyFocused || showTooltip,
    style: offsetStyle,
    value: value
  })), afterIcon && createElement(AfterIconWrapper, null, createElement(Icon, {
    icon: afterIcon
  })), withInputField && createElement(InputField, {
    disabled: disabled,
    label: label,
    max: max,
    min: min,
    onChange: handleOnChange,
    onReset: handleOnReset,
    step: step,
    value: inputSliderValue
  }), allowReset && createElement(ActionRightWrapper, null, createElement(Button, {
    className: "components-range-control__reset",
    disabled: disabled || value === undefined,
    isSecondary: true,
    isSmall: true,
    onClick: handleOnReset
  }, __('Reset')))));
});
export var RangeControlNext = compose(withInstanceId)(BaseRangeControl);
export default RangeControlNext;
//# sourceMappingURL=index.js.map