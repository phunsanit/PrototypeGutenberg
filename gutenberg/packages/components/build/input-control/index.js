"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputControl = InputControl;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = require("@wordpress/compose");

var _backdrop = _interopRequireDefault(require("./backdrop"));

var _inputField = _interopRequireDefault(require("./input-field"));

var _label = _interopRequireDefault(require("./label"));

var _inputControlStyles = require("./styles/input-control-styles");

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function useUniqueId(idProp) {
  var instanceId = (0, _compose.useInstanceId)(InputControl);
  var id = "inspector-input-control-".concat(instanceId);
  return idProp || id;
}

function InputControl(_ref, ref) {
  var _ref$__unstableStateR = _ref.__unstableStateReducer,
      stateReducer = _ref$__unstableStateR === void 0 ? function (state) {
    return state;
  } : _ref$__unstableStateR,
      children = _ref.children,
      className = _ref.className,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$hideLabelFromVis = _ref.hideLabelFromVision,
      hideLabelFromVision = _ref$hideLabelFromVis === void 0 ? false : _ref$hideLabelFromVis,
      idProp = _ref.id,
      _ref$isPressEnterToCh = _ref.isPressEnterToChange,
      isPressEnterToChange = _ref$isPressEnterToCh === void 0 ? false : _ref$isPressEnterToCh,
      _ref$isFloatingLabel = _ref.isFloatingLabel,
      isFloatingLabel = _ref$isFloatingLabel === void 0 ? false : _ref$isFloatingLabel,
      label = _ref.label,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? _lodash.noop : _ref$onBlur,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? _lodash.noop : _ref$onChange,
      _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? _lodash.noop : _ref$onFocus,
      _ref$onValidate = _ref.onValidate,
      onValidate = _ref$onValidate === void 0 ? _lodash.noop : _ref$onValidate,
      _ref$onKeyDown = _ref.onKeyDown,
      onKeyDown = _ref$onKeyDown === void 0 ? _lodash.noop : _ref$onKeyDown,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size,
      suffix = _ref.suffix,
      value = _ref.value,
      props = (0, _objectWithoutProperties2.default)(_ref, ["__unstableStateReducer", "children", "className", "disabled", "hideLabelFromVision", "id", "isPressEnterToChange", "isFloatingLabel", "label", "onBlur", "onChange", "onFocus", "onValidate", "onKeyDown", "size", "suffix", "value"]);

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var _useState3 = (0, _element.useState)(!(0, _utils.isValueEmpty)(value)),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isFilled = _useState4[0],
      setIsFilled = _useState4[1];

  var id = useUniqueId(idProp);
  var classes = (0, _classnames.default)('components-input-control', className);

  var handleOnBlur = function handleOnBlur(event) {
    onBlur(event);
    setIsFocused(false);
  };

  var handleOnFocus = function handleOnFocus(event) {
    onFocus(event);
    setIsFocused(true);
  };

  var isInputFilled = isFilled || !(0, _utils.isValueEmpty)(value);
  var isFloating = isFloatingLabel ? isInputFilled || isFocused : false;
  var isFloatingLabelSet = !hideLabelFromVision && isFloatingLabel && label;
  return (0, _element.createElement)(_inputControlStyles.Root, {
    className: classes,
    isFloatingLabel: isFloatingLabelSet,
    isFocused: isFocused
  }, (0, _element.createElement)(_label.default, {
    className: "components-input-control__label",
    hideLabelFromVision: hideLabelFromVision,
    htmlFor: id,
    isFilled: isFilled,
    isFloating: isFloating,
    isFloatingLabel: isFloatingLabel,
    size: size
  }, label), (0, _element.createElement)(_inputControlStyles.Container, {
    className: "components-input-control__container",
    disabled: disabled,
    isFocused: isFocused
  }, (0, _element.createElement)(_inputField.default, (0, _extends2.default)({}, props, {
    className: "components-input-control__input",
    disabled: disabled,
    id: id,
    isFloating: isFloating,
    isFloatingLabelSet: isFloatingLabelSet,
    isPressEnterToChange: isPressEnterToChange,
    onBlur: handleOnBlur,
    onChange: onChange,
    onFocus: handleOnFocus,
    onKeyDown: onKeyDown,
    onUpdateValue: setIsFilled,
    onValidate: onValidate,
    ref: ref,
    setIsFocused: setIsFocused,
    size: size,
    stateReducer: stateReducer,
    value: value
  })), suffix && (0, _element.createElement)(_inputControlStyles.Suffix, {
    className: "components-input-control__suffix"
  }, suffix), (0, _element.createElement)(_backdrop.default, {
    "aria-hidden": "true",
    disabled: disabled,
    isFloating: isFloating,
    isFloatingLabel: isFloatingLabelSet,
    isFocused: isFocused,
    label: label,
    size: size
  }), children));
}

var _default = (0, _element.forwardRef)(InputControl);

exports.default = _default;
//# sourceMappingURL=index.js.map