"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RangeControlNext = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _baseControl = _interopRequireDefault(require("../base-control"));

var _button = _interopRequireDefault(require("../button"));

var _icon = _interopRequireDefault(require("../icon"));

var _colors = require("../utils/colors");

var _utils = require("./utils");

var _rail = _interopRequireDefault(require("./rail"));

var _tooltip = _interopRequireDefault(require("./tooltip"));

var _rangeControlStyles = require("./styles/range-control-styles");

var _inputField = _interopRequireDefault(require("./input-field"));

var _rtl = require("../utils/rtl");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BaseRangeControl = (0, _element.forwardRef)(function (_ref, ref) {
  var _inputRef$current;

  var afterIcon = _ref.afterIcon,
      _ref$allowReset = _ref.allowReset,
      allowReset = _ref$allowReset === void 0 ? false : _ref$allowReset,
      beforeIcon = _ref.beforeIcon,
      className = _ref.className,
      currentInput = _ref.currentInput,
      _ref$color = _ref.color,
      colorProp = _ref$color === void 0 ? (0, _colors.color)('blue.wordpress.700') : _ref$color,
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
      onBlur = _ref$onBlur === void 0 ? _lodash.noop : _ref$onBlur,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? _lodash.noop : _ref$onChange,
      _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? _lodash.noop : _ref$onFocus,
      _ref$onMouseMove = _ref.onMouseMove,
      onMouseMove = _ref$onMouseMove === void 0 ? _lodash.noop : _ref$onMouseMove,
      _ref$onMouseLeave = _ref.onMouseLeave,
      onMouseLeave = _ref$onMouseLeave === void 0 ? _lodash.noop : _ref$onMouseLeave,
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
      props = (0, _objectWithoutProperties2.default)(_ref, ["afterIcon", "allowReset", "beforeIcon", "className", "currentInput", "color", "disabled", "help", "instanceId", "initialPosition", "label", "marks", "max", "min", "onBlur", "onChange", "onFocus", "onMouseMove", "onMouseLeave", "resetFallbackValue", "renderTooltipContent", "showTooltip", "step", "value", "withInputField"]);
  var isRTL = (0, _rtl.useRTL)();
  var sliderValue = valueProp !== undefined ? valueProp : initialPosition;

  var _useControlledRangeVa = (0, _utils.useControlledRangeValue)({
    min: min,
    max: max,
    value: sliderValue
  }),
      _useControlledRangeVa2 = (0, _slicedToArray2.default)(_useControlledRangeVa, 2),
      value = _useControlledRangeVa2[0],
      setValue = _useControlledRangeVa2[1];

  var _useState = (0, _element.useState)(showTooltipProp),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showTooltip = _useState2[0],
      setShowTooltip = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var inputRef = (0, _element.useRef)();

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
  var rangeFillValue = isValueReset ? (0, _utils.floatClamp)(max / 2, min, max) : value;
  var calculatedFillValue = (value - min) / (max - min) * 100;
  var fillValue = isValueReset ? 50 : calculatedFillValue;
  var fillValueOffset = "".concat((0, _lodash.clamp)(fillValue, 0, 100), "%");
  var classes = (0, _classnames.default)('components-range-control', className);
  var wrapperClasses = (0, _classnames.default)('components-range-control__wrapper', !!marks && 'is-marked');
  var id = "inspector-range-control-".concat(instanceId);
  var describedBy = !!help ? "".concat(id, "__help") : undefined;
  var enableTooltip = showTooltipProp !== false && (0, _lodash.isFinite)(value);

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

  var hoverInteractions = (0, _utils.useDebouncedHoverInteraction)({
    onShow: handleShowTooltip,
    onHide: handleHideTooltip,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave
  });
  var offsetStyle = (0, _defineProperty2.default)({}, isRTL ? 'right' : 'left', fillValueOffset);
  return (0, _element.createElement)(_baseControl.default, {
    className: classes,
    label: label,
    id: id,
    help: help
  }, (0, _element.createElement)(_rangeControlStyles.Root, {
    className: "components-range-control__root",
    isRTL: isRTL
  }, beforeIcon && (0, _element.createElement)(_rangeControlStyles.BeforeIconWrapper, null, (0, _element.createElement)(_icon.default, {
    icon: beforeIcon
  })), (0, _element.createElement)(_rangeControlStyles.Wrapper, {
    className: wrapperClasses,
    color: colorProp,
    marks: !!marks
  }, (0, _element.createElement)(_rangeControlStyles.InputRange, (0, _extends2.default)({}, props, hoverInteractions, {
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
  })), (0, _element.createElement)(_rail.default, {
    "aria-hidden": true,
    disabled: disabled,
    marks: marks,
    max: max,
    min: min,
    step: step,
    value: rangeFillValue
  }), (0, _element.createElement)(_rangeControlStyles.Track, {
    "aria-hidden": true,
    className: "components-range-control__track",
    disabled: disabled,
    style: {
      width: fillValueOffset
    }
  }), (0, _element.createElement)(_rangeControlStyles.ThumbWrapper, {
    style: offsetStyle
  }, (0, _element.createElement)(_rangeControlStyles.Thumb, {
    "aria-hidden": true,
    isFocused: isThumbFocused
  })), enableTooltip && (0, _element.createElement)(_tooltip.default, {
    className: "components-range-control__tooltip",
    inputRef: inputRef,
    renderTooltipContent: renderTooltipContent,
    show: isCurrentlyFocused || showTooltip,
    style: offsetStyle,
    value: value
  })), afterIcon && (0, _element.createElement)(_rangeControlStyles.AfterIconWrapper, null, (0, _element.createElement)(_icon.default, {
    icon: afterIcon
  })), withInputField && (0, _element.createElement)(_inputField.default, {
    disabled: disabled,
    label: label,
    max: max,
    min: min,
    onChange: handleOnChange,
    onReset: handleOnReset,
    step: step,
    value: inputSliderValue
  }), allowReset && (0, _element.createElement)(_rangeControlStyles.ActionRightWrapper, null, (0, _element.createElement)(_button.default, {
    className: "components-range-control__reset",
    disabled: disabled || value === undefined,
    isSecondary: true,
    isSmall: true,
    onClick: handleOnReset
  }, (0, _i18n.__)('Reset')))));
});
var RangeControlNext = (0, _compose.compose)(_compose.withInstanceId)(BaseRangeControl);
exports.RangeControlNext = RangeControlNext;
var _default = RangeControlNext;
exports.default = _default;
//# sourceMappingURL=index.js.map