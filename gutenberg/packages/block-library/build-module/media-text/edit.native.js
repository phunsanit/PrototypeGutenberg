import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { get } from 'lodash';
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { BlockControls, BlockVerticalAlignmentToolbar, InnerBlocks, withColors } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { ToolbarGroup } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { pullLeft, pullRight } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import MediaContainer from './media-container';
import styles from './style.scss';
/**
 * Constants
 */

var ALLOWED_BLOCKS = ['core/button', 'core/paragraph', 'core/heading', 'core/list'];
var TEMPLATE = [['core/paragraph']]; // this limits the resize to a safe zone to avoid making broken layouts

var WIDTH_CONSTRAINT_PERCENTAGE = 15;
var BREAKPOINTS = {
  mobile: 480
};

var applyWidthConstraints = function applyWidthConstraints(width) {
  return Math.max(WIDTH_CONSTRAINT_PERCENTAGE, Math.min(width, 100 - WIDTH_CONSTRAINT_PERCENTAGE));
};

var MediaTextEdit = /*#__PURE__*/function (_Component) {
  _inherits(MediaTextEdit, _Component);

  var _super = _createSuper(MediaTextEdit);

  function MediaTextEdit() {
    var _this;

    _classCallCheck(this, MediaTextEdit);

    _this = _super.apply(this, arguments);
    _this.onSelectMedia = _this.onSelectMedia.bind(_assertThisInitialized(_this));
    _this.onMediaUpdate = _this.onMediaUpdate.bind(_assertThisInitialized(_this));
    _this.onWidthChange = _this.onWidthChange.bind(_assertThisInitialized(_this));
    _this.commitWidthChange = _this.commitWidthChange.bind(_assertThisInitialized(_this));
    _this.onLayoutChange = _this.onLayoutChange.bind(_assertThisInitialized(_this));
    _this.state = {
      mediaWidth: null,
      containerWidth: 0
    };
    return _this;
  }

  _createClass(MediaTextEdit, [{
    key: "onSelectMedia",
    value: function onSelectMedia(media) {
      var setAttributes = this.props.setAttributes;
      var mediaType;
      var src; // for media selections originated from a file upload.

      if (media.media_type) {
        if (media.media_type === 'image') {
          mediaType = 'image';
        } else {
          // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
          // video contain the media type of 'file' in the object returned from the rest api.
          mediaType = 'video';
        }
      } else {
        // for media selections originated from existing files in the media library.
        mediaType = media.type;
      }

      if (mediaType === 'image' && media.sizes) {
        // Try the "large" size URL, falling back to the "full" size URL below.
        src = get(media, ['sizes', 'large', 'url']) || get(media, ['media_details', 'sizes', 'large', 'source_url']);
      }

      setAttributes({
        mediaAlt: media.alt,
        mediaId: media.id,
        mediaType: mediaType,
        mediaUrl: src || media.url,
        imageFill: undefined,
        focalPoint: undefined
      });
    }
  }, {
    key: "onMediaUpdate",
    value: function onMediaUpdate(media) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        mediaId: media.id,
        mediaUrl: media.url
      });
    }
  }, {
    key: "onWidthChange",
    value: function onWidthChange(width) {
      this.setState({
        mediaWidth: applyWidthConstraints(width)
      });
    }
  }, {
    key: "commitWidthChange",
    value: function commitWidthChange(width) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        mediaWidth: applyWidthConstraints(width)
      });
      this.setState({
        mediaWidth: null
      });
    }
  }, {
    key: "onLayoutChange",
    value: function onLayoutChange(_ref) {
      var nativeEvent = _ref.nativeEvent;
      var width = nativeEvent.layout.width;
      var containerWidth = this.state.containerWidth;

      if (containerWidth === width) {
        return null;
      }

      this.setState({
        containerWidth: width
      });
    }
  }, {
    key: "renderMediaArea",
    value: function renderMediaArea() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          isSelected = _this$props.isSelected;
      var mediaAlt = attributes.mediaAlt,
          mediaId = attributes.mediaId,
          mediaPosition = attributes.mediaPosition,
          mediaType = attributes.mediaType,
          mediaUrl = attributes.mediaUrl,
          mediaWidth = attributes.mediaWidth,
          imageFill = attributes.imageFill,
          focalPoint = attributes.focalPoint;
      return createElement(MediaContainer, _extends({
        onSelectMedia: this.onSelectMedia,
        onMediaUpdate: this.onMediaUpdate,
        onWidthChange: this.onWidthChange,
        commitWidthChange: this.commitWidthChange,
        onFocus: this.props.onFocus
      }, {
        mediaAlt: mediaAlt,
        mediaId: mediaId,
        mediaType: mediaType,
        mediaUrl: mediaUrl,
        mediaPosition: mediaPosition,
        mediaWidth: mediaWidth,
        imageFill: imageFill,
        focalPoint: focalPoint,
        isSelected: isSelected
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _wrapperProps$style;

      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          backgroundColor = _this$props2.backgroundColor,
          setAttributes = _this$props2.setAttributes,
          isSelected = _this$props2.isSelected,
          isRTL = _this$props2.isRTL,
          wrapperProps = _this$props2.wrapperProps;
      var isStackedOnMobile = attributes.isStackedOnMobile,
          mediaPosition = attributes.mediaPosition,
          mediaWidth = attributes.mediaWidth,
          verticalAlignment = attributes.verticalAlignment;
      var containerWidth = this.state.containerWidth;
      var isMobile = containerWidth < BREAKPOINTS.mobile;
      var shouldStack = isStackedOnMobile && isMobile;
      var temporaryMediaWidth = shouldStack ? 100 : this.state.mediaWidth || mediaWidth;
      var widthString = "".concat(temporaryMediaWidth, "%");
      var innerBlockContainerStyle = !shouldStack ? styles.innerBlock : _objectSpread({}, mediaPosition === 'left' ? styles.innerBlockStackMediaLeft : styles.innerBlockStackMediaRight);

      var containerStyles = _objectSpread({}, styles['wp-block-media-text'], {}, styles["is-vertically-aligned-".concat(verticalAlignment || 'center')], {}, mediaPosition === 'right' ? styles['has-media-on-the-right'] : {}, {}, shouldStack && styles['is-stacked-on-mobile'], {}, shouldStack && mediaPosition === 'right' ? styles['is-stacked-on-mobile.has-media-on-the-right'] : {}, {}, isSelected && styles['is-selected'], {
        backgroundColor: (wrapperProps === null || wrapperProps === void 0 ? void 0 : (_wrapperProps$style = wrapperProps.style) === null || _wrapperProps$style === void 0 ? void 0 : _wrapperProps$style.backgroundColor) || backgroundColor.color
      });

      var innerBlockWidth = shouldStack ? 100 : 100 - temporaryMediaWidth;
      var innerBlockWidthString = "".concat(innerBlockWidth, "%");
      var mediaContainerStyle = shouldStack ? _objectSpread({}, mediaPosition === 'left' && styles.mediaStackLeft, {}, mediaPosition === 'right' && styles.mediaStackRight) : _objectSpread({}, mediaPosition === 'left' && styles.mediaLeft, {}, mediaPosition === 'right' && styles.mediaRight);
      var toolbarControls = [{
        icon: isRTL ? pullRight : pullLeft,
        title: __('Show media on left'),
        isActive: mediaPosition === 'left',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'left'
          });
        }
      }, {
        icon: isRTL ? pullLeft : pullRight,
        title: __('Show media on right'),
        isActive: mediaPosition === 'right',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'right'
          });
        }
      }];

      var onVerticalAlignmentChange = function onVerticalAlignmentChange(alignment) {
        setAttributes({
          verticalAlignment: alignment
        });
      };

      return createElement(Fragment, null, createElement(BlockControls, null, createElement(ToolbarGroup, {
        controls: toolbarControls
      }), createElement(BlockVerticalAlignmentToolbar, {
        onChange: onVerticalAlignmentChange,
        value: verticalAlignment
      })), createElement(View, {
        style: containerStyles,
        onLayout: this.onLayoutChange
      }, createElement(View, {
        style: _objectSpread({
          width: widthString
        }, mediaContainerStyle)
      }, this.renderMediaArea()), createElement(View, {
        style: _objectSpread({
          width: innerBlockWidthString
        }, innerBlockContainerStyle)
      }, createElement(InnerBlocks, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: TEMPLATE,
        templateInsertUpdatesSelection: false
      }))));
    }
  }]);

  return MediaTextEdit;
}(Component);

export default compose(withColors('backgroundColor'), withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/block-editor'),
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      getBlockRootClientId = _select.getBlockRootClientId,
      getBlockParents = _select.getBlockParents,
      getSettings = _select.getSettings;

  var parents = getBlockParents(clientId, true);
  var selectedBlockClientId = getSelectedBlockClientId();
  var isParentSelected = selectedBlockClientId && selectedBlockClientId === getBlockRootClientId(clientId);
  var isAncestorSelected = selectedBlockClientId && parents.includes(selectedBlockClientId);
  return {
    isSelected: selectedBlockClientId === clientId,
    isParentSelected: isParentSelected,
    isAncestorSelected: isAncestorSelected,
    isRTL: getSettings().isRTL
  };
}))(MediaTextEdit);
//# sourceMappingURL=edit.native.js.map