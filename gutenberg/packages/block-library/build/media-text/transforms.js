"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */
var transforms = {
  from: [{
    type: 'block',
    blocks: ['core/image'],
    transform: function transform(_ref) {
      var alt = _ref.alt,
          url = _ref.url,
          id = _ref.id;
      return (0, _blocks.createBlock)('core/media-text', {
        mediaAlt: alt,
        mediaId: id,
        mediaUrl: url,
        mediaType: 'image'
      });
    }
  }, {
    type: 'block',
    blocks: ['core/video'],
    transform: function transform(_ref2) {
      var src = _ref2.src,
          id = _ref2.id;
      return (0, _blocks.createBlock)('core/media-text', {
        mediaId: id,
        mediaUrl: src,
        mediaType: 'video'
      });
    }
  }],
  to: [{
    type: 'block',
    blocks: ['core/image'],
    isMatch: function isMatch(_ref3) {
      var mediaType = _ref3.mediaType,
          mediaUrl = _ref3.mediaUrl;
      return !mediaUrl || mediaType === 'image';
    },
    transform: function transform(_ref4) {
      var mediaAlt = _ref4.mediaAlt,
          mediaId = _ref4.mediaId,
          mediaUrl = _ref4.mediaUrl;
      return (0, _blocks.createBlock)('core/image', {
        alt: mediaAlt,
        id: mediaId,
        url: mediaUrl
      });
    }
  }, {
    type: 'block',
    blocks: ['core/video'],
    isMatch: function isMatch(_ref5) {
      var mediaType = _ref5.mediaType,
          mediaUrl = _ref5.mediaUrl;
      return !mediaUrl || mediaType === 'video';
    },
    transform: function transform(_ref6) {
      var mediaId = _ref6.mediaId,
          mediaUrl = _ref6.mediaUrl;
      return (0, _blocks.createBlock)('core/video', {
        id: mediaId,
        src: mediaUrl
      });
    }
  }]
};
var _default = transforms;
exports.default = _default;
//# sourceMappingURL=transforms.js.map