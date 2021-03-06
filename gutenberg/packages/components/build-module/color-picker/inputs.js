import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { speak } from '@wordpress/a11y';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { DOWN, ENTER, UP } from '@wordpress/keycodes';
import { pure } from '@wordpress/compose';
import { chevronDown } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import Button from '../button';
import TextControl from '../text-control';
import VisuallyHidden from '../visually-hidden';
import { isValidHex } from './utils';
/* Wrapper for TextControl, only used to handle intermediate state while typing. */

export var Input = /*#__PURE__*/function (_Component) {
  _inherits(Input, _Component);

  var _super = _createSuper(Input);

  function Input() {
    var _this;

    _classCallCheck(this, Input);

    _this = _super.apply(this, arguments);
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Input, [{
    key: "handleBlur",
    value: function handleBlur() {
      var _this$props = this.props,
          value = _this$props.value,
          valueKey = _this$props.valueKey,
          onChange = _this$props.onChange,
          source = _this$props.source;
      onChange({
        source: source,
        state: 'commit',
        value: value,
        valueKey: valueKey
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props2 = this.props,
          valueKey = _this$props2.valueKey,
          onChange = _this$props2.onChange,
          source = _this$props2.source;

      if (value.length > 4 && isValidHex(value)) {
        onChange({
          source: source,
          state: 'commit',
          value: value,
          valueKey: valueKey
        });
      } else {
        onChange({
          source: source,
          state: 'draft',
          value: value,
          valueKey: valueKey
        });
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(_ref) {
      var keyCode = _ref.keyCode;

      if (keyCode !== ENTER && keyCode !== UP && keyCode !== DOWN) {
        return;
      }

      var _this$props3 = this.props,
          value = _this$props3.value,
          valueKey = _this$props3.valueKey,
          onChange = _this$props3.onChange,
          source = _this$props3.source;
      onChange({
        source: source,
        state: 'commit',
        value: value,
        valueKey: valueKey
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          label = _this$props4.label,
          value = _this$props4.value,
          props = _objectWithoutProperties(_this$props4, ["label", "value"]);

      return createElement(TextControl, _extends({
        className: "components-color-picker__inputs-field",
        label: label,
        value: value,
        onChange: function onChange(newValue) {
          return _this2.handleChange(newValue);
        },
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
      }, omit(props, ['onChange', 'valueKey', 'source'])));
    }
  }]);

  return Input;
}(Component);
var PureButton = pure(Button);
export var Inputs = /*#__PURE__*/function (_Component2) {
  _inherits(Inputs, _Component2);

  var _super2 = _createSuper(Inputs);

  function Inputs(_ref2) {
    var _this3;

    var hsl = _ref2.hsl;

    _classCallCheck(this, Inputs);

    _this3 = _super2.apply(this, arguments);
    var view = hsl.a === 1 ? 'hex' : 'rgb';
    _this3.state = {
      view: view
    };
    _this3.toggleViews = _this3.toggleViews.bind(_assertThisInitialized(_this3));
    _this3.resetDraftValues = _this3.resetDraftValues.bind(_assertThisInitialized(_this3));
    _this3.handleChange = _this3.handleChange.bind(_assertThisInitialized(_this3));
    _this3.normalizeValue = _this3.normalizeValue.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(Inputs, [{
    key: "toggleViews",
    value: function toggleViews() {
      if (this.state.view === 'hex') {
        this.setState({
          view: 'rgb'
        }, this.resetDraftValues);
        speak(__('RGB mode active'));
      } else if (this.state.view === 'rgb') {
        this.setState({
          view: 'hsl'
        }, this.resetDraftValues);
        speak(__('Hue/saturation/lightness mode active'));
      } else if (this.state.view === 'hsl') {
        if (this.props.hsl.a === 1) {
          this.setState({
            view: 'hex'
          }, this.resetDraftValues);
          speak(__('Hex color mode active'));
        } else {
          this.setState({
            view: 'rgb'
          }, this.resetDraftValues);
          speak(__('RGB mode active'));
        }
      }
    }
  }, {
    key: "resetDraftValues",
    value: function resetDraftValues() {
      return this.props.onChange({
        state: 'reset'
      });
    }
  }, {
    key: "normalizeValue",
    value: function normalizeValue(valueKey, value) {
      if (valueKey !== 'a') {
        return value;
      }

      if (value < 0) {
        return 0;
      } else if (value > 1) {
        return 1;
      }

      return Math.round(value * 100) / 100;
    }
  }, {
    key: "handleChange",
    value: function handleChange(_ref3) {
      var source = _ref3.source,
          state = _ref3.state,
          value = _ref3.value,
          valueKey = _ref3.valueKey;
      this.props.onChange({
        source: source,
        state: state,
        valueKey: valueKey,
        value: this.normalizeValue(valueKey, value)
      });
    }
  }, {
    key: "renderFields",
    value: function renderFields() {
      var _this$props$disableAl = this.props.disableAlpha,
          disableAlpha = _this$props$disableAl === void 0 ? false : _this$props$disableAl;

      if (this.state.view === 'hex') {
        return createElement("div", {
          className: "components-color-picker__inputs-fields"
        }, createElement(Input, {
          source: this.state.view,
          label: __('Color value in hexadecimal'),
          valueKey: "hex",
          value: this.props.hex,
          onChange: this.handleChange
        }));
      } else if (this.state.view === 'rgb') {
        return createElement("fieldset", null, createElement(VisuallyHidden, {
          as: "legend"
        }, __('Color value in RGB')), createElement("div", {
          className: "components-color-picker__inputs-fields"
        }, createElement(Input, {
          source: this.state.view,
          label: "r",
          valueKey: "r",
          value: this.props.rgb.r,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), createElement(Input, {
          source: this.state.view,
          label: "g",
          valueKey: "g",
          value: this.props.rgb.g,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), createElement(Input, {
          source: this.state.view,
          label: "b",
          valueKey: "b",
          value: this.props.rgb.b,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), disableAlpha ? null : createElement(Input, {
          source: this.state.view,
          label: "a",
          valueKey: "a",
          value: this.props.rgb.a,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "1",
          step: "0.01"
        })));
      } else if (this.state.view === 'hsl') {
        return createElement("fieldset", null, createElement(VisuallyHidden, {
          as: "legend"
        }, __('Color value in HSL')), createElement("div", {
          className: "components-color-picker__inputs-fields"
        }, createElement(Input, {
          source: this.state.view,
          label: "h",
          valueKey: "h",
          value: this.props.hsl.h,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "359"
        }), createElement(Input, {
          source: this.state.view,
          label: "s",
          valueKey: "s",
          value: this.props.hsl.s,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "100"
        }), createElement(Input, {
          source: this.state.view,
          label: "l",
          valueKey: "l",
          value: this.props.hsl.l,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "100"
        }), disableAlpha ? null : createElement(Input, {
          source: this.state.view,
          label: "a",
          valueKey: "a",
          value: this.props.hsl.a,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "1",
          step: "0.05"
        })));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "components-color-picker__inputs-wrapper"
      }, this.renderFields(), createElement("div", {
        className: "components-color-picker__inputs-toggle-wrapper"
      }, createElement(PureButton, {
        className: "components-color-picker__inputs-toggle",
        icon: chevronDown,
        label: __('Change color format'),
        onClick: this.toggleViews
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.hsl.a !== 1 && state.view === 'hex') {
        return {
          view: 'rgb'
        };
      }

      return null;
    }
  }]);

  return Inputs;
}(Component);
export default Inputs;
//# sourceMappingURL=inputs.js.map