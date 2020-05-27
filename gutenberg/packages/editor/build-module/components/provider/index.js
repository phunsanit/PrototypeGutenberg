import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { map, pick, defaultTo } from 'lodash';
import memize from 'memize';
/**
 * WordPress dependencies
 */

import { compose } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { EntityProvider } from '@wordpress/core-data';
import { BlockEditorProvider, BlockContextProvider, __unstableEditorStyles as EditorStyles } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
/**
 * Internal dependencies
 */

import withRegistryProvider from './with-registry-provider';
import { mediaUpload } from '../../utils';
import ReusableBlocksButtons from '../reusable-blocks-buttons';
import ConvertToGroupButtons from '../convert-to-group-buttons';
/**
 * Fetches link suggestions from the API. This function is an exact copy of a function found at:
 *
 * wordpress/editor/src/components/provider/index.js
 *
 * It seems like there is no suitable package to import this from. Ideally it would be either part of core-data.
 * Until we refactor it, just copying the code is the simplest solution.
 *
 * @param {Object} search
 * @param {number} perPage
 * @return {Promise<Object[]>} List of suggestions
 */

var fetchLinkSuggestions = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(search) {
    var _ref2,
        _ref2$perPage,
        perPage,
        posts,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$perPage = _ref2.perPage, perPage = _ref2$perPage === void 0 ? 20 : _ref2$perPage;
            _context.next = 3;
            return apiFetch({
              path: addQueryArgs('/wp/v2/search', {
                search: search,
                per_page: perPage,
                type: 'post'
              })
            });

          case 3:
            posts = _context.sent;
            return _context.abrupt("return", map(posts, function (post) {
              return {
                id: post.id,
                url: post.url,
                title: decodeEntities(post.title) || __('(no title)'),
                type: post.subtype || post.type
              };
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchLinkSuggestions(_x) {
    return _ref.apply(this, arguments);
  };
}();

var EditorProvider = /*#__PURE__*/function (_Component) {
  _inherits(EditorProvider, _Component);

  var _super = _createSuper(EditorProvider);

  function EditorProvider(props) {
    var _this;

    _classCallCheck(this, EditorProvider);

    _this = _super.apply(this, arguments);
    _this.getBlockEditorSettings = memize(_this.getBlockEditorSettings, {
      maxSize: 1
    });
    _this.getDefaultBlockContext = memize(_this.getDefaultBlockContext, {
      maxSize: 1
    }); // Assume that we don't need to initialize in the case of an error recovery.

    if (props.recovery) {
      return _possibleConstructorReturn(_this);
    }

    props.updatePostLock(props.settings.postLock);
    props.setupEditor(props.post, props.initialEdits, props.settings.template);

    if (props.settings.autosave) {
      props.createWarningNotice(__('There is an autosave of this post that is more recent than the version below.'), {
        id: 'autosave-exists',
        actions: [{
          label: __('View the autosave'),
          url: props.settings.autosave.editLink
        }]
      });
    }

    return _this;
  }

  _createClass(EditorProvider, [{
    key: "getBlockEditorSettings",
    value: function getBlockEditorSettings(settings, reusableBlocks, __experimentalFetchReusableBlocks, hasUploadPermissions, canUserUseUnfilteredHTML, undo, shouldInsertAtTheTop) {
      return _objectSpread({}, pick(settings, ['__experimentalBlockDirectory', '__experimentalBlockPatterns', '__experimentalBlockPatternCategories', '__experimentalDisableCustomUnits', '__experimentalDisableCustomLineHeight', '__experimentalEnableLegacyWidgetBlock', '__experimentalEnableFullSiteEditing', '__experimentalEnableFullSiteEditingDemo', '__experimentalFeatures', '__experimentalGlobalStylesUserEntityId', '__experimentalGlobalStylesBase', '__experimentalPreferredStyleVariations', 'alignWide', 'allowedBlockTypes', 'availableLegacyWidgets', 'bodyPlaceholder', 'codeEditingEnabled', 'colors', 'disableCustomColors', 'disableCustomFontSizes', 'disableCustomGradients', 'focusMode', 'fontSizes', 'gradients', 'hasFixedToolbar', 'hasPermissionsToManageWidgets', 'imageSizes', 'imageDimensions', 'isRTL', 'maxWidth', 'onUpdateDefaultBlockStyles', 'styles', 'template', 'templateLock', 'titlePlaceholder']), {
        mediaUpload: hasUploadPermissions ? mediaUpload : undefined,
        __experimentalReusableBlocks: reusableBlocks,
        __experimentalFetchReusableBlocks: __experimentalFetchReusableBlocks,
        __experimentalFetchLinkSuggestions: fetchLinkSuggestions,
        __experimentalCanUserUseUnfilteredHTML: canUserUseUnfilteredHTML,
        __experimentalUndo: undo,
        __experimentalShouldInsertAtTheTop: shouldInsertAtTheTop
      });
    }
  }, {
    key: "getDefaultBlockContext",
    value: function getDefaultBlockContext(postId, postType) {
      return {
        postId: postId,
        postType: postType
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.updateEditorSettings(this.props.settings);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.settings !== prevProps.settings) {
        this.props.updateEditorSettings(this.props.settings);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.tearDownEditor();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          canUserUseUnfilteredHTML = _this$props.canUserUseUnfilteredHTML,
          children = _this$props.children,
          post = _this$props.post,
          blocks = _this$props.blocks,
          resetEditorBlocks = _this$props.resetEditorBlocks,
          selectionStart = _this$props.selectionStart,
          selectionEnd = _this$props.selectionEnd,
          isReady = _this$props.isReady,
          settings = _this$props.settings,
          reusableBlocks = _this$props.reusableBlocks,
          resetEditorBlocksWithoutUndoLevel = _this$props.resetEditorBlocksWithoutUndoLevel,
          hasUploadPermissions = _this$props.hasUploadPermissions,
          isPostTitleSelected = _this$props.isPostTitleSelected,
          __experimentalFetchReusableBlocks = _this$props.__experimentalFetchReusableBlocks,
          undo = _this$props.undo;

      if (!isReady) {
        return null;
      }

      var editorSettings = this.getBlockEditorSettings(settings, reusableBlocks, __experimentalFetchReusableBlocks, hasUploadPermissions, canUserUseUnfilteredHTML, undo, isPostTitleSelected);
      var defaultBlockContext = this.getDefaultBlockContext(post.id, post.type);
      return createElement(Fragment, null, createElement(EditorStyles, {
        styles: settings.styles
      }), createElement(EntityProvider, {
        kind: "root",
        type: "site"
      }, createElement(EntityProvider, {
        kind: "postType",
        type: post.type,
        id: post.id
      }, createElement(BlockContextProvider, {
        value: defaultBlockContext
      }, createElement(BlockEditorProvider, {
        value: blocks,
        onInput: resetEditorBlocksWithoutUndoLevel,
        onChange: resetEditorBlocks,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd,
        settings: editorSettings,
        useSubRegistry: false
      }, children, createElement(ReusableBlocksButtons, null), createElement(ConvertToGroupButtons, null))))));
    }
  }]);

  return EditorProvider;
}(Component);

export default compose([withRegistryProvider, withSelect(function (select) {
  var _select = select('core/editor'),
      canUserUseUnfilteredHTML = _select.canUserUseUnfilteredHTML,
      isEditorReady = _select.__unstableIsEditorReady,
      getEditorBlocks = _select.getEditorBlocks,
      getEditorSelectionStart = _select.getEditorSelectionStart,
      getEditorSelectionEnd = _select.getEditorSelectionEnd,
      __experimentalGetReusableBlocks = _select.__experimentalGetReusableBlocks,
      isPostTitleSelected = _select.isPostTitleSelected;

  var _select2 = select('core'),
      canUser = _select2.canUser;

  return {
    canUserUseUnfilteredHTML: canUserUseUnfilteredHTML(),
    isReady: isEditorReady(),
    blocks: getEditorBlocks(),
    selectionStart: getEditorSelectionStart(),
    selectionEnd: getEditorSelectionEnd(),
    reusableBlocks: __experimentalGetReusableBlocks(),
    hasUploadPermissions: defaultTo(canUser('create', 'media'), true),
    // This selector is only defined on mobile.
    isPostTitleSelected: isPostTitleSelected && isPostTitleSelected()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      setupEditor = _dispatch.setupEditor,
      updatePostLock = _dispatch.updatePostLock,
      resetEditorBlocks = _dispatch.resetEditorBlocks,
      updateEditorSettings = _dispatch.updateEditorSettings,
      __experimentalFetchReusableBlocks = _dispatch.__experimentalFetchReusableBlocks,
      __experimentalTearDownEditor = _dispatch.__experimentalTearDownEditor,
      undo = _dispatch.undo;

  var _dispatch2 = dispatch('core/notices'),
      createWarningNotice = _dispatch2.createWarningNotice;

  return {
    setupEditor: setupEditor,
    updatePostLock: updatePostLock,
    createWarningNotice: createWarningNotice,
    resetEditorBlocks: resetEditorBlocks,
    updateEditorSettings: updateEditorSettings,
    resetEditorBlocksWithoutUndoLevel: function resetEditorBlocksWithoutUndoLevel(blocks, options) {
      resetEditorBlocks(blocks, _objectSpread({}, options, {
        __unstableShouldCreateUndoLevel: false
      }));
    },
    tearDownEditor: __experimentalTearDownEditor,
    __experimentalFetchReusableBlocks: __experimentalFetchReusableBlocks,
    undo: undo
  };
})])(EditorProvider);
//# sourceMappingURL=index.js.map