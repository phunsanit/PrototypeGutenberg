/**
 * Internal dependencies
 */
import { create } from './create';
import { normaliseFormats } from './normalise-formats';
/**
 * Combine an array of Rich Text values into one, optionally separated by
 * `separator`, which can be a Rich Text value, HTML string, or plain text
 * string. This is similar to `Array.prototype.join`.
 *
 * @param {Array<Object>} values      An array of values to join.
 * @param {string|Object} [separator] Separator string or value.
 *
 * @return {Object} A new combined value.
 */

export function join(values) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (typeof separator === 'string') {
    separator = create({
      text: separator
    });
  }

  return normaliseFormats(values.reduce(function (accumlator, _ref) {
    var formats = _ref.formats,
        replacements = _ref.replacements,
        text = _ref.text;
    return {
      formats: accumlator.formats.concat(separator.formats, formats),
      replacements: accumlator.replacements.concat(separator.replacements, replacements),
      text: accumlator.text + separator.text + text
    };
  }));
}
//# sourceMappingURL=join.js.map