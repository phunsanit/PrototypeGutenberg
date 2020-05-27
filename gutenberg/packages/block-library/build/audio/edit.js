"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _blob = require("@wordpress/blob");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _util = require("../embed/util");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ALLOWED_MEDIA_TYPES = ['audio'];

var AudioEdit = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(AudioEdit, _Component);

  var _super = _createSuper(AudioEdit);

  function AudioEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, AudioEdit);
    _this = _super.apply(this, arguments);
    _this.toggleAttribute = _this.toggleAttribute.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSelectURL = _this.onSelectURL.bind((0, _assertThisInitialized2.default)(_this));
    _this.onUploadError = _this.onUploadError.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(AudioEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          mediaUpload = _this$props.mediaUpload,
          noticeOperations = _this$props.noticeOperations,
          setAttributes = _this$props.setAttributes;
      var id = attributes.id,
          _attributes$src = attributes.src,
          src = _attributes$src === void 0 ? '' : _attributes$src;

      if (!id && (0, _blob.isBlobURL)(src)) {
        var file = (0, _blob.getBlobByURL)(src);

        if (file) {
          mediaUpload({
            filesList: [file],
            onFileChange: function onFileChange(_ref) {
              var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
                  _ref2$ = _ref2[0],
                  mediaId = _ref2$.id,
                  url = _ref2$.url;

              setAttributes({
                id: mediaId,
                src: url
              });
            },
            onError: function onError(e) {
              setAttributes({
                src: undefined,
                id: undefined
              });
              noticeOperations.createErrorNotice(e);
            },
            allowedTypes: ALLOWED_MEDIA_TYPES
          });
        }
      }
    }
  }, {
    key: "toggleAttribute",
    value: function toggleAttribute(attribute) {
      var _this2 = this;

      return function (newValue) {
        _this2.props.setAttributes((0, _defineProperty2.default)({}, attribute, newValue));
      };
    }
  }, {
    key: "onSelectURL",
    value: function onSelectURL(newSrc) {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes;
      var src = attributes.src; // Set the block's src from the edit component's state, and switch off
      // the editing UI.

      if (newSrc !== src) {
        // Check if there's an embed block that handles this URL.
        var embedBlock = (0, _util.createUpgradedEmbedBlock)({
          attributes: {
            url: newSrc
          }
        });

        if (undefined !== embedBlock) {
          this.props.onReplace(embedBlock);
          return;
        }

        setAttributes({
          src: newSrc,
          id: undefined
        });
      }
    }
  }, {
    key: "onUploadError",
    value: function onUploadError(message) {
      var noticeOperations = this.props.noticeOperations;
      noticeOperations.removeAllNotices();
      noticeOperations.createErrorNotice(message);
    }
  }, {
    key: "getAutoplayHelp",
    value: function getAutoplayHelp(checked) {
      return checked ? (0, _i18n.__)('Note: Autoplaying audio may cause usability issues for some visitors.') : null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$attribute = this.props.attributes,
          id = _this$props$attribute.id,
          autoplay = _this$props$attribute.autoplay,
          caption = _this$props$attribute.caption,
          loop = _this$props$attribute.loop,
          preload = _this$props$attribute.preload,
          src = _this$props$attribute.src;
      var _this$props3 = this.props,
          setAttributes = _this$props3.setAttributes,
          isSelected = _this$props3.isSelected,
          noticeUI = _this$props3.noticeUI;

      var onSelectAudio = function onSelectAudio(media) {
        if (!media || !media.url) {
          // in this case there was an error and we should continue in the editing state
          // previous attributes should be removed because they may be temporary blob urls
          setAttributes({
            src: undefined,
            id: undefined
          });
          return;
        } // sets the block's attribute and updates the edit component from the
        // selected media, then switches off the editing UI


        setAttributes({
          src: media.url,
          id: media.id
        });
      };

      if (!src) {
        return (0, _element.createElement)(_blockEditor.__experimentalBlock.div, null, (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
          icon: (0, _element.createElement)(_blockEditor.BlockIcon, {
            icon: _icons.audio
          }),
          onSelect: onSelectAudio,
          onSelectURL: this.onSelectURL,
          accept: "audio/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          value: this.props.attributes,
          notices: noticeUI,
          onError: this.onUploadError
        }));
      }

      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.MediaReplaceFlow, {
        mediaId: id,
        mediaURL: src,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        accept: "audio/*",
        onSelect: onSelectAudio,
        onSelectURL: this.onSelectURL,
        onError: this.onUploadError
      })), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Audio settings')
      }, (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Autoplay'),
        onChange: this.toggleAttribute('autoplay'),
        checked: autoplay,
        help: this.getAutoplayHelp
      }), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Loop'),
        onChange: this.toggleAttribute('loop'),
        checked: loop
      }), (0, _element.createElement)(_components.SelectControl, {
        label: (0, _i18n.__)('Preload'),
        value: preload || '' // `undefined` is required for the preload attribute to be unset.
        ,
        onChange: function onChange(value) {
          return setAttributes({
            preload: value || undefined
          });
        },
        options: [{
          value: '',
          label: (0, _i18n.__)('Browser default')
        }, {
          value: 'auto',
          label: (0, _i18n.__)('Auto')
        }, {
          value: 'metadata',
          label: (0, _i18n.__)('Metadata')
        }, {
          value: 'none',
          label: (0, _i18n.__)('None')
        }]
      }))), (0, _element.createElement)(_blockEditor.__experimentalBlock.figure, null, (0, _element.createElement)(_components.Disabled, null, (0, _element.createElement)("audio", {
        controls: "controls",
        src: src
      })), (!_blockEditor.RichText.isEmpty(caption) || isSelected) && (0, _element.createElement)(_blockEditor.RichText, {
        tagName: "figcaption",
        placeholder: (0, _i18n.__)('Write caption…'),
        value: caption,
        onChange: function onChange(value) {
          return setAttributes({
            caption: value
          });
        },
        inlineToolbar: true
      })));
    }
  }]);
  return AudioEdit;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  var _getSettings = getSettings(),
      mediaUpload = _getSettings.mediaUpload;

  return {
    mediaUpload: mediaUpload
  };
}), _components.withNotices])(AudioEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map