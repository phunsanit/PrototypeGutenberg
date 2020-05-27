"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ImageSizeControl = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ImageSizeControl, _Component);

  var _super = _createSuper(ImageSizeControl);

  /**
   * Run additional operations during component initialization.
   *
   * @param {Object} props
   */
  function ImageSizeControl(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ImageSizeControl);
    _this = _super.call(this, props);
    _this.updateDimensions = _this.updateDimensions.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ImageSizeControl, [{
    key: "updateDimensions",
    value: function updateDimensions() {
      var _this2 = this;

      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return function () {
        _this2.props.onChange({
          width: width,
          height: height
        });
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          imageWidth = _this$props.imageWidth,
          imageHeight = _this$props.imageHeight,
          _this$props$imageSize = _this$props.imageSizeOptions,
          imageSizeOptions = _this$props$imageSize === void 0 ? [] : _this$props$imageSize,
          _this$props$isResizab = _this$props.isResizable,
          isResizable = _this$props$isResizab === void 0 ? true : _this$props$isResizab,
          slug = _this$props.slug,
          width = _this$props.width,
          height = _this$props.height,
          _onChange = _this$props.onChange,
          _this$props$onChangeI = _this$props.onChangeImage,
          onChangeImage = _this$props$onChangeI === void 0 ? _lodash.noop : _this$props$onChangeI;
      return (0, _element.createElement)(_element.Fragment, null, !(0, _lodash.isEmpty)(imageSizeOptions) && (0, _element.createElement)(_components.SelectControl, {
        label: (0, _i18n.__)('Image size'),
        value: slug,
        options: imageSizeOptions,
        onChange: onChangeImage
      }), isResizable && (0, _element.createElement)("div", {
        className: "block-editor-image-size-control"
      }, (0, _element.createElement)("p", {
        className: "block-editor-image-size-control__row"
      }, (0, _i18n.__)('Image dimensions')), (0, _element.createElement)("div", {
        className: "block-editor-image-size-control__row"
      }, (0, _element.createElement)(_components.TextControl, {
        type: "number",
        className: "block-editor-image-size-control__width",
        label: (0, _i18n.__)('Width'),
        value: width || imageWidth || '',
        min: 1,
        onChange: function onChange(value) {
          return _onChange({
            width: parseInt(value, 10)
          });
        }
      }), (0, _element.createElement)(_components.TextControl, {
        type: "number",
        className: "block-editor-image-size-control__height",
        label: (0, _i18n.__)('Height'),
        value: height || imageHeight || '',
        min: 1,
        onChange: function onChange(value) {
          return _onChange({
            height: parseInt(value, 10)
          });
        }
      })), (0, _element.createElement)("div", {
        className: "block-editor-image-size-control__row"
      }, (0, _element.createElement)(_components.ButtonGroup, {
        "aria-label": (0, _i18n.__)('Image Size')
      }, [25, 50, 75, 100].map(function (scale) {
        var scaledWidth = Math.round(imageWidth * (scale / 100));
        var scaledHeight = Math.round(imageHeight * (scale / 100));
        var isCurrent = width === scaledWidth && height === scaledHeight;
        return (0, _element.createElement)(_components.Button, {
          key: scale,
          isSmall: true,
          isPrimary: isCurrent,
          isPressed: isCurrent,
          onClick: _this3.updateDimensions(scaledWidth, scaledHeight)
        }, scale, "%");
      })), (0, _element.createElement)(_components.Button, {
        isSmall: true,
        onClick: this.updateDimensions()
      }, (0, _i18n.__)('Reset')))));
    }
  }]);
  return ImageSizeControl;
}(_element.Component);

var _default = ImageSizeControl;
exports.default = _default;
//# sourceMappingURL=index.js.map