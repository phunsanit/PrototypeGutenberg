import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * WordPress dependencies
 */
import { getBlobByURL, isBlobURL } from '@wordpress/blob';
import { BaseControl, Button, Disabled, PanelBody, withNotices } from '@wordpress/components';
import { BlockControls, BlockIcon, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, MediaReplaceFlow, RichText, __experimentalBlock as Block } from '@wordpress/block-editor';
import { Component, createRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { compose, withInstanceId } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { video as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import { createUpgradedEmbedBlock } from '../embed/util';
import VideoCommonSettings from './edit-common-settings';
var ALLOWED_MEDIA_TYPES = ['video'];
var VIDEO_POSTER_ALLOWED_MEDIA_TYPES = ['image'];

var VideoEdit = /*#__PURE__*/function (_Component) {
  _inherits(VideoEdit, _Component);

  var _super = _createSuper(VideoEdit);

  function VideoEdit() {
    var _this;

    _classCallCheck(this, VideoEdit);

    _this = _super.apply(this, arguments);
    _this.videoPlayer = createRef();
    _this.posterImageButton = createRef();
    _this.onSelectURL = _this.onSelectURL.bind(_assertThisInitialized(_this));
    _this.onSelectPoster = _this.onSelectPoster.bind(_assertThisInitialized(_this));
    _this.onRemovePoster = _this.onRemovePoster.bind(_assertThisInitialized(_this));
    _this.onUploadError = _this.onUploadError.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VideoEdit, [{
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

      if (!id && isBlobURL(src)) {
        var file = getBlobByURL(src);

        if (file) {
          mediaUpload({
            filesList: [file],
            onFileChange: function onFileChange(_ref) {
              var _ref2 = _slicedToArray(_ref, 1),
                  url = _ref2[0].url;

              setAttributes({
                src: url
              });
            },
            onError: function onError(message) {
              noticeOperations.createErrorNotice(message);
            },
            allowedTypes: ALLOWED_MEDIA_TYPES
          });
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.attributes.poster !== prevProps.attributes.poster) {
        this.videoPlayer.current.load();
      }
    }
  }, {
    key: "onSelectURL",
    value: function onSelectURL(newSrc) {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes;
      var src = attributes.src;

      if (newSrc !== src) {
        // Check if there's an embed block that handles this URL.
        var embedBlock = createUpgradedEmbedBlock({
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
    key: "onSelectPoster",
    value: function onSelectPoster(image) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        poster: image.url
      });
    }
  }, {
    key: "onRemovePoster",
    value: function onRemovePoster() {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        poster: ''
      }); // Move focus back to the Media Upload button.

      this.posterImageButton.current.focus();
    }
  }, {
    key: "onUploadError",
    value: function onUploadError(message) {
      var noticeOperations = this.props.noticeOperations;
      noticeOperations.removeAllNotices();
      noticeOperations.createErrorNotice(message);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$attribute = this.props.attributes,
          id = _this$props$attribute.id,
          caption = _this$props$attribute.caption,
          controls = _this$props$attribute.controls,
          poster = _this$props$attribute.poster,
          src = _this$props$attribute.src;
      var _this$props3 = this.props,
          instanceId = _this$props3.instanceId,
          isSelected = _this$props3.isSelected,
          noticeUI = _this$props3.noticeUI,
          attributes = _this$props3.attributes,
          setAttributes = _this$props3.setAttributes;

      var onSelectVideo = function onSelectVideo(media) {
        if (!media || !media.url) {
          // in this case there was an error
          // previous attributes should be removed
          // because they may be temporary blob urls
          setAttributes({
            src: undefined,
            id: undefined
          });
          return;
        } // sets the block's attribute and updates the edit component from the
        // selected media


        setAttributes({
          src: media.url,
          id: media.id
        });
      };

      if (!src) {
        return createElement(Block.div, null, createElement(MediaPlaceholder, {
          icon: createElement(BlockIcon, {
            icon: icon
          }),
          onSelect: onSelectVideo,
          onSelectURL: this.onSelectURL,
          accept: "video/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          value: this.props.attributes,
          notices: noticeUI,
          onError: this.onUploadError
        }));
      }

      var videoPosterDescription = "video-block__poster-image-description-".concat(instanceId);
      return createElement(Fragment, null, createElement(BlockControls, null, createElement(MediaReplaceFlow, {
        mediaId: id,
        mediaURL: src,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        accept: "video/*",
        onSelect: onSelectVideo,
        onSelectURL: this.onSelectURL,
        onError: this.onUploadError
      })), createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Video settings')
      }, createElement(VideoCommonSettings, {
        setAttributes: setAttributes,
        attributes: attributes
      }), createElement(MediaUploadCheck, null, createElement(BaseControl, {
        className: "editor-video-poster-control"
      }, createElement(BaseControl.VisualLabel, null, __('Poster image')), createElement(MediaUpload, {
        title: __('Select poster image'),
        onSelect: this.onSelectPoster,
        allowedTypes: VIDEO_POSTER_ALLOWED_MEDIA_TYPES,
        render: function render(_ref3) {
          var open = _ref3.open;
          return createElement(Button, {
            isPrimary: true,
            onClick: open,
            ref: _this2.posterImageButton,
            "aria-describedby": videoPosterDescription
          }, !_this2.props.attributes.poster ? __('Select') : __('Replace'));
        }
      }), createElement("p", {
        id: videoPosterDescription,
        hidden: true
      }, this.props.attributes.poster ? sprintf(
      /* translators: %s: poster image URL. */
      __('The current poster image url is %s'), this.props.attributes.poster) : __('There is no poster image currently selected')), !!this.props.attributes.poster && createElement(Button, {
        onClick: this.onRemovePoster,
        isTertiary: true
      }, __('Remove')))))), createElement(Block.figure, null, createElement(Disabled, null, createElement("video", {
        controls: controls,
        poster: poster,
        src: src,
        ref: this.videoPlayer
      })), (!RichText.isEmpty(caption) || isSelected) && createElement(RichText, {
        tagName: "figcaption",
        placeholder: __('Write caption…'),
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

  return VideoEdit;
}(Component);

export default compose([withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  var _getSettings = getSettings(),
      mediaUpload = _getSettings.mediaUpload;

  return {
    mediaUpload: mediaUpload
  };
}), withNotices, withInstanceId])(VideoEdit);
//# sourceMappingURL=edit.js.map