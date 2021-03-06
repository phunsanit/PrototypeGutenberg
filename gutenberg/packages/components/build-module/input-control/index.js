import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
import classNames from 'classnames';
/**
 * WordPress dependencies
 */

import { useInstanceId } from '@wordpress/compose';
import { useState, forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Backdrop from './backdrop';
import InputField from './input-field';
import Label from './label';
import { Container, Root, Suffix } from './styles/input-control-styles';
import { isValueEmpty } from './utils';

function useUniqueId(idProp) {
  var instanceId = useInstanceId(InputControl);
  var id = "inspector-input-control-".concat(instanceId);
  return idProp || id;
}

export function InputControl(_ref, ref) {
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
      onBlur = _ref$onBlur === void 0 ? noop : _ref$onBlur,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? noop : _ref$onFocus,
      _ref$onValidate = _ref.onValidate,
      onValidate = _ref$onValidate === void 0 ? noop : _ref$onValidate,
      _ref$onKeyDown = _ref.onKeyDown,
      onKeyDown = _ref$onKeyDown === void 0 ? noop : _ref$onKeyDown,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size,
      suffix = _ref.suffix,
      value = _ref.value,
      props = _objectWithoutProperties(_ref, ["__unstableStateReducer", "children", "className", "disabled", "hideLabelFromVision", "id", "isPressEnterToChange", "isFloatingLabel", "label", "onBlur", "onChange", "onFocus", "onValidate", "onKeyDown", "size", "suffix", "value"]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var _useState3 = useState(!isValueEmpty(value)),
      _useState4 = _slicedToArray(_useState3, 2),
      isFilled = _useState4[0],
      setIsFilled = _useState4[1];

  var id = useUniqueId(idProp);
  var classes = classNames('components-input-control', className);

  var handleOnBlur = function handleOnBlur(event) {
    onBlur(event);
    setIsFocused(false);
  };

  var handleOnFocus = function handleOnFocus(event) {
    onFocus(event);
    setIsFocused(true);
  };

  var isInputFilled = isFilled || !isValueEmpty(value);
  var isFloating = isFloatingLabel ? isInputFilled || isFocused : false;
  var isFloatingLabelSet = !hideLabelFromVision && isFloatingLabel && label;
  return createElement(Root, {
    className: classes,
    isFloatingLabel: isFloatingLabelSet,
    isFocused: isFocused
  }, createElement(Label, {
    className: "components-input-control__label",
    hideLabelFromVision: hideLabelFromVision,
    htmlFor: id,
    isFilled: isFilled,
    isFloating: isFloating,
    isFloatingLabel: isFloatingLabel,
    size: size
  }, label), createElement(Container, {
    className: "components-input-control__container",
    disabled: disabled,
    isFocused: isFocused
  }, createElement(InputField, _extends({}, props, {
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
  })), suffix && createElement(Suffix, {
    className: "components-input-control__suffix"
  }, suffix), createElement(Backdrop, {
    "aria-hidden": "true",
    disabled: disabled,
    isFloating: isFloating,
    isFloatingLabel: isFloatingLabelSet,
    isFocused: isFocused,
    label: label,
    size: size
  }), children));
}
export default forwardRef(InputControl);
//# sourceMappingURL=index.js.map