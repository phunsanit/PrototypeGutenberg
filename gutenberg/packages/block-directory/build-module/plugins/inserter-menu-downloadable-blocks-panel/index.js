import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { debounce } from 'lodash';
/**
 * WordPress dependencies
 */

import { __experimentalInserterMenuExtension } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
/**
 * Internal dependencies
 */

import DownloadableBlocksPanel from '../../components/downloadable-blocks-panel';

function InserterMenuDownloadableBlocksPanel() {
  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      debouncedFilterValue = _useState2[0],
      setFilterValue = _useState2[1];

  var debouncedSetFilterValue = debounce(setFilterValue, 400);
  return createElement(__experimentalInserterMenuExtension, null, function (_ref) {
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

    return createElement(DownloadableBlocksPanel, {
      onSelect: onSelect,
      onHover: onHover,
      filterValue: debouncedFilterValue,
      isWaiting: filterValue !== debouncedFilterValue
    });
  });
}

export default InserterMenuDownloadableBlocksPanel;
//# sourceMappingURL=index.js.map