"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */

/**
 * Default transforms for generic embeds.
 */
var transforms = {
  from: [{
    type: 'raw',
    isMatch: function isMatch(node) {
      return node.nodeName === 'P' && /^\s*(https?:\/\/\S+)\s*$/i.test(node.textContent);
    },
    transform: function transform(node) {
      return (0, _blocks.createBlock)('core/embed', {
        url: node.textContent.trim()
      });
    }
  }],
  to: [{
    type: 'block',
    blocks: ['core/paragraph'],
    transform: function transform(_ref) {
      var url = _ref.url,
          caption = _ref.caption;
      var link = (0, _element.createElement)("a", {
        href: url
      }, caption || url);
      return (0, _blocks.createBlock)('core/paragraph', {
        content: (0, _element.renderToString)(link)
      });
    }
  }]
};
var _default = transforms;
exports.default = _default;
//# sourceMappingURL=transforms.js.map