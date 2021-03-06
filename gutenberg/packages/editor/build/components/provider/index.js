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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _memize = _interopRequireDefault(require("memize"));

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _coreData = require("@wordpress/core-data");

var _blockEditor = require("@wordpress/block-editor");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _url = require("@wordpress/url");

var _htmlEntities = require("@wordpress/html-entities");

var _withRegistryProvider = _interopRequireDefault(require("./with-registry-provider"));

var _utils = require("../../utils");

var _reusableBlocksButtons = _interopRequireDefault(require("../reusable-blocks-buttons"));

var _convertToGroupButtons = _interopRequireDefault(require("../convert-to-group-buttons"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(search) {
    var _ref2,
        _ref2$perPage,
        perPage,
        posts,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$perPage = _ref2.perPage, perPage = _ref2$perPage === void 0 ? 20 : _ref2$perPage;
            _context.next = 3;
            return (0, _apiFetch.default)({
              path: (0, _url.addQueryArgs)('/wp/v2/search', {
                search: search,
                per_page: perPage,
                type: 'post'
              })
            });

          case 3:
            posts = _context.sent;
            return _context.abrupt("return", (0, _lodash.map)(posts, function (post) {
              return {
                id: post.id,
                url: post.url,
                title: (0, _htmlEntities.decodeEntities)(post.title) || (0, _i18n.__)('(no title)'),
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
  (0, _inherits2.default)(EditorProvider, _Component);

  var _super = _createSuper(EditorProvider);

  function EditorProvider(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EditorProvider);
    _this = _super.apply(this, arguments);
    _this.getBlockEditorSettings = (0, _memize.default)(_this.getBlockEditorSettings, {
      maxSize: 1
    });
    _this.getDefaultBlockContext = (0, _memize.default)(_this.getDefaultBlockContext, {
      maxSize: 1
    }); // Assume that we don't need to initialize in the case of an error recovery.

    if (props.recovery) {
      return (0, _possibleConstructorReturn2.default)(_this);
    }

    props.updatePostLock(props.settings.postLock);
    props.setupEditor(props.post, props.initialEdits, props.settings.template);

    if (props.settings.autosave) {
      props.createWarningNotice((0, _i18n.__)('There is an autosave of this post that is more recent than the version below.'), {
        id: 'autosave-exists',
        actions: [{
          label: (0, _i18n.__)('View the autosave'),
          url: props.settings.autosave.editLink
        }]
      });
    }

    return _this;
  }

  (0, _createClass2.default)(EditorProvider, [{
    key: "getBlockEditorSettings",
    value: function getBlockEditorSettings(settings, reusableBlocks, __experimentalFetchReusableBlocks, hasUploadPermissions, canUserUseUnfilteredHTML, undo, shouldInsertAtTheTop) {
      return _objectSpread({}, (0, _lodash.pick)(settings, ['__experimentalBlockDirectory', '__experimentalBlockPatterns', '__experimentalBlockPatternCategories', '__experimentalDisableCustomUnits', '__experimentalDisableCustomLineHeight', '__experimentalEnableLegacyWidgetBlock', '__experimentalEnableFullSiteEditing', '__experimentalEnableFullSiteEditingDemo', '__experimentalFeatures', '__experimentalGlobalStylesUserEntityId', '__experimentalGlobalStylesBase', '__experimentalPreferredStyleVariations', 'alignWide', 'allowedBlockTypes', 'availableLegacyWidgets', 'bodyPlaceholder', 'codeEditingEnabled', 'colors', 'disableCustomColors', 'disableCustomFontSizes', 'disableCustomGradients', 'focusMode', 'fontSizes', 'gradients', 'hasFixedToolbar', 'hasPermissionsToManageWidgets', 'imageSizes', 'imageDimensions', 'isRTL', 'maxWidth', 'onUpdateDefaultBlockStyles', 'styles', 'template', 'templateLock', 'titlePlaceholder']), {
        mediaUpload: hasUploadPermissions ? _utils.mediaUpload : undefined,
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
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.__unstableEditorStyles, {
        styles: settings.styles
      }), (0, _element.createElement)(_coreData.EntityProvider, {
        kind: "root",
        type: "site"
      }, (0, _element.createElement)(_coreData.EntityProvider, {
        kind: "postType",
        type: post.type,
        id: post.id
      }, (0, _element.createElement)(_blockEditor.BlockContextProvider, {
        value: defaultBlockContext
      }, (0, _element.createElement)(_blockEditor.BlockEditorProvider, {
        value: blocks,
        onInput: resetEditorBlocksWithoutUndoLevel,
        onChange: resetEditorBlocks,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd,
        settings: editorSettings,
        useSubRegistry: false
      }, children, (0, _element.createElement)(_reusableBlocksButtons.default, null), (0, _element.createElement)(_convertToGroupButtons.default, null))))));
    }
  }]);
  return EditorProvider;
}(_element.Component);

var _default = (0, _compose.compose)([_withRegistryProvider.default, (0, _data.withSelect)(function (select) {
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
    hasUploadPermissions: (0, _lodash.defaultTo)(canUser('create', 'media'), true),
    // This selector is only defined on mobile.
    isPostTitleSelected: isPostTitleSelected && isPostTitleSelected()
  };
}), (0, _data.withDispatch)(function (dispatch) {
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

exports.default = _default;
//# sourceMappingURL=index.js.map