import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { Icon, update, chartLine } from '@wordpress/icons';

function DownloadableBlockInfo(_ref) {
  var description = _ref.description,
      activeInstalls = _ref.activeInstalls,
      humanizedUpdated = _ref.humanizedUpdated;
  return createElement(Fragment, null, createElement("p", {
    className: "block-directory-downloadable-block-info__content"
  }, description), createElement("div", {
    className: "block-directory-downloadable-block-info__meta"
  }, createElement(Icon, {
    className: "block-directory-downloadable-block-info__icon",
    icon: chartLine
  }), sprintf(
  /* translators: %s: number of active installations. */
  _n('%d active installation', '%d active installations', activeInstalls), activeInstalls)), createElement("div", {
    className: "block-directory-downloadable-block-info__meta"
  }, createElement(Icon, {
    className: "block-directory-downloadable-block-info__icon",
    icon: update
  }), // translators: %s: Humanized date of last update e.g: "2 months ago".
  sprintf(__('Updated %s'), humanizedUpdated)));
}

export default DownloadableBlockInfo;
//# sourceMappingURL=index.js.map