import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import RNReactNativeGutenbergBridge, { subscribeParentGetHtml, subscribeParentToggleHTMLMode, subscribeUpdateHtml, subscribeSetTitle, subscribeMediaAppend } from 'react-native-gutenberg-bridge';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { parse, serialize, getUnregisteredTypeHandlerName, createBlock } from '@wordpress/blocks';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';
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

import EditorProvider from './index.js';

var NativeEditorProvider = /*#__PURE__*/function (_Component) {
  _inherits(NativeEditorProvider, _Component);

  var _super = _createSuper(NativeEditorProvider);

  function NativeEditorProvider() {
    var _this;

    _classCallCheck(this, NativeEditorProvider);

    _this = _super.apply(this, arguments); // Keep a local reference to `post` to detect changes

    _this.post = _this.props.post;

    _this.props.addEntities(postTypeEntities);

    _this.props.receiveEntityRecords('postType', _this.post.type, _this.post);

    return _this;
  }

  _createClass(NativeEditorProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscriptionParentGetHtml = subscribeParentGetHtml(function () {
        _this2.serializeToNativeAction();
      });
      this.subscriptionParentToggleHTMLMode = subscribeParentToggleHTMLMode(function () {
        _this2.toggleMode();
      });
      this.subscriptionParentSetTitle = subscribeSetTitle(function (payload) {
        _this2.props.editTitle(payload.title);
      });
      this.subscriptionParentUpdateHtml = subscribeUpdateHtml(function (payload) {
        _this2.updateHtmlAction(payload.html);
      });
      this.subscriptionParentMediaAppend = subscribeMediaAppend(function (payload) {
        var blockName = 'core/' + payload.mediaType;
        var newBlock = createBlock(blockName, _defineProperty({
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
          return name === getUnregisteredTypeHandlerName();
        };

        var unsupportedBlockNames = blocks.filter(isUnsupportedBlock).map(function (block) {
          return block.attributes.originalName;
        });
        RNReactNativeGutenbergBridge.editorDidMount(unsupportedBlockNames);
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
        html = applyFilters('native.persist-html');
      } else {
        html = serialize(this.props.blocks);
      }

      var hasChanges = title !== this.post.title.raw || html !== this.post.content.raw;
      RNReactNativeGutenbergBridge.provideToNative_Html(html, title, hasChanges);

      if (hasChanges) {
        this.post.title.raw = title;
        this.post.content.raw = html;
      }
    }
  }, {
    key: "updateHtmlAction",
    value: function updateHtmlAction(html) {
      var parsed = parse(html);
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
          props = _objectWithoutProperties(_this$props2, ["children", "post"]);

      return createElement(EditorProvider, _extends({
        post: this.post
      }, props), children);
    }
  }]);

  return NativeEditorProvider;
}(Component);

export default compose([withSelect(function (select, _ref2) {
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
}), withDispatch(function (dispatch) {
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
//# sourceMappingURL=index.native.js.map