"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reactNativeGutenbergBridge = _interopRequireWildcard(require("react-native-gutenberg-bridge"));

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _hooks = require("@wordpress/hooks");

var _index = _interopRequireDefault(require("./index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var postTypeEntities = [{
  name: 'post',
  baseURL: '/wp/v2/posts'
}, {
  name: 'page',
  baseURL: '/wp/v2/pages'
}, {
  name: 'attachment',
  baseURL: '/wp/v2/media'
}, {
  name: 'wp_block',
  baseURL: '/wp/v2/blocks'
}].map(function (postTypeEntity) {
  return _objectSpread({
    kind: 'postType'
  }, postTypeEntity, {
    transientEdits: {
      blocks: true,
      selectionStart: true,
      selectionEnd: true
    },
    mergedEdits: {
      meta: true
    }
  });
});
/**
 * Internal dependencies
 */

var NativeEditorProvider = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(NativeEditorProvider, _Component);

  var _super = _createSuper(NativeEditorProvider);

  function NativeEditorProvider() {
    var _this;

    (0, _classCallCheck2.default)(this, NativeEditorProvider);
    _this = _super.apply(this, arguments); // Keep a local reference to `post` to detect changes

    _this.post = _this.props.post;

    _this.props.addEntities(postTypeEntities);

    _this.props.receiveEntityRecords('postType', _this.post.type, _this.post);

    return _this;
  }

  (0, _createClass2.default)(NativeEditorProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscriptionParentGetHtml = (0, _reactNativeGutenbergBridge.subscribeParentGetHtml)(function () {
        _this2.serializeToNativeAction();
      });
      this.subscriptionParentToggleHTMLMode = (0, _reactNativeGutenbergBridge.subscribeParentToggleHTMLMode)(function () {
        _this2.toggleMode();
      });
      this.subscriptionParentSetTitle = (0, _reactNativeGutenbergBridge.subscribeSetTitle)(function (payload) {
        _this2.props.editTitle(payload.title);
      });
      this.subscriptionParentUpdateHtml = (0, _reactNativeGutenbergBridge.subscribeUpdateHtml)(function (payload) {
        _this2.updateHtmlAction(payload.html);
      });
      this.subscriptionParentMediaAppend = (0, _reactNativeGutenbergBridge.subscribeMediaAppend)(function (payload) {
        var blockName = 'core/' + payload.mediaType;
        var newBlock = (0, _blocks.createBlock)(blockName, (0, _defineProperty2.default)({
          id: payload.mediaId
        }, payload.mediaType === 'image' ? 'url' : 'src', payload.mediaUrl));
        var indexAfterSelected = _this2.props.selectedBlockIndex + 1;
        var insertionIndex = indexAfterSelected || _this2.props.blockCount;

        _this2.props.insertBlock(newBlock, insertionIndex);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscriptionParentGetHtml) {
        this.subscriptionParentGetHtml.remove();
      }

      if (this.subscriptionParentToggleHTMLMode) {
        this.subscriptionParentToggleHTMLMode.remove();
      }

      if (this.subscriptionParentSetTitle) {
        this.subscriptionParentSetTitle.remove();
      }

      if (this.subscriptionParentUpdateHtml) {
        this.subscriptionParentUpdateHtml.remove();
      }

      if (this.subscriptionParentMediaAppend) {
        this.subscriptionParentMediaAppend.remove();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.isReady && this.props.isReady) {
        var blocks = this.props.blocks;

        var isUnsupportedBlock = function isUnsupportedBlock(_ref) {
          var name = _ref.name;
          return name === (0, _blocks.getUnregisteredTypeHandlerName)();
        };

        var unsupportedBlockNames = blocks.filter(isUnsupportedBlock).map(function (block) {
          return block.attributes.originalName;
        });

        _reactNativeGutenbergBridge.default.editorDidMount(unsupportedBlockNames);
      }
    }
  }, {
    key: "serializeToNativeAction",
    value: function serializeToNativeAction() {
      var title = this.props.title;
      var html;

      if (this.props.mode === 'text') {
        // The HTMLTextInput component does not update the store when user is doing changes
        // Let's request the HTML from the component's state directly
        html = (0, _hooks.applyFilters)('native.persist-html');
      } else {
        html = (0, _blocks.serialize)(this.props.blocks);
      }

      var hasChanges = title !== this.post.title.raw || html !== this.post.content.raw;

      _reactNativeGutenbergBridge.default.provideToNative_Html(html, title, hasChanges);

      if (hasChanges) {
        this.post.title.raw = title;
        this.post.content.raw = html;
      }
    }
  }, {
    key: "updateHtmlAction",
    value: function updateHtmlAction(html) {
      var parsed = (0, _blocks.parse)(html);
      this.props.resetEditorBlocksWithoutUndoLevel(parsed);
    }
  }, {
    key: "toggleMode",
    value: function toggleMode() {
      var _this$props = this.props,
          mode = _this$props.mode,
          switchMode = _this$props.switchMode; // refresh html content first

      this.serializeToNativeAction(); // make sure to blur the selected block and dismiss the keyboard

      this.props.clearSelectedBlock();
      switchMode(mode === 'visual' ? 'text' : 'visual');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          post = _this$props2.post,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["children", "post"]);
      return (0, _element.createElement)(_index.default, (0, _extends2.default)({
        post: this.post
      }, props), children);
    }
  }]);
  return NativeEditorProvider;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var rootClientId = _ref2.rootClientId;

  var _select = select('core/editor'),
      isEditorReady = _select.__unstableIsEditorReady,
      getEditorBlocks = _select.getEditorBlocks,
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getEditedPostContent = _select.getEditedPostContent;

  var _select2 = select('core/edit-post'),
      getEditorMode = _select2.getEditorMode;

  var _select3 = select('core/block-editor'),
      getBlockCount = _select3.getBlockCount,
      getBlockIndex = _select3.getBlockIndex,
      getSelectedBlockClientId = _select3.getSelectedBlockClientId;

  var selectedBlockClientId = getSelectedBlockClientId();
  return {
    mode: getEditorMode(),
    isReady: isEditorReady(),
    blocks: getEditorBlocks(),
    title: getEditedPostAttribute('title'),
    getEditedPostContent: getEditedPostContent,
    selectedBlockIndex: getBlockIndex(selectedBlockClientId),
    blockCount: getBlockCount(rootClientId)
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost,
      resetEditorBlocks = _dispatch.resetEditorBlocks;

  var _dispatch2 = dispatch('core/block-editor'),
      clearSelectedBlock = _dispatch2.clearSelectedBlock,
      insertBlock = _dispatch2.insertBlock;

  var _dispatch3 = dispatch('core/edit-post'),
      switchEditorMode = _dispatch3.switchEditorMode;

  var _dispatch4 = dispatch('core'),
      addEntities = _dispatch4.addEntities,
      receiveEntityRecords = _dispatch4.receiveEntityRecords;

  return {
    addEntities: addEntities,
    clearSelectedBlock: clearSelectedBlock,
    insertBlock: insertBlock,
    editTitle: function editTitle(title) {
      editPost({
        title: title
      });
    },
    receiveEntityRecords: receiveEntityRecords,
    resetEditorBlocksWithoutUndoLevel: function resetEditorBlocksWithoutUndoLevel(blocks) {
      resetEditorBlocks(blocks, {
        __unstableShouldCreateUndoLevel: false
      });
    },
    switchMode: function switchMode(mode) {
      switchEditorMode(mode);
    }
  };
})])(NativeEditorProvider);

exports.default = _default;
//# sourceMappingURL=index.native.js.map