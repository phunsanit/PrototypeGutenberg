"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _url = require("@wordpress/url");

var _components = require("@wordpress/components");

var _richText = require("@wordpress/rich-text");

var _icons = require("@wordpress/icons");

var _utils = require("./utils");

var _modal = _interopRequireDefault(require("./modal.scss"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ModalLinkUI = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ModalLinkUI, _Component);

  var _super = _createSuper(ModalLinkUI);

  function ModalLinkUI() {
    var _this;

    (0, _classCallCheck2.default)(this, ModalLinkUI);
    _this = _super.apply(this, arguments);
    _this.submitLink = _this.submitLink.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeInputValue = _this.onChangeInputValue.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeText = _this.onChangeText.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeOpensInNewWindow = _this.onChangeOpensInNewWindow.bind((0, _assertThisInitialized2.default)(_this));
    _this.removeLink = _this.removeLink.bind((0, _assertThisInitialized2.default)(_this));
    _this.onDismiss = _this.onDismiss.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      inputValue: '',
      text: '',
      opensInNewWindow: false
    };
    return _this;
  }

  (0, _createClass2.default)(ModalLinkUI, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      if (oldProps === this.props) {
        return;
      }

      var _this$props$activeAtt = this.props.activeAttributes,
          url = _this$props$activeAtt.url,
          target = _this$props$activeAtt.target;
      var opensInNewWindow = target === '_blank';
      this.setState({
        inputValue: url || '',
        text: (0, _richText.getTextContent)((0, _richText.slice)(this.props.value)),
        opensInNewWindow: opensInNewWindow
      });
    }
  }, {
    key: "onChangeInputValue",
    value: function onChangeInputValue(inputValue) {
      this.setState({
        inputValue: inputValue
      });
    }
  }, {
    key: "onChangeText",
    value: function onChangeText(text) {
      this.setState({
        text: text
      });
    }
  }, {
    key: "onChangeOpensInNewWindow",
    value: function onChangeOpensInNewWindow(opensInNewWindow) {
      this.setState({
        opensInNewWindow: opensInNewWindow
      });
    }
  }, {
    key: "submitLink",
    value: function submitLink() {
      var _this$props = this.props,
          isActive = _this$props.isActive,
          onChange = _this$props.onChange,
          speak = _this$props.speak,
          value = _this$props.value;
      var _this$state = this.state,
          inputValue = _this$state.inputValue,
          opensInNewWindow = _this$state.opensInNewWindow,
          text = _this$state.text;
      var url = (0, _url.prependHTTP)(inputValue);
      var linkText = text || inputValue;
      var format = (0, _utils.createLinkFormat)({
        url: url,
        opensInNewWindow: opensInNewWindow,
        text: linkText
      });

      if ((0, _richText.isCollapsed)(value) && !isActive) {
        // insert link
        var toInsert = (0, _richText.applyFormat)((0, _richText.create)({
          text: linkText
        }), format, 0, linkText.length);
        var newAttributes = (0, _richText.insert)(value, toInsert);
        onChange(_objectSpread({}, newAttributes, {
          needsSelectionUpdate: true
        }));
      } else if (text !== (0, _richText.getTextContent)((0, _richText.slice)(value))) {
        // edit text in selected link
        var _toInsert = (0, _richText.applyFormat)((0, _richText.create)({
          text: text
        }), format, 0, text.length);

        var _newAttributes = (0, _richText.insert)(value, _toInsert, value.start, value.end);

        onChange(_objectSpread({}, _newAttributes, {
          needsSelectionUpdate: true
        }));
      } else {
        // transform selected text into link
        var _newAttributes2 = (0, _richText.applyFormat)(value, format);

        onChange(_objectSpread({}, _newAttributes2, {
          needsSelectionUpdate: true
        }));
      }

      if (!(0, _utils.isValidHref)(url)) {
        speak((0, _i18n.__)('Warning: the link has been inserted but may have errors. Please test it.'), 'assertive');
      } else if (isActive) {
        speak((0, _i18n.__)('Link edited.'), 'assertive');
      } else {
        speak((0, _i18n.__)('Link inserted'), 'assertive');
      }

      this.props.onClose();
    }
  }, {
    key: "removeLink",
    value: function removeLink() {
      this.props.onRemove();
      this.props.onClose();
    }
  }, {
    key: "onDismiss",
    value: function onDismiss() {
      if (this.state.inputValue === '') {
        this.removeLink();
      } else {
        this.submitLink();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isVisible = this.props.isVisible;
      var text = this.state.text;
      return (0, _element.createElement)(_components.BottomSheet, {
        isVisible: isVisible,
        onClose: this.onDismiss,
        hideHeader: true
      },
      /* eslint-disable jsx-a11y/no-autofocus */
      (0, _element.createElement)(_components.BottomSheet.Cell, {
        icon: _icons.link,
        label: (0, _i18n.__)('URL'),
        value: this.state.inputValue,
        placeholder: (0, _i18n.__)('Add URL'),
        autoCapitalize: "none",
        autoCorrect: false,
        keyboardType: "url",
        onChangeValue: this.onChangeInputValue,
        onSubmit: this.onDismiss,
        autoFocus: _reactNative.Platform.OS === 'ios'
      })
      /* eslint-enable jsx-a11y/no-autofocus */
      , (0, _element.createElement)(_components.BottomSheet.Cell, {
        icon: _icons.textColor,
        label: (0, _i18n.__)('Link text'),
        value: text,
        placeholder: (0, _i18n.__)('Add link text'),
        onChangeValue: this.onChangeText,
        onSubmit: this.onDismiss
      }), (0, _element.createElement)(_components.BottomSheet.SwitchCell, {
        icon: _icons.external,
        label: (0, _i18n.__)('Open in new tab'),
        value: this.state.opensInNewWindow,
        onValueChange: this.onChangeOpensInNewWindow,
        separatorType: 'fullWidth'
      }), (0, _element.createElement)(_components.BottomSheet.Cell, {
        label: (0, _i18n.__)('Remove link'),
        labelStyle: _modal.default.clearLinkButton,
        separatorType: 'none',
        onPress: this.removeLink
      }));
    }
  }]);
  return ModalLinkUI;
}(_element.Component);

var _default = (0, _components.withSpokenMessages)(ModalLinkUI);

exports.default = _default;
//# sourceMappingURL=modal.native.js.map