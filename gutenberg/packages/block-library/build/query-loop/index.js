"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = exports.metadata = void 0;

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _edit = _interopRequireDefault(require("./edit"));

var _save = _interopRequireDefault(require("./save"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var metadata = {
  name: "core/query-loop",
  category: "layout",
  context: ["queryId", "query", "queryContext"],
  supports: {
    reusable: false,
    html: false
  }
};
exports.metadata = metadata;
var name = metadata.name;
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Query Loop'),
  icon: _icons.loop,
  edit: _edit.default,
  save: _save.default
};
exports.settings = settings;
//# sourceMappingURL=index.js.map