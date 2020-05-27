"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.image = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

var _keycodes = require("@wordpress/keycodes");

var _icons = require("@wordpress/icons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ALLOWED_MEDIA_TYPES = ['image'];
var name = 'core/image';
var title = (0, _i18n.__)('Inline image');

var stopKeyPropagation = function stopKeyPropagation(event) {
  return event.stopPropagation();
};

function getRange() {
  var selection = window.getSelection();
  return selection.rangeCount ? selection.getRangeAt(0) : null;
}

var image = {
  name: name,
  title: title,
  keywords: [(0, _i18n.__)('photo'), (0, _i18n.__)('media')],
  object: true,
  tagName: 'img',
  className: null,
  attributes: {
    className: 'class',
    style: 'style',
    url: 'src',
    alt: 'alt'
  },
  edit: /*#__PURE__*/function (_Component) {
    (0, _inherits2.default)(ImageEdit, _Component);

    var _super = _createSuper(ImageEdit);

    function ImageEdit() {
      var _this;

      (0, _classCallCheck2.default)(this, ImageEdit);
      _this = _super.apply(this, arguments);
      _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
      _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)(_this));
      _this.openModal = _this.openModal.bind((0, _assertThisInitialized2.default)(_this));
      _this.closeModal = _this.closeModal.bind((0, _assertThisInitialized2.default)(_this));
      _this.anchorRef = null;
      _this.state = {
        modal: false
      };
      return _this;
    }

    (0, _createClass2.default)(ImageEdit, [{
      key: "onChange",
      value: function onChange(width) {
        this.setState({
          width: width
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if ([_keycodes.LEFT, _keycodes.DOWN, _keycodes.RIGHT, _keycodes.UP, _keycodes.BACKSPACE, _keycodes.ENTER].indexOf(event.keyCode) > -1) {
          // Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
          event.stopPropagation();
        }
      }
    }, {
      key: "openModal",
      value: function openModal() {
        this.setState({
          modal: true
        });
      }
    }, {
      key: "closeModal",
      value: function closeModal() {
        this.setState({
          modal: false
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.anchorRef = getRange();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        // When the popover is open or when the selected image changes,
        // update the anchorRef.
        if (!prevProps.isObjectActive && this.props.isObjectActive || prevProps.activeObjectAttributes.url !== this.props.activeObjectAttributes.url) {
          this.anchorRef = getRange();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange,
            onFocus = _this$props.onFocus,
            isObjectActive = _this$props.isObjectActive,
            activeObjectAttributes = _this$props.activeObjectAttributes;
        return (0, _element.createElement)(_blockEditor.MediaUploadCheck, null, (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
          icon: (0, _element.createElement)(_components.SVG, {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
          }, (0, _element.createElement)(_components.Path, {
            d: "M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z"
          })),
          title: title,
          onClick: this.openModal,
          isActive: isObjectActive
        }), this.state.modal && (0, _element.createElement)(_blockEditor.MediaUpload, {
          allowedTypes: ALLOWED_MEDIA_TYPES,
          onSelect: function onSelect(_ref) {
            var id = _ref.id,
                url = _ref.url,
                alt = _ref.alt,
                width = _ref.width;

            _this2.closeModal();

            onChange((0, _richText.insertObject)(value, {
              type: name,
              attributes: {
                className: "wp-image-".concat(id),
                style: "width: ".concat(Math.min(width, 150), "px;"),
                url: url,
                alt: alt
              }
            }));
            onFocus();
          },
          onClose: this.closeModal,
          render: function render(_ref2) {
            var open = _ref2.open;
            open();
            return null;
          }
        }), isObjectActive && (0, _element.createElement)(_components.Popover, {
          position: "bottom center",
          focusOnMount: false,
          anchorRef: this.anchorRef
        }, (0, _element.createElement)("form", {
          className: "block-editor-format-toolbar__image-container-content",
          onKeyPress: stopKeyPropagation,
          onKeyDown: this.onKeyDown,
          onSubmit: function onSubmit(event) {
            var newReplacements = value.replacements.slice();
            newReplacements[value.start] = {
              type: name,
              attributes: _objectSpread({}, activeObjectAttributes, {
                style: "width: ".concat(_this2.state.width, "px;")
              })
            };
            onChange(_objectSpread({}, value, {
              replacements: newReplacements
            }));
            event.preventDefault();
          }
        }, (0, _element.createElement)(_components.TextControl, {
          className: "block-editor-format-toolbar__image-container-value",
          type: "number",
          label: (0, _i18n.__)('Width'),
          value: this.state.width,
          min: 1,
          onChange: this.onChange
        }), (0, _element.createElement)(_components.Button, {
          icon: _icons.keyboardReturn,
          label: (0, _i18n.__)('Apply'),
          type: "submit"
        }))));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        var style = props.activeObjectAttributes.style;

        if (style === state.previousStyle) {
          return null;
        }

        if (!style) {
          return {
            width: undefined,
            previousStyle: style
          };
        }

        return {
          width: style.replace(/\D/g, ''),
          previousStyle: style
        };
      }
    }]);
    return ImageEdit;
  }(_element.Component)
};
exports.image = image;
//# sourceMappingURL=index.js.map