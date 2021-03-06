"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MediaEdit = exports.MEDIA_EDITOR = exports.MEDIA_TYPE_IMAGE = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactNativeGutenbergBridge = require("react-native-gutenberg-bridge");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MEDIA_TYPE_IMAGE = 'image';
exports.MEDIA_TYPE_IMAGE = MEDIA_TYPE_IMAGE;
var MEDIA_EDITOR = 'MEDIA_EDITOR';
exports.MEDIA_EDITOR = MEDIA_EDITOR;
var editOption = {
  id: MEDIA_EDITOR,
  value: MEDIA_EDITOR,
  label: (0, _i18n.__)('Edit'),
  types: [MEDIA_TYPE_IMAGE],
  icon: _icons.brush
};
var replaceOption = {
  id: _reactNativeGutenbergBridge.mediaSources.deviceLibrary,
  value: _reactNativeGutenbergBridge.mediaSources.deviceLibrary,
  label: (0, _i18n.__)('Replace'),
  types: [MEDIA_TYPE_IMAGE],
  icon: _icons.update
};
var options = [editOption, replaceOption];

var MediaEdit = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(MediaEdit, _React$Component);

  var _super = _createSuper(MediaEdit);

  function MediaEdit(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MediaEdit);
    _this = _super.call(this, props);
    _this.onPickerPresent = _this.onPickerPresent.bind((0, _assertThisInitialized2.default)(_this));
    _this.onPickerSelect = _this.onPickerSelect.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(MediaEdit, [{
    key: "getMediaOptionsItems",
    value: function getMediaOptionsItems() {
      return options;
    }
  }, {
    key: "onPickerPresent",
    value: function onPickerPresent() {
      if (this.picker) {
        this.picker.presentPicker();
      }
    }
  }, {
    key: "onPickerSelect",
    value: function onPickerSelect(value) {
      var _this$props = this.props,
          onSelect = _this$props.onSelect,
          _this$props$multiple = _this$props.multiple,
          multiple = _this$props$multiple === void 0 ? false : _this$props$multiple;

      switch (value) {
        case MEDIA_EDITOR:
          (0, _reactNativeGutenbergBridge.requestMediaEditor)(this.props.source.uri, function (media) {
            if (multiple && media || media && media.id) {
              onSelect(media);
            }
          });
          break;

        default:
          this.props.openReplaceMediaOptions();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var mediaOptions = function mediaOptions() {
        return (0, _element.createElement)(_components.Picker, {
          hideCancelButton: true,
          ref: function ref(instance) {
            return _this2.picker = instance;
          },
          options: _this2.getMediaOptionsItems(),
          onChange: _this2.onPickerSelect
        });
      };

      return this.props.render({
        open: this.onPickerPresent,
        mediaOptions: mediaOptions
      });
    }
  }]);
  return MediaEdit;
}(_react.default.Component);

exports.MediaEdit = MediaEdit;
var _default = MediaEdit;
exports.default = _default;
//# sourceMappingURL=index.native.js.map