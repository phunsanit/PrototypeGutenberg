"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _richText = require("@wordpress/rich-text");

var _htmlEntities = require("@wordpress/html-entities");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _style = _interopRequireDefault(require("./style.scss"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PostTitle = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(PostTitle, _Component);

  var _super = _createSuper(PostTitle);

  function PostTitle() {
    (0, _classCallCheck2.default)(this, PostTitle);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(PostTitle, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Unselect if any other block is selected
      if (this.props.isSelected && !prevProps.isAnyBlockSelected && this.props.isAnyBlockSelected) {
        this.props.onUnselect();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.innerRef) {
        this.props.innerRef(this);
      }
    }
  }, {
    key: "handleFocusOutside",
    value: function handleFocusOutside() {
      this.props.onUnselect();
    }
  }, {
    key: "focus",
    value: function focus() {
      this.props.onSelect();
    }
  }, {
    key: "onPaste",
    value: function onPaste(_ref) {
      var value = _ref.value,
          onChange = _ref.onChange,
          plainText = _ref.plainText;
      var content = (0, _blocks.pasteHandler)({
        plainText: plainText,
        mode: 'INLINE',
        tagName: 'p'
      });

      if (typeof content === 'string') {
        var valueToInsert = (0, _richText.create)({
          html: content
        });
        onChange((0, _richText.insert)(value, valueToInsert));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          style = _this$props.style,
          title = _this$props.title,
          focusedBorderColor = _this$props.focusedBorderColor,
          borderStyle = _this$props.borderStyle,
          isDimmed = _this$props.isDimmed;
      var decodedPlaceholder = (0, _htmlEntities.decodeEntities)(placeholder);
      var borderColor = this.props.isSelected ? focusedBorderColor : 'transparent';
      return (0, _element.createElement)(_reactNative.View, {
        style: [_style.default.titleContainer, borderStyle, {
          borderColor: borderColor
        }, isDimmed && _style.default.dimmed],
        accessible: !this.props.isSelected,
        accessibilityLabel: (0, _lodash.isEmpty)(title) ?
        /* translators: accessibility text. empty post title. */
        (0, _i18n.__)('Post title. Empty') : (0, _i18n.sprintf)(
        /* translators: accessibility text. %s: text content of the post title. */
        (0, _i18n.__)('Post title. %s'), title)
      }, (0, _element.createElement)(_richText.__experimentalRichText, {
        tagName: 'p',
        tagsToEliminate: ['strong'],
        unstableOnFocus: this.props.onSelect,
        onBlur: this.props.onBlur // always assign onBlur as a props
        ,
        multiline: false,
        style: style,
        styles: _style.default,
        fontSize: 24,
        fontWeight: 'bold',
        deleteEnter: true,
        onChange: function onChange(value) {
          _this.props.onUpdate(value);
        },
        onPaste: this.onPaste,
        placeholder: decodedPlaceholder,
        value: title,
        onSelectionChange: function onSelectionChange() {},
        onEnter: this.props.onEnterPress,
        disableEditingMenu: true,
        __unstableIsSelected: this.props.isSelected,
        __unstableOnCreateUndoLevel: function __unstableOnCreateUndoLevel() {}
      }));
    }
  }]);
  return PostTitle;
}(_element.Component);

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isPostTitleSelected = _select.isPostTitleSelected;

  var _select2 = select('core/block-editor'),
      getSelectedBlockClientId = _select2.getSelectedBlockClientId,
      getBlockRootClientId = _select2.getBlockRootClientId;

  var selectedId = getSelectedBlockClientId();
  var selectionIsNested = !!getBlockRootClientId(selectedId);
  return {
    isAnyBlockSelected: !!selectedId,
    isSelected: isPostTitleSelected(),
    isDimmed: selectionIsNested
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      undo = _dispatch.undo,
      redo = _dispatch.redo,
      togglePostTitleSelection = _dispatch.togglePostTitleSelection;

  var _dispatch2 = dispatch('core/block-editor'),
      clearSelectedBlock = _dispatch2.clearSelectedBlock,
      insertDefaultBlock = _dispatch2.insertDefaultBlock;

  return {
    onEnterPress: function onEnterPress() {
      insertDefaultBlock(undefined, undefined, 0);
    },
    onUndo: undo,
    onRedo: redo,
    onSelect: function onSelect() {
      togglePostTitleSelection(true);
      clearSelectedBlock();
    },
    onUnselect: function onUnselect() {
      togglePostTitleSelection(false);
    }
  };
}), _compose.withInstanceId, _components.withFocusOutside)(PostTitle);

exports.default = _default;
//# sourceMappingURL=index.native.js.map