"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockRatings = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _stars = _interopRequireDefault(require("./stars"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockRatings = function BlockRatings(_ref) {
  var rating = _ref.rating,
      ratingCount = _ref.ratingCount;
  return (0, _element.createElement)("div", {
    className: "block-directory-block-ratings"
  }, (0, _element.createElement)(_stars.default, {
    rating: rating
  }), (0, _element.createElement)("span", {
    className: "block-directory-block-ratings__rating-count",
    "aria-label": (0, _i18n.sprintf)( // translators: %d: number of ratings (number).
    (0, _i18n._n)('%d total rating', '%d total ratings', ratingCount), ratingCount)
  }, "(", ratingCount, ")"));
};

exports.BlockRatings = BlockRatings;
var _default = BlockRatings;
exports.default = _default;
//# sourceMappingURL=index.js.map