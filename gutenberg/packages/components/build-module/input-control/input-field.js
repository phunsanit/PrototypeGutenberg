import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
import { useDrag } from 'react-use-gesture';
/**
 * WordPress dependencies
 */

import { useEffect, useRef, forwardRef } from '@wordpress/element';
import { UP, DOWN, ENTER } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import { useDragCursor, isValueEmpty } from './utils';
import { Input } from './styles/input-control-styles';
import { useInputControlStateReducer } from './state';

function InputField(_ref, ref) {
  var _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$dragDirection = _ref.dragDirection,
      dragDirection = _ref$dragDirection === void 0 ? 'n' : _ref$dragDirection,
      _ref$dragThreshold = _ref.dragThreshold,
      dragThreshold = _ref$dragThreshold === void 0 ? 10 : _ref$dragThreshold,
      id = _ref.id,
      _ref$isDragEnabled = _ref.isDragEnabled,
      isDragEnabled = _ref$isDragEnabled === void 0 ? false : _ref$isDragEnabled,
      _ref$isFloating = _ref.isFloating,
      isFloating = _ref$isFloating === void 0 ? false : _ref$isFloating,
      _ref$isFloatingLabelS = _ref.isFloatingLabelSet,
      isFloatingLabelSet = _ref$isFloatingLabelS === void 0 ? false : _ref$isFloatingLabelS,
      _ref$isPressEnterToCh = _ref.isPressEnterToChange,
      isPressEnterToChange = _ref$isPressEnterToCh === void 0 ? false : _ref$isPressEnterToCh,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? noop : _ref$onBlur,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$onDrag = _ref.onDrag,
      onDrag = _ref$onDrag === void 0 ? noop : _ref$onDrag,
      _ref$onDragEnd = _ref.onDragEnd,
      onDragEnd = _ref$onDragEnd === void 0 ? noop : _ref$onDragEnd,
      _ref$onDragStart = _ref.onDragStart,
      onDragStart = _ref$onDragStart === void 0 ? noop : _ref$onDragStart,
      _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? noop : _ref$onFocus,
      _ref$onKeyDown = _ref.onKeyDown,
      onKeyDown = _ref$onKeyDown === void 0 ? noop : _ref$onKeyDown,
      onUpdateValue = _ref.onUpdateValue,
      _ref$onValidate = _ref.onValidate,
      onValidate = _ref$onValidate === void 0 ? noop : _ref$onValidate,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size,
      _ref$stateReducer = _ref.stateReducer,
      stateReducer = _ref$stateReducer === void 0 ? function (state) {
    return state;
  } : _ref$stateReducer,
      valueProp = _ref.value,
      props = _objectWithoutProperties(_ref, ["disabled", "dragDirection", "dragThreshold", "id", "isDragEnabled", "isFloating", "isFloatingLabelSet", "isPressEnterToChange", "onBlur", "onChange", "onDrag", "onDragEnd", "onDragStart", "onFocus", "onKeyDown", "onUpdateValue", "onValidate", "size", "stateReducer", "value"]);

  var _useInputControlState = useInputControlStateReducer(stateReducer, {
    isDragEnabled: isDragEnabled,
    value: valueProp,
    isPressEnterToChange: isPressEnterToChange
  }),
      state = _useInputControlState.state,
      change = _useInputControlState.change,
      commit = _useInputControlState.commit,
      drag = _useInputControlState.drag,
      dragEnd = _useInputControlState.dragEnd,
      dragStart = _useInputControlState.dragStart,
      invalidate = _useInputControlState.invalidate,
      pressDown = _useInputControlState.pressDown,
      pressEnter = _useInputControlState.pressEnter,
      pressUp = _useInputControlState.pressUp,
      reset = _useInputControlState.reset,
      update = _useInputControlState.update;

  var _event = state._event,
      value = state.value,
      isDragging = state.isDragging,
      isDirty = state.isDirty;
  var valueRef = useRef(value);
  var dragCursor = useDragCursor(isDragging, dragDirection);
  useEffect(function () {
    /**
     * Handles syncing incoming value changes with internal state.
     * This effectively enables a "controlled" state.
     * https://reactjs.org/docs/forms.html#controlled-components
     */
    if (valueProp !== valueRef.current) {
      update(valueProp);
      valueRef.current = valueProp; // Quick return to avoid firing the onChange callback

      return;
    }
    /**
     * Fires the onChange callback when internal state value changes.
     */


    if (value !== valueRef.current && !isDirty) {
      onChange(value, {
        event: _event
      });
      onUpdateValue(!isValueEmpty(value));
      valueRef.current = value;
    }
  }, [value, isDirty, valueProp]);

  var handleOnBlur = function handleOnBlur(event) {
    onBlur(event);
    /**
     * If isPressEnterToChange is set, this commits the value to
     * the onChange callback.
     */

    if (isPressEnterToChange && isDirty) {
      if (!isValueEmpty(value)) {
        handleOnCommit({
          target: {
            value: value
          }
        }, event);
      } else {
        reset(valueProp);
      }
    }
  };

  var handleOnFocus = function handleOnFocus(event) {
    onFocus(event);
  };

  var handleOnChange = function handleOnChange(event) {
    var nextValue = event.target.value;
    change(nextValue, event);
  };

  var handleOnCommit = function handleOnCommit(event) {
    var nextValue = event.target.value;

    try {
      onValidate(nextValue, {
        event: event
      });
      commit(nextValue, event);
    } catch (err) {
      invalidate(err, {
        event: event
      });
    }
  };

  var handleOnKeyDown = function handleOnKeyDown(event) {
    var keyCode = event.keyCode;
    onKeyDown(event);

    switch (keyCode) {
      case UP:
        pressUp(event);
        break;

      case DOWN:
        pressDown(event);
        break;

      case ENTER:
        pressEnter(event);

        if (isPressEnterToChange) {
          event.preventDefault();
          handleOnCommit(event);
        }

        break;
    }
  };

  var dragGestureProps = useDrag(function (dragProps) {
    var distance = dragProps.distance,
        dragging = dragProps.dragging,
        event = dragProps.event;
    if (!isDragEnabled) return;
    if (!distance) return;
    event.stopPropagation();
    /**
     * Quick return if no longer dragging.
     * This prevents unnecessary value calculations.
     */

    if (!dragging) {
      onDragEnd(dragProps);
      dragEnd(dragProps);
      return;
    }

    onDrag(dragProps);
    drag(dragProps);

    if (!isDragging) {
      onDragStart(dragProps);
      dragStart(dragProps);
    }
  }, {
    threshold: dragThreshold,
    enabled: isDragEnabled
  });
  return createElement(Input, _extends({}, props, dragGestureProps(), {
    className: "components-input-control__input",
    disabled: disabled,
    dragCursor: dragCursor,
    isDragging: isDragging,
    id: id,
    isFloating: isFloating,
    isFloatingLabel: isFloatingLabelSet,
    onBlur: handleOnBlur,
    onChange: handleOnChange,
    onFocus: handleOnFocus,
    onKeyDown: handleOnKeyDown,
    ref: ref,
    size: size,
    value: value
  }));
}

var ForwardedComponent = forwardRef(InputField);
export default ForwardedComponent;
//# sourceMappingURL=input-field.js.map