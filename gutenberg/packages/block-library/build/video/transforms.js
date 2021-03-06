"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blob = require("@wordpress/blob");

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */
var transforms = {
  from: [{
    type: 'files',
    isMatch: function isMatch(files) {
      return files.length === 1 && files[0].type.indexOf('video/') === 0;
    },
    transform: function transform(files) {
      var file = files[0]; // We don't need to upload the media directly here
      // It's already done as part of the `componentDidMount`
      // in the video block

      var block = (0, _blocks.createBlock)('core/video', {
        src: (0, _blob.createBlobURL)(file)
      });
      return block;
    }
  }, {
    type: 'shortcode',
    tag: 'video',
    attributes: {
      src: {
        type: 'string',
        shortcode: function shortcode(_ref) {
          var _ref$named = _ref.named,
              src = _ref$named.src,
              mp4 = _ref$named.mp4,
              m4v = _ref$named.m4v,
              webm = _ref$named.webm,
              ogv = _ref$named.ogv,
              flv = _ref$named.flv;
          return src || mp4 || m4v || webm || ogv || flv;
        }
      },
      poster: {
        type: 'string',
        shortcode: function shortcode(_ref2) {
          var poster = _ref2.named.poster;
          return poster;
        }
      },
      loop: {
        type: 'string',
        shortcode: function shortcode(_ref3) {
          var loop = _ref3.named.loop;
          return loop;
        }
      },
      autoplay: {
        type: 'string',
        shortcode: function shortcode(_ref4) {
          var autoplay = _ref4.named.autoplay;
          return autoplay;
        }
      },
      preload: {
        type: 'string',
        shortcode: function shortcode(_ref5) {
          var preload = _ref5.named.preload;
          return preload;
        }
      }
    }
  }]
};
var _default = transforms;
exports.default = _default;
//# sourceMappingURL=transforms.js.map