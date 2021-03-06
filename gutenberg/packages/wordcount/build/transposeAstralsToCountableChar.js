"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Replaces items matched in the regex with character.
 *
 * @param {Object} settings The main settings object containing regular expressions
 * @param {string} text     The string being counted.
 *
 * @return {string} The manipulated text.
 */
function _default(settings, text) {
  if (settings.astralRegExp) {
    return text.replace(settings.astralRegExp, 'a');
  }

  return text;
}
//# sourceMappingURL=transposeAstralsToCountableChar.js.map