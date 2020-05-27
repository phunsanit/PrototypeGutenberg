import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { __, _n, sprintf } from '@wordpress/i18n';
import { Spinner, withSpokenMessages } from '@wordpress/components';
/**
 * Internal dependencies
 */

import DownloadableBlocksList from '../downloadable-blocks-list';

function DownloadableBlocksPanel(_ref) {
  var downloadableItems = _ref.downloadableItems,
      onSelect = _ref.onSelect,
      onHover = _ref.onHover,
      hasPermission = _ref.hasPermission,
      isLoading = _ref.isLoading,
      isWaiting = _ref.isWaiting,
      debouncedSpeak = _ref.debouncedSpeak;

  if (!hasPermission) {
    debouncedSpeak(__('No blocks found in your library. Please contact your site administrator to install new blocks.'));
    return createElement("p", {
      className: "block-directory-downloadable-blocks-panel__description has-no-results"
    }, __('No blocks found in your library.'), createElement("br", null), __('Please contact your site administrator to install new blocks.'));
  }

  if (isLoading || isWaiting) {
    return createElement("p", {
      className: "block-directory-downloadable-blocks-panel__description has-no-results"
    }, createElement(Spinner, null));
  }

  if (!downloadableItems.length) {
    return createElement("p", {
      className: "block-directory-downloadable-blocks-panel__description has-no-results"
    }, __('No blocks found in your library.'));
  }

  var resultsFoundMessage = sprintf(
  /* translators: %s: number of available blocks. */
  _n('No blocks found in your library. We did find %d block available for download.', 'No blocks found in your library. We did find %d blocks available for download.', downloadableItems.length), downloadableItems.length);
  debouncedSpeak(resultsFoundMessage);
  return createElement(Fragment, null, createElement("p", {
    className: "block-directory-downloadable-blocks-panel__description"
  }, __('No blocks found in your library. These blocks can be downloaded and installed:')), createElement(DownloadableBlocksList, {
    items: downloadableItems,
    onSelect: onSelect,
    onHover: onHover
  }));
}

export default compose([withSpokenMessages, withSelect(function (select, _ref2) {
  var filterValue = _ref2.filterValue;

  var _select = select('core/block-directory'),
      getDownloadableBlocks = _select.getDownloadableBlocks,
      hasInstallBlocksPermission = _select.hasInstallBlocksPermission,
      isRequestingDownloadableBlocks = _select.isRequestingDownloadableBlocks;

  var hasPermission = hasInstallBlocksPermission();
  var downloadableItems = hasPermission ? getDownloadableBlocks(filterValue) : [];
  var isLoading = isRequestingDownloadableBlocks();
  return {
    downloadableItems: downloadableItems,
    hasPermission: hasPermission,
    isLoading: isLoading
  };
})])(DownloadableBlocksPanel);
//# sourceMappingURL=index.js.map