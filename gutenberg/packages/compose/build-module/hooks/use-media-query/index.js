import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
/**
 * Runs a media query and returns its value when it changes.
 *
 * @param {string} [query] Media Query.
 * @return {boolean} return value of the media query.
 */

export default function useMediaQuery(query) {
  var _useState = useState(query && window.matchMedia(query).matches),
      _useState2 = _slicedToArray(_useState, 2),
      match = _useState2[0],
      setMatch = _useState2[1];

  useEffect(function () {
    if (!query) {
      return;
    }

    var updateMatch = function updateMatch() {
      return setMatch(window.matchMedia(query).matches);
    };

    updateMatch();
    var list = window.matchMedia(query);
    list.addListener(updateMatch);
    return function () {
      list.removeListener(updateMatch);
    };
  }, [query]);
  return query && match;
}
//# sourceMappingURL=index.js.map