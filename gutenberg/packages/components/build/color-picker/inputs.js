"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Inputs = exports.Input = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _a11y = require("@wordpress/a11y");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _compose = require("@wordpress/compose");

var _icons = require("@wordpress/icons");

var _button = _interopRequireDefault(require("../button"));

var _textControl = _interopRequireDefault(require("../text-control"));

var _visuallyHidden = _interopRequireDefault(require("../visually-hidden"));

var _utils = require("./utils");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* Wrapper for TextControl, only used to handle intermediate state while typing. */
var Input = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Input, _Component);

  var _super = _createSuper(Input);

  function Input() {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = _super.apply(this, arguments);
    _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Input, [{
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

      if (value.length > 4 && (0, _utils.isValidHex)(value)) {
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

      if (keyCode !== _keycodes.ENTER && keyCode !== _keycodes.UP && keyCode !== _keycodes.DOWN) {
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
          props = (0, _objectWithoutProperties2.default)(_this$props4, ["label", "value"]);
      return (0, _element.createElement)(_textControl.default, (0, _extends2.default)({
        className: "components-color-picker__inputs-field",
        label: label,
        value: value,
        onChange: function onChange(newValue) {
          return _this2.handleChange(newValue);
        },
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
      }, (0, _lodash.omit)(props, ['onChange', 'valueKey', 'source'])));
    }
  }]);
  return Input;
}(_element.Component);

exports.Input = Input;
var PureButton = (0, _compose.pure)(_button.default);

var Inputs = /*#__PURE__*/function (_Component2) {
  (0, _inherits2.default)(Inputs, _Component2);

  var _super2 = _createSuper(Inputs);

  function Inputs(_ref2) {
    var _this3;

    var hsl = _ref2.hsl;
    (0, _classCallCheck2.default)(this, Inputs);
    _this3 = _super2.apply(this, arguments);
    var view = hsl.a === 1 ? 'hex' : 'rgb';
    _this3.state = {
      view: view
    };
    _this3.toggleViews = _this3.toggleViews.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.resetDraftValues = _this3.resetDraftValues.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.handleChange = _this3.handleChange.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.normalizeValue = _this3.normalizeValue.bind((0, _assertThisInitialized2.default)(_this3));
    return _this3;
  }

  (0, _createClass2.default)(Inputs, [{
    key: "toggleViews",
    value: function toggleViews() {
      if (this.state.view === 'hex') {
        this.setState({
          view: 'rgb'
        }, this.resetDraftValues);
        (0, _a11y.speak)((0, _i18n.__)('RGB mode active'));
      } else if (this.state.view === 'rgb') {
        this.setState({
          view: 'hsl'
        }, this.resetDraftValues);
        (0, _a11y.speak)((0, _i18n.__)('Hue/saturation/lightness mode active'));
      } else if (this.state.view === 'hsl') {
        if (this.props.hsl.a === 1) {
          this.setState({
            view: 'hex'
          }, this.resetDraftValues);
          (0, _a11y.speak)((0, _i18n.__)('Hex color mode active'));
        } else {
          this.setState({
            view: 'rgb'
          }, this.resetDraftValues);
          (0, _a11y.speak)((0, _i18n.__)('RGB mode active'));
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
        return (0, _element.createElement)("div", {
          className: "components-color-picker__inputs-fields"
        }, (0, _element.createElement)(Input, {
          source: this.state.view,
          label: (0, _i18n.__)('Color value in hexadecimal'),
          valueKey: "hex",
          value: this.props.hex,
          onChange: this.handleChange
        }));
      } else if (this.state.view === 'rgb') {
        return (0, _element.createElement)("fieldset", null, (0, _element.createElement)(_visuallyHidden.default, {
          as: "legend"
        }, (0, _i18n.__)('Color value in RGB')), (0, _element.createElement)("div", {
          className: "components-color-picker__inputs-fields"
        }, (0, _element.createElement)(Input, {
          source: this.state.view,
          label: "r",
          valueKey: "r",
          value: this.props.rgb.r,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), (0, _element.createElement)(Input, {
          source: this.state.view,
          label: "g",
          valueKey: "g",
          value: this.props.rgb.g,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), (0, _element.createElement)(Input, {
          source: this.state.view,
          label: "b",
          valueKey: "b",
          value: this.props.rgb.b,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), disableAlpha ? null : (0, _element.createElement)(Input, {
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
        return (0, _element.createElement)("fieldset", null, (0, _element.createElement)(_visuallyHidden.default, {
          as: "legend"
        }, (0, _i18n.__)('Color value in HSL')), (0, _element.createElement)("div", {
          className: "components-color-picker__inputs-fields"
        }, (0, _element.createElement)(Input, {
          source: this.state.view,
          label: "h",
          valueKey: "h",
          value: this.props.hsl.h,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "359"
        }), (0, _element.createElement)(Input, {
          source: this.state.view,
          label: "s",
          valueKey: "s",
          value: this.props.hsl.s,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "100"
        }), (0, _element.createElement)(Input, {
          source: this.state.view,
          label: "l",
          valueKey: "l",
          value: this.props.hsl.l,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "100"
        }), disableAlpha ? null : (0, _element.createElement)(Input, {
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
      return (0, _element.createElement)("div", {
        className: "components-color-picker__inputs-wrapper"
      }, this.renderFields(), (0, _element.createElement)("div", {
        className: "components-color-picker__inputs-toggle-wrapper"
      }, (0, _element.createElement)(PureButton, {
        className: "components-color-picker__inputs-toggle",
        icon: _icons.chevronDown,
        label: (0, _i18n.__)('Change color format'),
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
}(_element.Component);

exports.Inputs = Inputs;
var _default = Inputs;
exports.default = _default;
//# sourceMappingURL=inputs.js.map