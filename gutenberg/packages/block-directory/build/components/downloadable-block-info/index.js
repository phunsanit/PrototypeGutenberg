"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
function DownloadableBlockInfo(_ref) {
  var description = _ref.description,
      activeInstalls = _ref.activeInstalls,
      humanizedUpdated = _ref.humanizedUpdated;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("p", {
    className: "block-directory-downloadable-block-info__content"
  }, description), (0, _element.createElement)("div", {
    className: "block-directory-downloadable-block-info__meta"
  }, (0, _element.createElement)(_icons.Icon, {
    className: "block-directory-downloadable-block-info__icon",
    icon: _icons.chartLine
  }), (0, _i18n.sprintf)(
  /* translators: %s: number of active installations. */
  (0, _i18n._n)('%d active installation', '%d active installations', activeInstalls), activeInstalls)), (0, _element.createElement)("div", {
    className: "block-directory-downloadable-block-info__meta"
  }, (0, _element.createElement)(_icons.Icon, {
    className: "block-directory-downloadable-block-info__icon",
    icon: _icons.update
  }), // translators: %s: Humanized date of last update e.g: "2 months ago".
  (0, _i18n.sprintf)((0, _i18n.__)('Updated %s'), humanizedUpdated)));
}

var _default = DownloadableBlockInfo;
exports.default = _default;
//# sourceMappingURL=index.js.map