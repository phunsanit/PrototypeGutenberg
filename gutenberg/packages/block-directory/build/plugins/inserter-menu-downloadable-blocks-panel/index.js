"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _blockEditor = require("@wordpress/block-editor");

var _downloadableBlocksPanel = _interopRequireDefault(require("../../components/downloadable-blocks-panel"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function InserterMenuDownloadableBlocksPanel() {
  var _useState = (0, _element.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      debouncedFilterValue = _useState2[0],
      setFilterValue = _useState2[1];

  var debouncedSetFilterValue = (0, _lodash.debounce)(setFilterValue, 400);
  return (0, _element.createElement)(_blockEditor.__experimentalInserterMenuExtension, null, function (_ref) {
    var onSelect = _ref.onSelect,
        onHover = _ref.onHover,
        filterValue = _ref.filterValue,
        hasItems = _ref.hasItems;

    if (hasItems || !filterValue) {
      return null;
    }

    if (debouncedFilterValue !== filterValue) {
      debouncedSetFilterValue(filterValue);
    }

    return (0, _element.createElement)(_downloadableBlocksPanel.default, {
      onSelect: onSelect,
      onHover: onHover,
      filterValue: debouncedFilterValue,
      isWaiting: filterValue !== debouncedFilterValue
    });
  });
}

var _default = InserterMenuDownloadableBlocksPanel;
exports.default = _default;
//# sourceMappingURL=index.js.map