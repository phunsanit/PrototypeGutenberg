"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _downloadableBlocksList = _interopRequireDefault(require("../downloadable-blocks-list"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function DownloadableBlocksPanel(_ref) {
  var downloadableItems = _ref.downloadableItems,
      onSelect = _ref.onSelect,
      onHover = _ref.onHover,
      hasPermission = _ref.hasPermission,
      isLoading = _ref.isLoading,
      isWaiting = _ref.isWaiting,
      debouncedSpeak = _ref.debouncedSpeak;

  if (!hasPermission) {
    debouncedSpeak((0, _i18n.__)('No blocks found in your library. Please contact your site administrator to install new blocks.'));
    return (0, _element.createElement)("p", {
      className: "block-directory-downloadable-blocks-panel__description has-no-results"
    }, (0, _i18n.__)('No blocks found in your library.'), (0, _element.createElement)("br", null), (0, _i18n.__)('Please contact your site administrator to install new blocks.'));
  }

  if (isLoading || isWaiting) {
    return (0, _element.createElement)("p", {
      className: "block-directory-downloadable-blocks-panel__description has-no-results"
    }, (0, _element.createElement)(_components.Spinner, null));
  }

  if (!downloadableItems.length) {
    return (0, _element.createElement)("p", {
      className: "block-directory-downloadable-blocks-panel__description has-no-results"
    }, (0, _i18n.__)('No blocks found in your library.'));
  }

  var resultsFoundMessage = (0, _i18n.sprintf)(
  /* translators: %s: number of available blocks. */
  (0, _i18n._n)('No blocks found in your library. We did find %d block available for download.', 'No blocks found in your library. We did find %d blocks available for download.', downloadableItems.length), downloadableItems.length);
  debouncedSpeak(resultsFoundMessage);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("p", {
    className: "block-directory-downloadable-blocks-panel__description"
  }, (0, _i18n.__)('No blocks found in your library. These blocks can be downloaded and installed:')), (0, _element.createElement)(_downloadableBlocksList.default, {
    items: downloadableItems,
    onSelect: onSelect,
    onHover: onHover
  }));
}

var _default = (0, _compose.compose)([_components.withSpokenMessages, (0, _data.withSelect)(function (select, _ref2) {
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

exports.default = _default;
//# sourceMappingURL=index.js.map