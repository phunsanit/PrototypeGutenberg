import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { RangeControl, SelectControl, FormTokenField } from '../';
var DEFAULT_MIN_ITEMS = 1;
var DEFAULT_MAX_ITEMS = 100;
var MAX_CATEGORIES_SUGGESTIONS = 20;
export default function QueryControls(_ref) {
  var categorySuggestions = _ref.categorySuggestions,
      selectedCategories = _ref.selectedCategories,
      numberOfItems = _ref.numberOfItems,
      order = _ref.order,
      orderBy = _ref.orderBy,
      _ref$maxItems = _ref.maxItems,
      maxItems = _ref$maxItems === void 0 ? DEFAULT_MAX_ITEMS : _ref$maxItems,
      _ref$minItems = _ref.minItems,
      minItems = _ref$minItems === void 0 ? DEFAULT_MIN_ITEMS : _ref$minItems,
      onCategoryChange = _ref.onCategoryChange,
      onNumberOfItemsChange = _ref.onNumberOfItemsChange,
      onOrderChange = _ref.onOrderChange,
      onOrderByChange = _ref.onOrderByChange;
  return [onOrderChange && onOrderByChange && createElement(SelectControl, {
    key: "query-controls-order-select",
    label: __('Order by'),
    value: "".concat(orderBy, "/").concat(order),
    options: [{
      label: __('Newest to oldest'),
      value: 'date/desc'
    }, {
      label: __('Oldest to newest'),
      value: 'date/asc'
    }, {
      /* translators: label for ordering posts by title in ascending order */
      label: __('A → Z'),
      value: 'title/asc'
    }, {
      /* translators: label for ordering posts by title in descending order */
      label: __('Z → A'),
      value: 'title/desc'
    }],
    onChange: function onChange(value) {
      var _value$split = value.split('/'),
          _value$split2 = _slicedToArray(_value$split, 2),
          newOrderBy = _value$split2[0],
          newOrder = _value$split2[1];

      if (newOrder !== order) {
        onOrderChange(newOrder);
      }

      if (newOrderBy !== orderBy) {
        onOrderByChange(newOrderBy);
      }
    }
  }), onCategoryChange && createElement(FormTokenField, {
    label: __('Categories'),
    value: selectedCategories && selectedCategories.map(function (item) {
      return {
        id: item.id,
        value: item.name || item.value
      };
    }),
    suggestions: Object.keys(categorySuggestions),
    onChange: onCategoryChange,
    maxSuggestions: MAX_CATEGORIES_SUGGESTIONS
  }), onNumberOfItemsChange && createElement(RangeControl, {
    key: "query-controls-range-control",
    label: __('Number of items'),
    value: numberOfItems,
    onChange: onNumberOfItemsChange,
    min: minItems,
    max: maxItems,
    required: true
  })];
}
//# sourceMappingURL=index.js.map