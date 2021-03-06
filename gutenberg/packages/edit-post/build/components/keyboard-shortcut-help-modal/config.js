"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textFormattingShortcuts = void 0;

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
var textFormattingShortcuts = [{
  keyCombination: {
    modifier: 'primary',
    character: 'b'
  },
  description: (0, _i18n.__)('Make the selected text bold.')
}, {
  keyCombination: {
    modifier: 'primary',
    character: 'i'
  },
  description: (0, _i18n.__)('Make the selected text italic.')
}, {
  keyCombination: {
    modifier: 'primary',
    character: 'k'
  },
  description: (0, _i18n.__)('Convert the selected text into a link.')
}, {
  keyCombination: {
    modifier: 'primaryShift',
    character: 'k'
  },
  description: (0, _i18n.__)('Remove a link.')
}, {
  keyCombination: {
    modifier: 'primary',
    character: 'u'
  },
  description: (0, _i18n.__)('Underline the selected text.')
}];
exports.textFormattingShortcuts = textFormattingShortcuts;
//# sourceMappingURL=config.js.map