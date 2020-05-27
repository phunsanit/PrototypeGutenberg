import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import Stars from './stars';
export var BlockRatings = function BlockRatings(_ref) {
  var rating = _ref.rating,
      ratingCount = _ref.ratingCount;
  return createElement("div", {
    className: "block-directory-block-ratings"
  }, createElement(Stars, {
    rating: rating
  }), createElement("span", {
    className: "block-directory-block-ratings__rating-count",
    "aria-label": sprintf( // translators: %d: number of ratings (number).
    _n('%d total rating', '%d total ratings', ratingCount), ratingCount)
  }, "(", ratingCount, ")"));
};
export default BlockRatings;
//# sourceMappingURL=index.js.map